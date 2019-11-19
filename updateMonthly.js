const mongodb = require('mongodb')

//assign parameters
const mongodbUrl = process.argv[2] ? process.argv[2] : 'mongodb://nodered:noderedpassword@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=water'
const todaysDate = process.argv[3] ? process.argv[3] : new Date()
const lastSeenDate = process.argv[4] ? process.argv[4] : new Date() //default to yesterday

//database vars
const mongoDbName = "water"
const mongoDailyCollection = "daily"
const mongoMonthlyCollection = "monthly"

console.log("Updating monthly info...")
var doneUpdating = {period: false, averages: false}

//connect to database
var collectionHandleDaily
var collectionHandleMonthly

//get start and end of period
var start = new Date(lastSeenDate)
start.setDate(1) //first of this month
start.setHours(0,0,0,0)
var lastDayOfMonth = new Date(start.getFullYear(), start.getMonth()+1, 0) //get last day of this month
var end = new Date(lastDayOfMonth)
end.setHours(24,0,0,0)

mongodb.MongoClient.connect(mongodbUrl, {useNewUrlParser:true, useUnifiedTopology: true }, function(err, client) {
    if(err){
        console.error(err)
    } else {
        //console.log("Connected to database.")
        var dbHandle = client.db(mongoDbName)
        collectionHandleDaily = dbHandle.collection(mongoDailyCollection)
        collectionHandleMonthly = dbHandle.collection(mongoMonthlyCollection)
        doUpdate()
    }
})

function doUpdate(){
    //console.log("Fetching month data...")

    //get first doc prior to today
    collectionHandleDaily.find({created: { $gt:start, $lt:end }}).project({created: 1, allTotal: 1, sourceTotals: 1, incomplete: 1}).toArray(
        function(err, periodDocArray) {
        //console.log("returned from periodDocArray")
        if(err){ console.error(err) } 
        else {
            //console.log(periodDocArray)
            if(periodDocArray.length>0){ //monitoring system was off during this period
                if(periodDocArray.length === lastDayOfMonth.getDate()) { //otherwise an incomplete month
                    updateAverages(periodDocArray)
                } else {
                    //console.log("day was incomplete. skipped updating averages")
                    doneUpdating.averages=true
                }
                updatePeriod(periodDocArray)
            } else { //else to "if(periodDoc)"
                //console.log("no period doc, so no updating anything")
                process.send({ success: true })
            }
        }
    })
}

function updateAverages(periodDocArray){
    //console.log("period was complete. getting averages.")
    collectionHandleMonthly.findOne({docName: "averages"}, function(err, averagesDoc) {
        //console.log("returned from periodDocArray")
        if(err){ console.error(err) } 
        else {
            if(!averagesDoc){ //need to create it
                //onsole.log("no averages doc.  creating one.")
                averagesDoc = {
                    allAverage: 0,
                    sourceAverages: new Object(), //contains object "name"->{average: , numOfSamples: }
                    numberOfSamples: 0
                }
            }

            var allSoFar = 0
            var sourcesSoFar = new Map() //contains object "name"->total
            for(let index=0; index<periodDocArray.length; index++){
                Object.entries(periodDocArray[index].sourceTotals).forEach(([sourceName,sourceTotal])=>{
                    sourcesSoFar.set(sourceName, (sourcesSoFar.has(sourceName) ? sourcesSoFar.get(sourceName) : 0)+sourceTotal)
                })
                allSoFar += periodDocArray[index].allTotal
            }

            averagesDoc.allAverage = (averagesDoc.allAverage*averagesDoc.numberOfSamples+allSoFar)/(averagesDoc.numberOfSamples+1)
            averagesDoc.numberOfSamples++
            
            //go through every source in averages and update
            Object.entries(averagesDoc.sourceAverages).forEach(([sourceName,sourceData])=>{
                averagesDoc.sourceAverages[sourceName] = {
                    average: ((sourceData.average*sourceData.numberOfSamples+(sourcesSoFar.has(sourceName) ? sourcesSoFar.get(sourceName) : 0))/(sourceData.numberOfSamples+1)),
                    numberOfSamples: sourceData.numberOfSamples+1
                }
            })
            //in case we have a new source not in averages, add it
            for (const [sourceName, sourceTotal] of sourcesSoFar) {
                if(!averagesDoc.sourceAverages.hasOwnProperty(sourceName)){
                    averagesDoc.sourceAverages[sourceName] = {
                        average: sourceTotal,
                        numberOfSamples: 1
                    }
                }
            }

            var updateAveragesDoc = {  
                $setOnInsert: { 
                    docName: "averages"
                },
                $currentDate: { modified: true },
                $set: {
                    allAverage: averagesDoc.allAverage,
                    sourceAverages: averagesDoc.sourceAverages,
                    numberOfSamples: averagesDoc.numberOfSamples
                }
            }
            //console.log("update averages completed")
            collectionHandleMonthly.updateOne({docName: "averages"}, updateAveragesDoc, {upsert:true, w: 1}, function(err, result) {
                if(err){ console.error(err) } 
                else {
                    //console.log("database update averages completed")
                    doneUpdating.averages=true
                    if(doneUpdating.period) { process.send({ success: true }) }
                }
            })
        }
        }
    )
}

function updatePeriod(periodDocArray){
    var allSoFar = 0
    var sourcesSoFar = new Map() //contains object "name"->total
    for(let index=0; index<periodDocArray.length; index++){
        Object.entries(periodDocArray[index].sourceTotals).forEach(([sourceName,sourceTotal])=>{
            sourcesSoFar.set(sourceName, (sourcesSoFar.has(sourceName) ? sourcesSoFar.get(sourceName) : 0)+sourceTotal)
        })
        allSoFar += periodDocArray[index].allTotal
    }

    var updateDoc = {  
        $set: { 
            created: new Date(lastSeenDate), 
            allTotal: allSoFar,
            sourceTotals: sourcesSoFar
        }
    }
    //console.log("update day complete")
    collectionHandleMonthly.updateOne({created: { $gt:start, $lt:end }}, updateDoc, {upsert:true, w: 1}, function(err, result) {
        if(err){ console.error(err) } 
        else {
            //console.log("database update day completed")
            doneUpdating.period=true
            if(doneUpdating.averages) { process.send({ success: true }) }
        }
    })
}