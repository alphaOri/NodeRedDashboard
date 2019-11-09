const mongodb = require('mongodb')

//assign parameters
const mongodbUrl = process.argv[2] ? process.argv[2] : 'mongodb://nodered:noderedpassword@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=water'
const todaysDate = process.argv[3] ? process.argv[3] : new Date()

//database vars
const mongoDbName = "water"
const mongoDailyCollection = "daily"

console.log("Updating daily info...")
/*for(let i=0; i<process.argv.length; i++){
    console.log(process.argv[i])
}*/

//connect to database
var dbHandle
var collectionHandleDaily
mongodb.MongoClient.connect(mongodbUrl, {useNewUrlParser:true, useUnifiedTopology: true }, function(err, client) {
    if(err){
        console.error(err)
    } else {
        console.log("Connected to database.")
        dbHandle = client.db(mongoDbName)
        collectionHandleDaily = dbHandle.collection(mongoDailyCollection)
        getLastDay()
    }
})

function getLastDay(){
    console.log("Fetching day data...")

    var start = new Date(todaysDate)
    var end = new Date(start.getTime())
    start.setHours(0,0,0,0)
    end.setHours(24,0,0,0)
    //get first doc prior to today
    collectionHandleDaily.findOne({created: { $lt:start }}, /*{gallons: 1, average: 1, numavg: 1},*/ //need flow for averageDay
        { sort: { _id: -1 }, limit: 1 }, function(err, dailyDayDoc) {
        if(err){ node.error(err) } 
        else {
            console.log("found day.")
            if(dailyDayDoc && dailyDayDoc.flow){ //perhaps no water was used this day
                if(!dailyDayDoc.incomplete) {
                    console.log("day was complete. getting averages.")
                    collectionHandleDaily.findOne({docName: "averages"}, function(err, dailyAveragesDoc) {
                        if(err){ console.error(err) } 
                        else {
                            if(!dailyAveragesDoc){ //need to create it
                                console.log("no averages doc.  creating one.")
                                dailyAveragesDoc = {
                                    allAverage: 0,
                                    sourceAverages: {}, //contains object "name"->{gallons: , numOfSamples: }
                                    secondAverages: [],
                                    numberOfSamples: 0
                                }
                                for (let second=1; second<=86400; second++){
                                    dailyAveragesDoc.secondAverages.push(0)
                                }
                            }

                            console.log("starting updating averages")
                            //update dailyAveragesDoc
                            var thisDayStr = dailyDayDoc.flow[0].created
                            var thisDayStart = new Date(thisDayStr)
                            thisDayStart.setHours(0,0,0,0)
                            var currentIndex = 0
                            var allSoFar = 0
                            var sourcesThisDay = new Map() //each element is "sourceName" -> gallons
                            for(let second=1; second <= 86400; second++){
                                var foundOne = true
                                while(foundOne == true){
                                    foundOne = false
                                    if(currentIndex<dailyDayDoc.flow.length){
                                        var currentTimestamp = new Date(dailyDayDoc.flow[currentIndex].created)
                                        if(second*1000 > (currentTimestamp - thisDayStart)){
                                            allSoFar += clicksToGallons(dailyDayDoc.flow[currentIndex].clicks)
                                            for(let sourceIndex=0; sourceIndex<dailyDayDoc.flow[currentIndex].sources.length; sourceIndex++){
                                                var sourceName = dailyDayDoc.flow[currentIndex].sources[sourceIndex].name
                                                sourcesThisDay.set(sourceName, (sourcesThisDay.has(sourceName) ? sourcesThisDay.get(sourceName) : 0)+clicksToGallons(dailyDayDoc.flow[currentIndex].sources[sourceIndex].clicks))
                                            }
                                            foundOne = true
                                            currentIndex++
                                        }
                                    }
                                }
                                //all entries for current second have been tallied.  Now add it to average.
                                dailyAveragesDoc.secondAverages[second-1] = (dailyAveragesDoc.secondAverages[second-1]*dailyAveragesDoc.numberOfSamples+allSoFar)/(dailyAveragesDoc.numberOfSamples+1)
                            }
                            dailyAveragesDoc.allAverage = (dailyAveragesDoc.allAverage*dailyAveragesDoc.numberOfSamples+allSoFar)/(dailyAveragesDoc.numberOfSamples+1)
                            dailyAveragesDoc.numberOfSamples++
                            //console.log(dailyAveragesDoc)
                            //go through every source in averages and update
                            Object.entries(dailyAveragesDoc.sourceAverages).forEach(([sourceName,sourceData])=>{
                                dailyAveragesDoc.sourceAverages[sourceName] = {
                                    gallons: ((sourceData.gallons*sourceData.numberOfSamples+(sourcesThisDay.has(sourceName) ? sourcesThisDay.get(sourceName) : 0))/(sourceData.numberOfSamples+1)),
                                    numberOfSamples: sourceData.numberOfSamples+1
                                }
                            })
                            //in case we have a new source not in averages, add it
                            for (const [sourceName, sourceGallons] of sourcesThisDay) {
                                if(!dailyAveragesDoc.sourceAverages.hasOwnProperty(sourceName)){
                                    dailyAveragesDoc.sourceAverages[sourceName] = {
                                        gallons: sourceGallons,
                                        numberOfSamples: 1
                                    }
                                }
                            }

                            var updateDoc = {  
                                $setOnInsert: { 
                                    created: new Date(),
                                    docName: "averages"
                                },
                                $currentDate: { modified: true },
                                $set: {
                                    allAverage: dailyAveragesDoc.allAverage,
                                    sourceAverages: dailyAveragesDoc.sourceAverages,
                                    secondAverages: dailyAveragesDoc.secondAverages,
                                    numberOfSamples: dailyAveragesDoc.numberOfSamples
                                }
                            }
                            console.log("update averages completed")
                            collectionHandleDaily.updateOne({docName: "averages"}, updateDoc, {upsert:true, w: 1}, function(err, result) {
                                if(err){ node.error(err) } 
                                else {
                                    console.log("database update averages completed")
                                }
                            })
                        }
                        }
                    )
                } else {
                    console.log("day was incomplete. skipped updating averages")
                }
                console.log("starting updating day")
                //store today's sourceTotals and hoursRecord
                var thisDayStr = dailyDayDoc.flow[0].created
                var thisDayStart = new Date(thisDayStr)
                thisDayStart.setHours(0,0,0,0)
                var thisDayCreated = new Date(thisDayStr)
                var hoursRecord = []
                var currentIndex = 0
                var sourcesThisDay = new Map() //each element is "sourceName" -> gallons
                for(let hour=2; hour <= 24; hour += 2){
                    var gallonsThisHours = 0
                    var sourcesThisHours = new Map() //each element is "sourceName" -> gallons
                    thisDayCreated.setHours(hour-1,0,0,0) // -1 so its within the time period
                    var foundOne = true
                    while(foundOne == true){
                        foundOne = false
                        if(currentIndex<dailyDayDoc.flow.length){
                            var currentTimestamp = new Date(dailyDayDoc.flow[currentIndex].created)
                            if(hour*3600*1000 > (currentTimestamp - thisDayStart)){ //3600 seconds/hr
                                gallonsThisHours += clicksToGallons(dailyDayDoc.flow[currentIndex].clicks)
                                for(let sourceIndex=0; sourceIndex<dailyDayDoc.flow[currentIndex].sources.length; sourceIndex++){
                                    var sourceName = dailyDayDoc.flow[currentIndex].sources[sourceIndex].name
                                    sourcesThisDay.set(sourceName, (sourcesThisDay.has(sourceName) ? sourcesThisDay.get(sourceName) : 0)+clicksToGallons(dailyDayDoc.flow[currentIndex].sources[sourceIndex].clicks))
                                    sourcesThisHours.set(sourceName, (sourcesThisHours.has(sourceName) ? sourcesThisHours.get(sourceName) : 0)+clicksToGallons(dailyDayDoc.flow[currentIndex].sources[sourceIndex].clicks))
                                }
                                foundOne = true
                                currentIndex++
                            }
                        }
                    }
                    hoursRecord.push({
                        created: new Date(thisDayCreated), //set to time within range this data is for, also need to create new date to prevent it from changing when thisDayCreated changes.
                        all: gallonsThisHours,
                        sources: sourcesThisHours,
                    })
                }

                var updateDoc = {  
                    $set: { 
                        sourceTotals: sourcesThisDay, 
                        hoursRecord: hoursRecord
                    },
                    $currentDate: { modified: true }
                }
                console.log("update day complete")
                collectionHandleDaily.updateOne({_id: dailyDayDoc._id}, updateDoc, {upsert:false, w: 1}, function(err, result) {
                    if(err){ node.error(err) } 
                    else {
                        console.log("database update day completed")
                        //process.send({ success: true })
                    }
                })
            } else { //else to "if(dailyDayDoc && dailyDayDoc.flow)"
                console.log("no day and/or no flow... so no updating anything")
                //process.send({ success: false })
            }
        }
    })
}

function clicksToGallons(clicks){
    return (0.000925824*clicks + 0.0015719)
}