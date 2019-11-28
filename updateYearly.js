const mongodb = require('mongodb')

//assign parameters
const mongodbUrl = process.argv[2] ? process.argv[2] : 'mongodb://nodered:noderedpassword@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=water'
const dateInfo = process.argv[3] ? JSON.parse(process.argv[3]) : {
    newDay: false,
    newWeek: false,
    newMonth: false,
    newYear: false,
    nowDate: new Date(), 
    lastSeenDate: new Date()
}

//database vars
const mongoDbName = "water"
const mongoDailyCollection = "daily"
const mongoWeeklyCollection = "weekly"
const mongoMonthlyCollection = "monthly"
const mongoYearlyCollection = "yearly"

var doneUpdating = {
    //daily: {period: false, averages: false},
    //weekly: {period: false, averages: false},
    //monthly: {period: false, averages: false},
    yearly: {period: false, averages: false}
}

//get start and end of period
var start = new Date(new Date(lastSeenDate).getFullYear(), 0, 1)
start.setHours(0,0,0,0)
var end = new Date(new Date(start).getFullYear(), 12, 1) //get first day of next year
end.setHours(0,0,0,0)
var year = start.getFullYear()
//var numberOfDaysInThisYear = (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) ? 366 : 365

getStarted()

async function getStarted(){
    var client = await mongodb.MongoClient.connect(mongodbUrl, {useNewUrlParser:true, useUnifiedTopology:true })
    console.log("Connected to database.")
    var dbHandle = client.db(mongoDbName)

    if(dateInfo.newDay){
        //wait for daily update
        if(dateInfo.newWeek){
            //do weekly update
        }
        if(dateInfo.newMonth){
            //wait for monthly update
            if(dateInfo.newYear){
                //wait for yearly update
            }
        }
    }

    if(dateInfo.newWeek){
        //wait for newWeek done
    }
    //exit process

    var collectionHandleDaily = dbHandle.collection(mongoDailyCollection)
    var collectionHandleWeekly = dbHandle.collection(mongoWeeklyCollection)
    var collectionHandleMonthly = dbHandle.collection(mongoMonthlyCollection)
    var collectionHandleYearly = dbHandle.collection(mongoYearlyCollection)
    doUpdate(collectionHandleYearly, collectionHandleMonthly)
}

function getDoneFlags(){
    var doneFlags
    if(dateInfo.newDay){
        doneFlags.daily = {period: false, averages: false}
    }
    if(dateInfo.newWeek){
        doneFlags.weekly = {period: false, averages: false}    
    }
    if(dateInfo.newMonth){
        doneFlags.monthly = {period: false, averages: false}    
    }
    if(dateInfo.newYear){
        doneFlags.yearly = {period: false, averages: false}    
    }
    return doneFlags
}

async function doUpdate(collectionToUpdate, collectionToRead){
    //console.log("Fetching year data...")
    try {
        var periodDocArray = await collectionToRead.find({created: { $gt:start, $lt:end }}).project({created: 1, allTotal: 1, sourceTotals: 1, incomplete: 1}).toArray()
    } catch (error) {
        console.error(error);
    }
    //console.log("returned from periodDocArray")
    //console.log(periodDocArray)
    if(periodDocArray.length>0){ //monitoring system was off during this period
        if(periodDocArray.length === 12) { //otherwise an incomplete year
            prepareAveragesDoc(periodDocArray, collectionToUpdate)
                .then(averagesDoc => { updateAveragesDocInDatabase(averagesDoc, collectionToUpdate, doneUpdating.yearly) })
                .catch(error => {console.error(error)})
        } else {
            //console.log("day was incomplete. skipped updating averages")
            doneUpdating.yearly.averages=true
        }
        createPeriodDocInDatabase(preparePeriodDoc(periodDocArray), collectionToUpdate, doneUpdating.yearly)
    } else { //else to "if(periodDoc)"
        //console.log("no period doc, so no updating anything")
        doneUpdating.yearly.averages=true
        doneUpdating.yearly.period=true
        exitIfDone()
    }
}

async function prepareAveragesDoc(periodDocArray, collectionHandle){
    console.log("period was complete. getting averages.")
    try {
        var averagesDoc = await collectionHandle.findOne({docName: "averages"})
    } catch(error) {
        console.error(error)
    }
    console.log("returned from periodDocArray")
    if(!averagesDoc){ //need to create it
        console.log("no averages doc.  creating one.")
        averagesDoc = {
            allAverage: 0,
            sourceAverages: new Object(), //contains object {name : {average: , numOfSamples: }}
            moyAverages: Array.from({length:12}, u => ({allAverage: 0, sourceAverages: {}, numberOfSamples: 0})),
            numberOfSamples: 0
        }
    }

    var periodTotals = {allTotal: 0, sourceTotals: new Object()} //sourceTotals contains object {name: total}
    for(let index=0; index<12; index++){
        var checkSamePeriod = new Date(periodDocArray[index].created)
        if(checkSamePeriod.getMonth() === index) {
            addToPeriod(periodTotals, periodDocArray[index])
            averagePeriod(averagesDoc.moyAverages[index], periodDocArray[index])
        } else {
            console.error("month of year mismatch!")
        }
    }

    averagePeriod(averagesDoc, periodTotals)

    console.log("update averages completed")
    console.log(averagesDoc)
    return averagesDoc
}

function preparePeriodDoc(periodDocArray){
    var periodTotals = {allTotal: 0, sourceTotals: new Object()} //sourceTotals contains object {name: total}
    for(let index=0; index<periodDocArray.length; index++){
        addToPeriod(periodTotals, periodDocArray[index])
    }

    return periodTotals
}

async function createPeriodDocInDatabase(theDoc, collectionHandle, doneFlag){
    var updateDoc = {
        $set: { 
            created: new Date(lastSeenDate), 
            allTotal: theDoc.allTotal,
            sourceTotals: theDoc.sourceTotals
        }
    }

    try{
        await collectionHandle.updateOne({created: { $gt:start, $lt:end }}, updateDoc, {upsert:true, w: 1})
    } catch(error) {
        console.error(error)
    }
    //console.log("database update day completed")
    doneFlag.period=true
    exitIfDone()
}

async function updateAveragesDocInDatabase(theDoc, collectionHandle, doneFlag){
    console.log("starting database update averages")
    var updateDoc = {  
        $setOnInsert: { 
            docName: "averages"
        },
        $currentDate: { modified: true },
        $set: {
            allAverage: theDoc.allAverage,
            sourceAverages: theDoc.sourceAverages,
            moyAverages: theDoc.moyAverages,
            numberOfSamples: theDoc.numberOfSamples
        }
    }

    try{
        await collectionHandle.updateOne({docName: "averages"}, updateDoc, {upsert:true, w: 1})
    } catch(error) {
        console.error(error)
    }
    console.log("database update averages completed")
    doneFlag.averages=true
    exitIfDone()
}

/*  
    adds subPeriodTotals data to periodTotals
    note: both object must have allTotal and sourceTotals fields
*/
function addToPeriod(periodTotals, subPeriodTotals){
    Object.entries(subPeriodTotals.sourceTotals).forEach(([sourceName,sourceTotal])=>{
        periodTotals.sourceTotals[sourceName] = (sourceName, (periodTotals.sourceTotals.hasOwnProperty(sourceName) ? periodTotals.sourceTotals[sourceName] : 0)+sourceTotal)
    })
    periodTotals.allTotal += subPeriodTotals.allTotal
}

/*  
    averages periodTotals data into periodAverages.  
    Note: this function is for when periodTotals and periodAverages are for the same period type/duration
*/
function averagePeriod(periodAverages, periodTotals){
    periodAverages.allAverage = (periodAverages.allAverage*periodAverages.numberOfSamples+periodTotals.allTotal)/(periodAverages.numberOfSamples+1)
    periodAverages.numberOfSamples++
    Object.entries(periodAverages.sourceAverages).forEach(([sourceName,sourceData])=>{
        periodAverages.sourceAverages[sourceName] = {
            average: ((sourceData.average*sourceData.numberOfSamples+(periodTotals.sourceTotals.hasOwnProperty(sourceName) ? periodTotals.sourceTotals[sourceName] : 0))/(sourceData.numberOfSamples+1)),
            numberOfSamples: sourceData.numberOfSamples+1
        }
    })
    //in case we have a new source not in averages, add it
    Object.entries(periodTotals.sourceTotals).forEach(([sourceName, sourceTotal])=>{
        if(!periodAverages.sourceAverages.hasOwnProperty(sourceName)){
            periodAverages.sourceAverages[sourceName] = {
                average: sourceTotal,
                numberOfSamples: 1
            }
        }
    })
}

function exitIfDone(){
    var done = true
    Object.entries(doneUpdating).forEach(([period,status])=>{
        console.log(status)
        if(!(status.averages && status.period)){
            console.log("return = do not exit process")
            done = false
        }
    })
    if(done){
        console.log("exit process")
        //process.send({ success: true }) 
        //process.exit()
    }
}

