//Temperature
// mode: 0 is "off", 1 is "heating", 2 is "cooling"
// timeMode: 0 is "plan", 1 is "once", 2 is "temp", 3 is "hold"
// settings: index 0 is heating, index 1 is cooling
//Humidity
// mode 0 is "off", 1 is "humidify", 2 is "dehumidify"
// settings index 0 is humidify, index 1 is dehumidify
//Ventilation
//mode: 0-"off", 1-"auto", 2-"20 min", 3-"1 hr", 4-"2 hr", 5-"4 hr", 6-"on", 7-"off 1h", 8-"off 2h", 9-"off 4h"
var airTestSequence = [
	//type: 1 is for requests, 2 is for responses
////DEFAULT SETTINGS ////
    ////////////////// TEMPERATURE //////////////////////
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 0}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 68, \"timeMode\": 0}}"},
    // heating settings
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeOn\": false }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeSetpoint\": 68 }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeTime\": \"2020-06-09T11:00:00.568Z\"}}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"sleepOn\": false}}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"sleepSetpoint\": 62 }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"sleepTime\": \"2020-02-02T13:55:00.062Z\"}}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"leaveOn\": false }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"leaveSetpoint\": 60 }}}"},
    // cooling settings
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"wakeOn\": false }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"wakeSetpoint\": 76 }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"wakeTime\": \"2020-06-09T11:00:00.568Z\"}}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepOn\": false}}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepSetpoint\": 80 }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepTime\": \"2020-02-02T13:55:00.062Z\"}}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"leaveOn\": false }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"leaveSetpoint\": 82 }}}"},
    /////////////////// HUMIDITY //////////////////////
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"fanMode\": 0}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"mode\": 0}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"setpoint\": 50}}"},
    // humidify settings
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"settings\": {\"index\": 0, \"leaveOn\": false }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"settings\": {\"index\": 0, \"leaveSetpoint\": 40 }}}"},
    // dehumidify settings
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"settings\": {\"index\": 1, \"leaveOn\": false }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"settings\": {\"index\": 1, \"leaveSetpoint\": 50 }}}"},
    ///////////////// VENTILATION //////////////////////
    {type: 1, topic: "air/test/UIspoof", message: "{\"ventilation\": {\"mode\": 0}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"ventilation\": {\"setpoint\": 600}}"},
    // settings
    {type: 1, topic: "air/test/UIspoof", message: "{\"ventilation\": {\"settings\": {\"offHoursOn\": false }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"ventilation\": {\"settings\": {\"offHoursStartTime\": \"2020-06-09T15:52:32.064Z\" }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"ventilation\": {\"settings\": {\"offHoursEndTime\": \"2020-06-09T16:00:32.072Z\" }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"ventilation\": {\"settings\": {\"temperatureAssistOn\": false }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"ventilation\": {\"settings\": {\"temperatureAssistLimit\": 5 }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"ventilation\": {\"settings\": {\"lastCalibrationDate\": \"2020-06-09T16:00:32.072Z\" }}}"},
    // initialize temp, hum, co2 in/out
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 62, \"humidity\": 45}"},
    {type: 1, topic: "air/tempHumOut/tempHum", message: "{\"temperature\": 75, \"humidity\": 64}"},
    {type: 1, topic: "air/co2In/co2", message: "{\"co2\": 650}"},
//// OPEN TESTING ////
	{type: 1, topic: "air/test/UIspoof", message: "{\"testingModeOn\":true}"},
	{type: 3, waitTime: 1000, message: "clear all messages"},
//// TEMPERATURE TESTS ////
	//Basic heating//
	/*{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 68, \"timeMode\": 0}}"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 62}"},
    {type: 1, topic: "air/tempHumOut/tempHum", message: "{\"temperature\": 75}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 1}}"},
	{type: 2, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 1}}"},*/
//// HUMIDIFY TESTS ////
	//Turn ON because of mode change to 1 (humidify)
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"setpoint\": 50}}"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 45}"},
    {type: 1, topic: "air/tempHumOut/tempHum", message: "{\"humidity\": 64}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"mode\": 1}}"},
	{type: 2, responses: [{topic: "air/humidifier/control", message: "{\"humidifierUnitOn\":true}"}]},
	//Turn OFF because of mode change to 0 (off)
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"mode\": 0}}"},
	{type: 2, responses: [{topic: "air/humidifier/control", message: "{\"humidifierUnitOn\":false}"}]},
	//Turn ON because of humidity inside change
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 52}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"mode\": 1}}"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 50}"},
    {type: 3, waitTime: 1000, message: "expect no message"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.5}"},
    {type: 3, waitTime: 1000, message: "expect no message"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.1}"},
    {type: 3, waitTime: 1000, message: "expect no message"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.0}"},
	{type: 2, responses: [{topic: "air/humidifier/control", message: "{\"humidifierUnitOn\":true}"}]},
	//turn OFF because of humidity inside change
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 48.0}"},
    {type: 3, waitTime: 1000, message: "expect no message"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.0}"},
    {type: 3, waitTime: 1000, message: "expect no message"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.1}"},
    {type: 3, waitTime: 1000, message: "expect no message"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 50.0}"},
    {type: 3, waitTime: 1000, message: "expect no message"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 50.9}"},
    {type: 3, waitTime: 1000, message: "expect no message"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 51.0}"},
	{type: 2, responses: [{topic: "air/humidifier/control", message: "{\"humidifierUnitOn\":false}"}]},	
//// CLOSE TESTING ////
	{type: 1, topic: "air/test/UIspoof", message: "{\"testingModeOn\":false}"},
]

const MQTT = require("async-mqtt")

//globals
var gotMessage = false
var index = 0

main().catch((err) => { console.error(err) })
 
async function main() {
    //connect
    console.log("connecting...")
    client = await MQTT.connectAsync("mqtt://localhost:1883",{clientId:"airSimulator"})
    console.log("client.connected = "+client.connected)

    //handle errors
    client.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)});

    //subscribe
    var subscribePromise = await client.subscribe("air/humidifier/control");
    console.log("subscribePromise: "+subscribePromise)

    client.on('message', async function(topic, message, packet){
		console.log(index)
		try{
			if(airTestSequence[index].type === 2){
				var foundOne=false;
				var allMessagesReceived=true;
				for(let i=0; i<airTestSequence[index].responses.length; i++){
					if((topic == airTestSequence[index].responses[i].topic) && (message == airTestSequence[index].responses[i].message)){
						console.log("expected message received. -> topic: "+ topic +", message: "+ message)
						airTestSequence[index].responses[i].messageReceived = true
						foundOne=true;
					}
					if(airTestSequence[index].responses[i].messageReceived != true){
						allMessagesReceived=false;
					}
				}
				if(!foundOne){
					console.error("UNEXPECTED MESSAGE ->         topic: "+ topic +", message: "+ message)
	        		endProgram()
				}
				gotMessage = allMessagesReceived
			}
	        else if(airTestSequence[index].type === 3){
	        	console.log("got message                -> topic: "+ topic +", message: "+ message)
	        }
	    } catch(err) {
            console.error(err)
        }
    });

    for(index=0; index<airTestSequence.length; index++){
    	console.log("index "+index+" of "+airTestSequence.length)
       	console.log(JSON.stringify(airTestSequence[index], null, 2))
       	//console.log("index: "+index+airTestSequence[index])
    	if(airTestSequence[index].type === 1){
		    try{
		        var publishPromise = await client.publish(airTestSequence[index].topic, airTestSequence[index].message);
		    } catch(err) {
		        console.error(err)
		    }
		} else if (airTestSequence[index].type === 2){
			console.log("waiting for message. index: "+index)
			try{
				await getMessage()
			} catch(err){
				console.error(err)
			}
		    //console.log("got a messagse. index: "+index)
		    gotMessage = false
		} else if (airTestSequence[index].type === 3){ //wait
			console.log(airTestSequence[index].message)
			await sleep(airTestSequence[index].waitTime)
		}
    }
    endProgram()
}

async function getMessage() {
    return new Promise(function (resolve, reject) {
        (function waitForMessage(){
            if (gotMessage) return resolve();
            setTimeout(waitForMessage, 100); //sets how often to recheck for message
        })();
    });
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function printInPlace(mystring){
	process.stdout.clearLine()
	process.stdout.cursorTo(0)
	process.stdout.write(mystring)
}

function endProgram(reason){
	if(reason){
		console.error(reason)
	}
	client.end()
	process.exit(1)
}
