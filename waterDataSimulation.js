const MQTT = require("async-mqtt");
var client = null

//Date vars
//var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
var currentDate =  new Date(2016, 0, 1, 0, 0, 0)
var endDate =      new Date(2019, 0, 1, 0, 0, 0)

Date = class extends Date {
  constructor(...options) {
    if (options.length) {
      super(...options);
    } else {
      super(currentDate);
    }
  }
}

//testing loop vars
sourceList = [
        { name: "ktchn sink", clicks: 13, quantity: 1 },
        { name: "bath sink",  clicks: 17, quantity: 2 },
        { name: "dishwasher", clicks: 10, quantity: 1 },
        { name: "toilet",     clicks: 41, quantity: 2 },
        { name: "tub",        clicks: 61, quantity: 1 },
        { name: "shower",     clicks: 28, quantity: 1 },
        { name: "laundry",    clicks: 33, quantity: 1 },
        { name: "studio",     clicks: 36, quantity: 1 }
    ]
var flowPattern = [0, 13, 13, 13, 13, 0] //to start with
var flowPatternIndex = 0
var TimeoutMs =  60*60*1000 //60 minutes in milliseconds
//flow.set("waterDateLastSeen", new Date(flow.get("currentDate")), "file")
var inCount = 0
var outCount = 0
 
main()
 
async function main() {
    //connect
    client = await MQTT.connectAsync("mqtt://localhost:1883",{clientId:"simulator"})
    console.log("client.connected = "+client.connected)

    //handle errors
    client.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)});

    //subscribe
    var subscribePromise = await client.subscribe("testing/ready");
    console.log("subscribePromise: "+subscribePromise)

    //start testing loop
    try{
        var clicks = await getClicks()
        var publishPromise = await client.publish("testing/lastSeen", getLastSeenDate());
        var publishPromise = await client.publish("testing/now", getNowDate());
        var publishPromise = await client.publish("water_monitor/flow_meter", clicks);
    } catch(err) {
        console.error(err)
    }

    //handle ready message
    client.on('message', async function(topic, message, packet){
        try{
            var clicks = await getClicks()
            var publishPromise = await client.publish("testing/now", getNowDate());
            var publishPromise = await client.publish("water_monitor/flow_meter", clicks);
        } catch(err) {
            console.error(err)
        }
        //console.log("topic: "+ topic +", message: "+ message);
    });
}

function getNowDate(){
    return currentDate.toISOString()
}

function updateNowDate(minutesJump, dayJump){
    currentDate.setSeconds(currentDate.getSeconds()+1)
    currentDate.setMinutes(currentDate.getMinutes()+minutesJump)
    //currentDate.setDate(currentDate.getDate()+dayJump)
}

function getLastSeenDate(){
    //var nowDate = new Date(currentDate)
    return currentDate.toISOString()
}

async function getClicks(){
    if(currentDate < endDate){
        flowPatternIndex++
        if(flowPatternIndex>=flowPattern.length){
            //console.log("setting new rate & period.")
            //flow.set("flowRate", flow.get("sourceList", "file")[Math.floor(Math.random() * flow.get("sourceList", "file").length)].clicks)
            var flowRate = sourceList[Math.floor(Math.random() * sourceList.length)].clicks
            flowPattern = Array.from({length:((Math.floor(Math.random() * 10)+1)+2)}, u => (flowRate))
            //set beginning and end elements to zero
            flowPattern[0] = 0
            flowPattern[flowPattern.length-1] = 0
            //flow.set("flowRate", 1078.42106059) //equals 1 gal
            //flow.set("flowPeriod", Math.floor(Math.random() * 20)+1)
            //flow.set("flowPeriod", 1)
            flowPatternIndex = 0
            updateNowDate((TimeoutMs/(60*1000))-1, 0)
            console.log(getNowDate())
        } else {
            updateNowDate(0, 0)
        }
        //console.log("element "+flowPatternIndex+" of "+(flowPattern.length-1))
        var clicks = flowPattern[flowPatternIndex]
        return clicks.toString()
    } else {
        try{
            await cleanupAndExit()
        } catch(err){
            console.error(err)
        }
    }
}

async function cleanupAndExit(){
    try{
        await client.end()
    } catch(err){
        console.error(err)
    }
    console.log("exiting")
    process.exit()
}
