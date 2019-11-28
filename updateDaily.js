const mongodb = require('mongodb')

//assign parameters
const mongodbUrl = process.argv[2] ? process.argv[2] : 'mongodb://nodered:noderedpassword@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=water'
const todaysDate = process.argv[3] ? process.argv[3] : new Date()

//database vars
const mongoDbName = "water"
const mongoDailyCollection = "daily"

//console.log("Updating daily info...")
var doneUpdating = {period: false, averages: false}

//connect to database
var collectionHandleDaily
mongodb.MongoClient.connect(mongodbUrl, {useNewUrlParser:true, useUnifiedTopology: true }, function(err, client) {
    if(err){
        console.error(err)
    } else {
        //console.log("Connected to database.")
        var dbHandle = client.db(mongoDbName)
        collectionHandleDaily = dbHandle.collection(mongoDailyCollection)
        doUpdate()
    }
})

function doUpdate(){
    //console.log("Fetching day data...")

    var start = new Date(todaysDate)
    var end = new Date(start.getTime())
    start.setHours(0,0,0,0)
    end.setHours(24,0,0,0)
    //get first doc prior to today
    collectionHandleDaily.findOne({created: { $lt:start }}, /*{allTotal: 1},*/ //need timeRecord for averageDay
        { sort: { _id: -1 }, limit: 1 }, function(err, periodDoc) {
        if(err){ node.error(err) } 
        else {
            if(periodDoc){ //monitoring system was off during this period
                if(!periodDoc.incomplete) {
                    updateAverages(periodDoc)
                } else {
                    //console.log("day was incomplete. skipped updating averages")
                    doneUpdating.averages=true
                }
                updatePeriod(periodDoc)
            } else { //else to "if(periodDoc)"
                //console.log("no period doc, so no updating anything")
                process.send({ success: true })
                process.exit()
            }
        }
    })
}

function updateAverages(periodDoc){
    //console.log("period was complete. getting averages.")
    collectionHandleDaily.findOne({docName: "averages"}, function(err, averagesDoc) {
        if(err){ console.error(err) } 
        else {
            if(!averagesDoc){ //need to create it
                //console.log("no averages doc.  creating one.")
                averagesDoc = {
                    allAverage: 0,
                    sourceAverages: {}, //contains object "name"->total
                    secondAverages: [],
                    numberOfSamples: 0
                }
                for (let second=1; second<=86400; second++){
                    averagesDoc.secondAverages.push(0)
                }
            }

            //console.log("starting updating averages")
            //update averagesDoc
            var thisDayStr = periodDoc.timeRecord[0].created
            var thisDayStart = new Date(thisDayStr)
            thisDayStart.setHours(0,0,0,0)
            var currentIndex = 0
            var allSoFar = 0
            var sourcesThisDay = new Map() //contains object "name"->{average: , numOfSamples: }
            for(let second=1; second <= 86400; second++){
                var foundOne = true
                while(foundOne == true){
                    foundOne = false
                    if(currentIndex<periodDoc.timeRecord.length){
                        var currentTimestamp = new Date(periodDoc.timeRecord[currentIndex].created)
                        if(second*1000 > (currentTimestamp - thisDayStart)){
                            allSoFar += clicksToGallons(periodDoc.timeRecord[currentIndex].clicks)
                            for(let sourceIndex=0; sourceIndex<periodDoc.timeRecord[currentIndex].sources.length; sourceIndex++){
                                var sourceName = periodDoc.timeRecord[currentIndex].sources[sourceIndex].name
                                //need to scale sub flows relative to total flow going through the pipe since that's how the clicksToGallons equation was determined
                                sourcesThisDay.set(sourceName, (sourcesThisDay.has(sourceName) ? sourcesThisDay.get(sourceName) : 0)+
                                    (periodDoc.timeRecord[currentIndex].sources[sourceIndex].clicks/periodDoc.timeRecord[currentIndex].clicks)*clicksToGallons(periodDoc.timeRecord[currentIndex].clicks))
                            }
                            foundOne = true
                            currentIndex++
                        }
                    }
                }
                //all entries for current second have been tallied.  Now add it to average.
                averagesDoc.secondAverages[second-1] = (averagesDoc.secondAverages[second-1]*averagesDoc.numberOfSamples+allSoFar)/(averagesDoc.numberOfSamples+1)
            }
            averagesDoc.allAverage = (averagesDoc.allAverage*averagesDoc.numberOfSamples+allSoFar)/(averagesDoc.numberOfSamples+1)
            averagesDoc.numberOfSamples++
            //console.log(averagesDoc)
            //go through every source in averages and update
            Object.entries(averagesDoc.sourceAverages).forEach(([sourceName,sourceData])=>{
                averagesDoc.sourceAverages[sourceName] = {
                    average: ((sourceData.average*sourceData.numberOfSamples+(sourcesThisDay.has(sourceName) ? sourcesThisDay.get(sourceName) : 0))/(sourceData.numberOfSamples+1)),
                    numberOfSamples: sourceData.numberOfSamples+1
                }
            })
            //in case we have a new source not in averages, add it
            for (const [sourceName, sourceTotal] of sourcesThisDay) {
                if(!averagesDoc.sourceAverages.hasOwnProperty(sourceName)){
                    averagesDoc.sourceAverages[sourceName] = {
                        average: sourceTotal,
                        numberOfSamples: 1
                    }
                }
            }

            var updateDoc = {  
                $setOnInsert: { 
                    docName: "averages"
                },
                $currentDate: { modified: true },
                $set: {
                    allAverage: averagesDoc.allAverage,
                    sourceAverages: averagesDoc.sourceAverages,
                    secondAverages: averagesDoc.secondAverages,
                    numberOfSamples: averagesDoc.numberOfSamples
                }
            }
            //console.log("update averages completed")
            collectionHandleDaily.updateOne({docName: "averages"}, updateDoc, {upsert:true, w: 1}, function(err, result) {
                if(err){ node.error(err) } 
                else {
                    //console.log("database update averages completed")
                    doneUpdating.averages=true
                    if(doneUpdating.period) { 
                        process.send({ success: true }) 
                        process.exit()
                    }
                }
            })
        }
        }
    )
}

function updatePeriod(periodDoc){
    //console.log("starting updating day")
    //store today's sourceTotals and bihourlyRecord
    var thisDayStr = periodDoc.timeRecord[0].created
    var thisDayStart = new Date(thisDayStr)
    thisDayStart.setHours(0,0,0,0)
    var thisDayCreated = new Date(thisDayStr)
    var bihourlyRecord = []
    var currentIndex = 0
    var sourcesThisDay = new Map() //each element is "sourceName" -> total
    for(let hour=2; hour <= 24; hour += 2){
        var totalThisHours = 0
        var sourcesThisHours = new Map() //each element is "sourceName" -> total
        thisDayCreated.setHours(hour-1,0,0,0) // -1 so its within the time period
        var foundOne = true
        while(foundOne == true){
            foundOne = false
            if(currentIndex<periodDoc.timeRecord.length){
                var currentTimestamp = new Date(periodDoc.timeRecord[currentIndex].created)
                if(hour*3600*1000 > (currentTimestamp - thisDayStart)){ //3600 seconds/hr
                    totalThisHours += clicksToGallons(periodDoc.timeRecord[currentIndex].clicks)
                    for(let sourceIndex=0; sourceIndex<periodDoc.timeRecord[currentIndex].sources.length; sourceIndex++){
                        var sourceName = periodDoc.timeRecord[currentIndex].sources[sourceIndex].name
                        //need to scale sub flows relative to total flow going through the pipe since that's how the clicksToGallons equation was determined
                        sourcesThisDay.set(sourceName, (sourcesThisDay.has(sourceName) ? sourcesThisDay.get(sourceName) : 0)+
                            (periodDoc.timeRecord[currentIndex].sources[sourceIndex].clicks/periodDoc.timeRecord[currentIndex].clicks)*clicksToGallons(periodDoc.timeRecord[currentIndex].clicks))
                        sourcesThisHours.set(sourceName, (sourcesThisHours.has(sourceName) ? sourcesThisHours.get(sourceName) : 0)+
                            (periodDoc.timeRecord[currentIndex].sources[sourceIndex].clicks/periodDoc.timeRecord[currentIndex].clicks)*clicksToGallons(periodDoc.timeRecord[currentIndex].clicks))
                    }
                    foundOne = true
                    currentIndex++
                }
            }
        }
        bihourlyRecord.push({
            created: new Date(thisDayCreated), //set to time within range this data is for, also need to create new date to prevent it from changing when thisDayCreated changes.
            allTotal: totalThisHours,
            sources: sourcesThisHours,
        })
    }

    var updateDoc = {  
        $set: { 
            sourceTotals: sourcesThisDay, 
            bihourlyRecord: bihourlyRecord
        },
        $currentDate: { modified: true }
    }
    //console.log("update day complete")
    collectionHandleDaily.updateOne({_id: periodDoc._id}, updateDoc, {upsert:false, w: 1}, function(err, result) {
        if(err){ node.error(err) } 
        else {
            //console.log("database update day completed")
            doneUpdating.period=true
            if(doneUpdating.averages) { 
                process.send({ success: true }) 
                process.exit()
            }
        }
    })
}

function clicksToGallons(clicks){
    return (0.000925824*clicks + 0.0015719)
}