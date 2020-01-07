const MQTT = require("async-mqtt");
const path = require('path')
const fs = require('fs')
const os = require('os')
var client = null

//basic test - "bath sink" source turns on then turns off -> should identify as "bath sink"
const test1a = [0, 0, 10, 16, 17, 17, 17, 16, 8, 0, 0]
//test two known sources turn on at same time, then one drop out
const test1b = [0, 0, 32, 41, 49, 59, 58, 57, 45, 42, 41, 40, 30, 5, 0, 0]
//test two known sources turn on at same time, then one drop out, then other drop out, all on top of a known
const test1c = [10, 10, 24, 45, 55, 56, 54, 55, 45, 38, 39, 37, 27, 27, 28, 14, 10, 10, 0, 0]

//test known down to a different known
const test2a = [0, 0, 9, 24, 27, 28, 27, 27, 26, 22, 18, 17, 3, 0, 0]
//test unknown down to known
const test2b = [0, 0, 13, 23, 23, 23, 23, 16, 10, 11, 10, 5, 0, 0]
//test unknown up to unknown and down to unknown, all on top of a known
const test2c = [0, 0, 41, 41, 54, 64, 64, 64, 69, 71, 72, 71, 71, 66, 61, 61, 61, 51, 41, 41, 41, 20, 0, 0 ]
//test unknown up to known
const test2d = [0, 0, 13, 22, 23, 22, 26, 28, 27, 28, 20, 0, 0]

//test two known sources drop out at same time to zero
const test3a = [0, 0, 13, 14, 12, 20, 30, 32, 31, 30, 25, 20, 15, 10, 5, 0, 0]
//test two known sources drop out at same time to known
const test3b = [0, 0, 13, 14, 12, 20, 30, 32, 31, 31, 25, 20, 15, 10, 10, 11, 0, 0]
//test two known sources drop out at same time to unknown
const test3c = [0, 0, 13, 14, 12, 20, 30, 32, 31, 30, 15, 6, 7, 6, 6, 0, 0]
//test two known sources drop out at same time to unknown, on top of known
const test3d = [10, 10, 23, 24, 22, 30, 40, 42, 41, 40, 25, 16, 17, 16, 16, 10, 10]
//test two known sources drop out at same time to known, on top of unknown
const test3e = [6, 6, 11, 19, 20, 18, 26, 36, 38, 37, 36, 21, 12, 13, 12, 12, 6, 6]

//basic positive burst
const test4a = [0, 0, 3, 6, 2, 0, 0]
//positive burst on top of known
const test4b = [0, 0, 5, 34, 34, 33, 36, 39, 35, 33, 32, 15, 5, 0, 0]
//negative burst on top of known
const test4c = [0, 0, 5, 34, 34, 33, 30, 27, 31, 33, 32, 15, 5, 0, 0]
//large negative burst on top of multiple knowns
const test4d = [13, 13, 54, 54, 34, 13, 3, 27, 33, 54, 54, 25, 0, 0]
//positive burst on top of unknown
const test4e = [0, 0, 5, 34, 54, 53, 54, 57, 60, 56, 54, 53, 25, 0, 0]
//negative burst on top of unknown
const test4f = [0, 0, 5, 34, 54, 53, 54, 51, 48, 50, 54, 53, 25, 0, 0]
//negative burst from unknown to known on top of known
const test4g = [12, 13, 18, 47, 67, 66, 64, 61, 57, 44, 38, 32, 26, 22, 25, 30, 31, 30, 25, 20, 15, 10, 5, 0, 0]

//slow positive drift with no knowns/unknowns, sudden drop
const test5a = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 5, 0, 0]
//slow positive drift on top of known, drop to known
const test5b = [10, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 15, 10, 10, 5, 0, 0]
//slow positive drift, on top of known, drop to zero
const test5c = [10, 10, 11, 12, 13, 14, 15, 0, 0]
//slow positive drift, on top of known, drop to low unknown
const test5d = [10, 10, 11, 12, 13, 14, 15, 2, 2, 0, 0]
//slow negative drift, on top of known, jump to known
const test5e = [10, 10, 9, 8, 7, 6, 5, 10, 10, 0, 0]
//slow positive drift on top of unknown & known, drop to known
const test5f = [13, 13, 28, 28, 29, 30, 31, 32, 33, 27, 23, 23, 0, 0]

//attempt 2, quantity 1 sources in match going up
const testSame = [0, 0, 10, 10, 15, 20, 20, 15, 10, 10, 5, 0, 0]
//attempt 2, quantity 1 sources in rematch going down
const testSame2 = [0, 0, 10, 10, 15, 20, 25, 25, 20, 20, 15, 10, 10, 0, 0]
//attempt 3, quantity 2 sources
const testSame3 = [17, 17, 25, 34, 34, 42, 51, 51, 60, 68, 68, 60, 51, 51, 42, 34, 34, 25, 17, 17, 8, 0, 0]

//test leftover in transitionData
const testLeftover = [6, 6, 11, 19, 20, 18, 26, 37, 37, 36, 36, 21, 12, 6, 0, 0]

//ui tests
const testAll = [0, 0, 13, 13, 30, 30, 40, 40, 81, 81, 142, 142, 170, 170, 203, 203, 239, 239, 0, 0]

//testing loop vars
var flowPattern = testAll //PICK WHICH TEST TO RUN

const nodeRedDirectory = path.join(os.homedir(), ".node-red")
const sourceList = JSON.parse(fs.readFileSync(path.join(nodeRedDirectory, "sourceList.json")))
var flowPatternIndex = 0
var TimeoutMs =  60*60*1000 //60 minutes in milliseconds
var inCount = 0
var outCount = 0
 
main().catch((err) => { console.error(err) })
 
async function main() {
    //connect
    console.log("connecting...")
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
        process.stdout.write("\n"+clicks)
        var publishPromise = await client.publish("water_monitor/flow_meter", clicks);
    } catch(err) {
        console.error(err)
    }

    //handle ready message
    client.on('message', async function(topic, message, packet){
        try{
            process.stdout.write(" | "+message.toString())
            var clicks = await getClicks()
            var publishPromise = await client.publish("testing/now", getNowDate());
            process.stdout.write("\n"+clicks)
            var publishPromise = await client.publish("water_monitor/flow_meter", clicks);
        } catch(err) {
            console.error(err)
        }
        //console.log("topic: "+ topic +", message: "+ message);
    });
}

function getNowDate(){
    var currentDate = new Date()
    return currentDate.toISOString()
}

function updateNowDate(minutesJump, dayJump){
    //currentDate.setSeconds(currentDate.getSeconds()+1)
    //currentDate.setMinutes(currentDate.getMinutes()+minutesJump)
    //currentDate.setDate(currentDate.getDate()+dayJump)
}

function getLastSeenDate(){
    var currentDate = new Date()
    return currentDate.toISOString()
}

async function getClicks(){
    if(flowPatternIndex<flowPattern.length){
        var clicks = flowPattern[flowPatternIndex]
        flowPatternIndex++
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
