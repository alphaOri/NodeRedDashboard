const mongodb = require('mongodb')

//assign parameters
const mongodbUrl = process.argv[2] ? process.argv[2] : 'mongodb://nodered:noderedpassword@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=water'
const dateInfo = process.argv[3] ? JSON.parse(process.argv[3]) : {
    newDay: true,
    newWeek: false,
    newMonth: false,
    newYear: false,
    nowDate: new Date(), 
    lastSeenDate: new Date()
}

//globals
const mongoDbName = "water"

main()
//process.send({ success: true }) 
//process.exit()

async function main(){
    const mongoClient = await connectToDatabase()
    const dbHandle = mongoClient.db(mongoDbName)
    var promises = []

    if(dateInfo.newDay){
        var collectionHandleDaily = dbHandle.collection("daily")
        const dateRangeDay = getDateRange(dateInfo.lastSeenDate, "day")
        const periodDocArrayDay = await getDocumentsFromDatabase(collectionHandleDaily, dateRangeDay)
        const isCompleteDay = periodIsComplete(periodDocArrayDay, 1) && !periodDocArrayDay[0].incomplete //should just have 1 day, also check that it's complete
        const periodPromiseDay = writePeriodDocToDatabase(preparePeriodDoc(periodDocArrayDay, "day"), collectionHandleDaily, dateInfo.lastSeenDate, dateRangeDay, isCompleteDay, "day")
        if(isCompleteDay) {
            promises.push(prepAndWriteAveragesToDatabase(periodDocArrayDay, collectionHandleDaily, "day"))
        }
        await periodPromiseDay
        if(dateInfo.newWeek){
            var collectionHandleWeekly = dbHandle.collection("weekly")
            const dateRangeWeek = getDateRange(dateInfo.lastSeenDate, "week")
            const periodDocArrayWeek = await getDocumentsFromDatabase(collectionHandleDaily, dateRangeWeek)
            const isCompleteWeek = periodIsComplete(periodDocArrayWeek, 7) //should have 7 days in the week
            const periodPromiseWeek = writePeriodDocToDatabase(preparePeriodDoc(periodDocArrayWeek, "week"), collectionHandleWeekly, dateInfo.lastSeenDate, dateRangeWeek, isCompleteWeek, "week")
            if(isCompleteWeek) {
                promises.push(prepAndWriteAveragesToDatabase(periodDocArrayWeek, collectionHandleWeekly, "week"))
            }
            await periodPromiseWeek
        }
        if(dateInfo.newMonth){
            var collectionHandleMonthly = dbHandle.collection("monthly")
            const dateRangeMonth = getDateRange(dateInfo.lastSeenDate, "month")
            const periodDocArrayMonth = await getDocumentsFromDatabase(collectionHandleDaily, dateRangeMonth)
            const isCompleteMonth = periodIsComplete(periodDocArrayMonth, (new Date(dateRangeMonth.start.getFullYear(), dateRangeMonth.start.getMonth()+1, 0)).getDate()) //using last date of month
            const periodPromiseMonth = writePeriodDocToDatabase(preparePeriodDoc(periodDocArrayMonth, "month"), collectionHandleMonthly, dateInfo.lastSeenDate, dateRangeMonth, isCompleteMonth, "month")
            if(isCompleteMonth) {
                promises.push(prepAndWriteAveragesToDatabase(periodDocArrayMonth, collectionHandleMonthly, "month"))
            }
            await periodPromiseMonth
            if(dateInfo.newYear){
                var collectionHandleYearly = dbHandle.collection("yearly")
                const dateRangeYear = getDateRange(dateInfo.lastSeenDate, "year")
                const periodDocArrayYear = await getDocumentsFromDatabase(collectionHandleMonthly, dateRangeYear)
                const isCompleteYear = periodIsComplete(periodDocArrayYear, 12) //12 months in a year
                const periodPromiseYear = writePeriodDocToDatabase(preparePeriodDoc(periodDocArrayYear, "year"), collectionHandleYearly, dateInfo.lastSeenDate, dateRangeYear, isCompleteYear, "year")
                if(isCompleteYear){
                    promises.push(prepAndWriteAveragesToDatabase(periodDocArrayYear, collectionHandleYearly, "year"))
                }
                await periodPromiseYear
            }
        }
    }

    console.log(promises)
    await Promise.all(promises)
    mongoClient.close() //don't wait, can hang if nothing to close... not sure why
    console.log("process exit")
    process.send({ success: true }) 
    process.exit()
}

async function connectToDatabase(){
    var client = await mongodb.MongoClient.connect(mongodbUrl, {useNewUrlParser:true, useUnifiedTopology:true })
    console.log("Connected to database.")
    return client
}

async function getDocumentsFromDatabase(collectionHandle, dateRange){
    console.log("getDocumentsFromDatabase")
    try {
        return periodDocArray = await collectionHandle.find({created: { $gt:dateRange.start, $lt:dateRange.end }})/*.project({created: 1, allTotal: 1, sourceTotals: 1, incomplete: 1})*/.toArray()
    } catch (error) {
        console.error(error);
    }
}

async function prepAndWriteAveragesToDatabase(periodDocArray, collectionHandle, rangeType){
    console.log("prepAndWriteAveragesToDatabase")
    await updateAveragesDocInDatabase(await prepareAveragesDoc(periodDocArray, collectionHandle, rangeType), collectionHandle, rangeType)
    console.log("done prepAndWriteAveragesToDatabase")
}

async function prepareAveragesDoc(periodDocArray, collectionHandle, rangeType){
    console.log("prepareAveragesDoc")
    try {
        var averagesDoc = await collectionHandle.findOne({docName: "averages"})
    } catch(error) {
        console.error(error)
    }
    if(!averagesDoc){ //need to create it
        console.log("no averages doc.  creating one.")
        averagesDoc = {
            allAverage: 0,
            sourceAverages: new Object(), //contains object {name : {average: , numOfSamples: }}
            numberOfSamples: 0
        }
        if(rangeType==="day"){
            averagesDoc.secondAverages = Array.from({length:86400}, u => (0)) //86400 seconds in a day
            averagesDoc.subPeriodAverages = Array.from({length:24}, u => ({allAverage: 0, sourceAverages: {}, numberOfSamples: 0})) //biHourly period
        } else {
            averagesDoc.subPeriodAverages = Array.from({length:periodDocArray.length}, u => ({allAverage: 0, sourceAverages: {}, numberOfSamples: 0}))
        }
    }

    if(rangeType==="day"){
        prepareDayAveragesDoc(periodDocArray[0], averagesDoc)
    } else {
        var periodTotals = {allTotal: 0, sourceTotals: new Object()} //sourceTotals contains object {name: total}
        for(let index=0; index<periodDocArray.length; index++){
            if(getNumberOfSubPeriods(new Date(periodDocArray[index].created), rangeType) === index) {
                addToPeriod(periodTotals, periodDocArray[index])
                if(rangeType !== "month"){
                    averagePeriod(averagesDoc.subPeriodAverages[index], periodDocArray[index])
                }
            } else {
                console.error("sub-period mismatch!")
            }
        }
        averagePeriod(averagesDoc, periodTotals)
    }

    console.log("update averages completed")
    return averagesDoc
}

function prepareDayAveragesDoc(periodDoc, periodAverages){
    console.log("prepareDayAveragesDoc")
    var thisDayStr = periodDoc.created
    var thisDayStart = new Date(thisDayStr)
    thisDayStart.setHours(0,0,0,0)
    var currentIndex = 0
    var periodTotals = {allTotal: 0, sourceTotals: new Object()} //sourceTotals contains object {name: total}
    //vars for per hour calculations
    var subPeriodTotals = {allTotal: 0, sourceTotals: new Object()} //sourceTotals contains object {name: total}
    var hour = 0
    var currentTimestamp = new Date(thisDayStart) //init
    for(let second=0; second<86400; second++){
        var foundOne = true
        while(foundOne == true){
            foundOne = false
            if(currentIndex<periodDoc.timeRecord.length){
                currentTimestamp = new Date(periodDoc.timeRecord[currentIndex].created)
                if(second*1000 > (currentTimestamp - thisDayStart)){
                    addToPeriodDay(periodDoc.timeRecord[currentIndex], periodTotals, subPeriodTotals)
                    foundOne = true
                    currentIndex++
                }
            }
        }
        //all entries for current second have been tallied.  Now add it to average.
        periodAverages.secondAverages[second] = (periodAverages.secondAverages[second]*periodAverages.numberOfSamples+periodTotals.allTotal)/(periodAverages.numberOfSamples+1)
        //if time is greater than next milestone
        if(hour<24 && ((second+1) >= (hour+1)*3600)) {
            averagePeriod(periodAverages.subPeriodAverages[hour], subPeriodTotals)
            subPeriodTotals = {allTotal: 0, sourceTotals: new Object()} //sourceTotals contains object {name: total}
            hour++
        }
    }
    averagePeriod(periodAverages, periodTotals)
}

async function updateAveragesDocInDatabase(theDoc, collectionHandle, rangeType){
    console.log("updateAveragesDocInDatabase")
    var updateDoc = {  
        $setOnInsert: { 
            docName: "averages"
        },
        $currentDate: { modified: true },
        $set: {
            allAverage: theDoc.allAverage,
            sourceAverages: theDoc.sourceAverages,
            numberOfSamples: theDoc.numberOfSamples
        }
    }
    if(rangeType!=="month"){
        updateDoc.$set.subPeriodAverages = theDoc.subPeriodAverages
    }
    if(rangeType==="day"){
        updateDoc.$set.secondAverages = theDoc.secondAverages
    }

    try{
        await collectionHandle.updateOne({docName: "averages"}, updateDoc, {upsert:true, w: 1})
    } catch(error) {
        console.error(error)
    }
    console.log("database update averages completed")
}

function preparePeriodDoc(periodDocArray, rangeType){
    console.log("preparePeriodDoc")
    if(rangeType==="day"){
        var periodTotals = {allTotal: 0, sourceTotals: new Object(), subPeriodTotals : Array.from({length:24}, u => ({allTotal: 0, sourceTotals: new Object()}))} //sourceTotals contains object {name: total} 
        periodDocArray[0]===undefined ? null : prepareDayPeriodDoc(periodDocArray[0], periodTotals)
    } else {
        var periodTotals = {allTotal: 0, sourceTotals: new Object()} //sourceTotals contains object {name: total}
        for(let index=0; index<periodDocArray.length; index++){
            addToPeriod(periodTotals, periodDocArray[index])
        }
    }
    return periodTotals
}

function prepareDayPeriodDoc(periodDoc, periodTotals){
    console.log("prepareDayPeriodDoc")
    var thisDayStr = periodDoc.created
    var thisDayStart = new Date(thisDayStr)
    thisDayStart.setHours(0,0,0,0)
    var thisHoursCreated = new Date(thisDayStr)
    var currentIndex = 0
    for(let hour=0; hour < 24; hour++){
        var subPeriodTotals = {allTotal: 0, sourceTotals: new Object()} //sourceTotals contains object {name: total}
        thisHoursCreated.setHours(hour,1,0,0) // 1 minute so its within the time period
        var foundOne = true
        while(foundOne == true){
            foundOne = false
            if(currentIndex<periodDoc.timeRecord.length){
                var currentTimestamp = new Date(periodDoc.timeRecord[currentIndex].created)
                if((hour+1)*3600*1000 > (currentTimestamp - thisDayStart)){ //3600 seconds/hr
                    addToPeriodDay(periodDoc.timeRecord[currentIndex], periodTotals, periodTotals.subPeriodTotals[hour])
                    foundOne = true
                    currentIndex++
                }
            }
        }
        periodTotals.subPeriodTotals[hour].created = new Date(thisHoursCreated)
    }  
}

async function writePeriodDocToDatabase(theDoc, collectionHandle, aDateInPeriod, dateRange, isComplete, rangeType){
    console.log("writePeriodDocToDatabase")
    var updateDoc = {
        $setOnInsert: { //daily already has these entries
            created: new Date(aDateInPeriod),
            incomplete: !isComplete
        },
        $currentDate: {modified: true},
        $set: {
            sourceTotals: theDoc.sourceTotals
        }
    }
    if(rangeType==="day"){
        updateDoc.$set.subPeriodTotals = theDoc.subPeriodTotals
        updateDoc.$set.allTotalComp = theDoc.allTotal //todo: remove this line after checking
    } else {
        updateDoc.$set.allTotal = theDoc.allTotal
    }
 
    try{
        await collectionHandle.updateOne({created: { $gt:dateRange.start, $lt:dateRange.end }}, updateDoc, {upsert:true, w: 1})
    } catch(error) {
        console.error(error)
    }
    //console.log("database update day completed")
}

/*  
    adds subPeriodTotals data to periodTotals
    note: both objects must have allTotal and sourceTotals fields
*/
function addToPeriod(periodTotals, subPeriodTotals){
    Object.entries(subPeriodTotals.sourceTotals).forEach(([sourceName,sourceTotal])=>{
        periodTotals.sourceTotals[sourceName] = (periodTotals.sourceTotals.hasOwnProperty(sourceName) ? periodTotals.sourceTotals[sourceName] : 0)+sourceTotal
    })
    periodTotals.allTotal += subPeriodTotals.allTotal
}

function addToPeriodDay(aTimeRecord, periodTotals, subPeriodTotals){
    subPeriodTotals.allTotal += clicksToGallons(aTimeRecord.clicks)
    periodTotals.allTotal += clicksToGallons(aTimeRecord.clicks)
    for(let sourceIndex=0; sourceIndex<aTimeRecord.sources.length; sourceIndex++){
        var sourceName = aTimeRecord.sources[sourceIndex].name
        //need to scale sub flows relative to total flow going through the pipe since that's how the clicksToGallons equation was determined
        periodTotals.sourceTotals[sourceName] = (periodTotals.sourceTotals.hasOwnProperty(sourceName) ? periodTotals.sourceTotals[sourceName] : 0)+
            (aTimeRecord.sources[sourceIndex].clicks/aTimeRecord.clicks)*clicksToGallons(aTimeRecord.clicks)
        subPeriodTotals.sourceTotals[sourceName] = (subPeriodTotals.sourceTotals.hasOwnProperty(sourceName) ? subPeriodTotals.sourceTotals[sourceName] : 0)+
            (aTimeRecord.sources[sourceIndex].clicks/aTimeRecord.clicks)*clicksToGallons(aTimeRecord.clicks)
    }
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

function getDateRange(theDate, rangeType) {
    console.log("getDateRange")
    switch(rangeType) {
      case "day":
        var start = new Date(theDate)
        var end = new Date(start.getTime())
        start.setHours(0,0,0,0)
        end.setHours(24,0,0,0)
        break;
      case "week":
        var start = new Date(theDate)
        start.setDate(start.getDate() - (start.getDay()!==0 ? (start.getDay()-1) : 6)) //get previous Monday from date, getDay returns 0(sun)-6(sat)
        start.setHours(0,0,0,0)
        var end = new Date(start.getTime())
        end.setDate(end.getDate()+6) //get last day of week
        end.setHours(24,0,0,0)
        break;
      case "month":
        var start = new Date(theDate)
        start.setDate(1) //first of this month
        start.setHours(0,0,0,0)
        var lastDayOfMonth = new Date(start.getFullYear(), start.getMonth()+1, 0) //get last day of this month
        var end = new Date(lastDayOfMonth)
        end.setHours(24,0,0,0)
        break;
      case "year":
        var start = new Date(new Date(theDate).getFullYear(), 0, 1)
        start.setHours(0,0,0,0)
        var end = new Date(new Date(start).getFullYear(), 12, 1) //get first day of next year
        end.setHours(0,0,0,0)
        break;
      default:
        console.error("bad rangeType string")
    }
    console.log({start:start, end:end})
    return {start: start, end: end}
}

function periodIsComplete(array, requiredLength){
    console.log("periodIsComplete")
    if(array.length===requiredLength){
        return true
    }
    return false
}

function getNumberOfSubPeriods(date, rangeType){
    switch(rangeType) {
      //case "day":
      //  break;
      case "week":
        var numSubPeriods = (date.getDay()!==0 ? (date.getDay()-1) : 6) 
        break;
      //case "month":
      //  break;
      case "year":
        var numSubPeriods = date.getMonth()
        break;
      default:
        console.error("bad rangeType string")
    }
    return numSubPeriods  
}

function clicksToGallons(clicks){
    return (0.000925824*clicks + 0.0015719)
}

