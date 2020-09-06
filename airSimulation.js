//Temperature
// mode: 0 is "off", 1 is "heating", 2 is "cooling"
// timeMode: 0 is "plan", 1 is "once", 2 is "temp", 3 is "hold"
// settings: index 0 is heating, index 1 is cooling
//Humidity
// mode 0 is "off", 1 is "humidify", 2 is "dehumidify"
// settings index 0 is humidify, index 1 is dehumidify
//Ventilation
//mode: 0-"off", 1-"auto", 2-"20 min", 3-"1 hr", 4-"2 hr", 5-"4 hr", 6-"on", 7-"off 1h", 8-"off 2h", 9-"off 4h"
var sequences = {
airTestsSequence : [
	//{type: 4, sequenceName: "initializeSequence"},
	//{type: 4, sequenceName: "humidityTestsSequence"},
	//{type: 4, sequenceName: "initializeSequence"},
	//{type: 4, sequenceName: "fanTestsSequence"},
	//{type: 4, sequenceName: "initializeSequence"},
	//{type: 4, sequenceName: "temperatureFanBasicsTestsSequence"},
	{type: 4, sequenceName: "initializeSequence"},
	{type: 4, sequenceName: "temperatureWakeSleepTestsSequence"},
	{type: 4, sequenceName: "finishingSequence"},
],
initializeSequence:  [
	//type: 1 is for requests, 2 is for responses
	////DEFAULT SETTINGS ////
    ////////////////// TEMPERATURE //////////////////////
    //open testing
    {type: 1, topic: "air/test/UIspoof", message: "{\"testingModeOn\":true}"},
    // main settings
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
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"fanMode\":\"stop timer\"}}"},
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
    // wait for messages
	{type: 3, waitTime: 6000, message: "clear all messages"},
],
humidityTestsSequence : [
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
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.5}"},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.1}"},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.0}"},
	{type: 2, responses: [{topic: "air/humidifier/control", message: "{\"humidifierUnitOn\":true}"}]},
	//turn OFF because of humidity inside change
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 48.0}"},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.0}"},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.1}"},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 50.0}"},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 50.9}"},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 51.0}"},
	{type: 2, responses: [{topic: "air/humidifier/control", message: "{\"humidifierUnitOn\":false}"}]},	
],
fanTestsSequence : [
//mode: 0-"auto", 1-"15", 2-"30", 3-"60", 4-"120", 5-"240", 6-"480"
//// FAN TESTS ////
	//Test timer durations
	{type: 0, comment: "Test timer durations"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"fanMode\": 1}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"}]},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"}], timeout: 15},
	{type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"fanMode\": 2}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"}]},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"}], timeout: 30},
	{type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"fanMode\": 3}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"}]},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"}], timeout: 60},
	{type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"fanMode\": 4}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"}]},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"}], timeout: 120},
	{type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"fanMode\": 5}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"}]},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"}], timeout: 240},
	{type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"fanMode\": 6}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"}]},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"}], timeout: 480},
],
temperatureFanBasicsTestsSequence : [
// mode: 0 is "off", 1 is "heating", 2 is "cooling"
// timeMode: 0 is "plan", 1 is "once", 2 is "temp", 3 is "hold"
// settings: index 0 is heating, index 1 is cooling
	{type: 0, comment: "//// TEMPERATURE/FAN TESTS ////"},
	//Heating - temperature/fan on - mode switch on
	{type: 0, comment: "Heating - temperature/fan on - mode switch on"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 68, \"timeMode\": 0}}"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 62}"},
    {type: 1, topic: "air/tempHumOut/tempHum", message: "{\"temperature\": 75}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 1}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},]	},
	//Heating - temperature/fan on - temperature switch on
	{type: 0, comment: "Heating - temperature/fan on - temperature switch on"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 68, \"timeMode\": 0}}"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 69}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 1}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},] },
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.1}"},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.9}"},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.6}"},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.5}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},]	},
	//Heating - temperature/fan on - temperature switch off
	{type: 0, comment: "Heating - temperature/fan on - temperature switch off"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.6}"},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.1}"},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.4}"},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.5}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},]	},
	//Cooling - temperature/fan on - mode switch on
	{type: 0, comment: "Cooling - temperature/fan on - mode switch on"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 68, \"timeMode\": 0}}"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 69}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 2}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},]	},
	//Cooling - temperature/fan on - temperature switch on
	{type: 0, comment: "Cooling - temperature/fan on - temperature switch on"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 68, \"timeMode\": 0}}"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},] },
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.9}"},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.1}"},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.4}"},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.5}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},]	},
	//Cooling - temperature/fan on - temperature switch off
	{type: 0, comment: "Cooling - temperature/fan on - temperature switch off"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.4}"},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.1}"},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.6}"},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.5}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},]	},
	//Set fan to timer, check that temperature off doesn't trigger fan off
	{type: 0, comment: "Set fan to timer, check that temperature off doesn't trigger fan off"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 1}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},]},
	{type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"fanMode\": 1}}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 0}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"}]},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"}], timeout: 15},
	//Set fan to timer, check that fan timer off doesn't trigger fan off if temperature is still on
	{type: 0, comment: "Set fan to timer, check that fan timer off doesn't trigger fan off if temperature is still on"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"fanMode\": 1}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},]},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 1}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"}]},
	{type: 3, waitTime: 15000, message: "should get no messages", errorIfMessage: true},
],
temperatureWakeSleepTestsSequence : [
	//Set to HEATING mode, setpoint, and PLAN timeMode
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 69, \"timeMode\": 0}}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 1}}"},
	//Wake time triggers setpoint change when in PLAN mode
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeSetpoint\": 67 }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeOn\": true }}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},], timeout: 5	},
	//Wake time triggers setpoint change when in ONCE mode, mode switches to PLAN mode
	//Wake time triggers setpoint change when in TEMP mode, mode switches to PLAN mode
	//Wake time does NOT trigger setpoint change when in HOLD mode, stays in HOLD mode
	//Wake time off clears timer for setpoint change
	//Changing Wake time resets timer properly
	//After timer expires, timer is reset properly

	//Sleep time triggers setpoint change when in PLAN mode
	//Sleep time triggers setpoint change when in ONCE mode, mode switches to PLAN mode
	//Sleep time triggers setpoint change when in TEMP mode, mode switches to PLAN mode
	//Sleep time does NOT trigger setpoint change when in HOLD mode, stays in HOLD mode
	//Sleep time off clears timer for setpoint change
	//Changing Sleep time resets timer properly
	//After timer expires, timer is reset properly

	//Switching cooling to heating triggers timers to be set properly
	//Switching heating to cooling triggers timers to be set properly
	//Switching to mode off triggers timers to be cleared
],
temperatureTimeModeTestsSequence : [
	//When in PLAN mode, setpoint change switches to ONCE mode
	//When setpoint is reached, switches to PLAN mode
	//When in ONCE mode, setpoint change stays in ONCE mode
	//When in TEMP mode, setpoint change switches to ONCE mode
	//When in HOLD mode, setpoint change switches to ONCe mode
],
temperatureModeTestsSequence : [
	//When ON in COOLING mode, switching to HEATING mode turns unit OFF
	//When ON in HEATING mode, switching to COOLING mode turn unit OFF
	//When in ONCE mode, when setpoint is reached, switches to PLAN mode
	//When in ONCE mode, setpoint change stays in ONCE mode
	//When in TEMP mode, setpoint change switches to ONCE mode
	//When in HOLD mode, setpoint change switches to ONCe mode
],
testUserInput : [
	{type: 5, message: "Are you David? (y/n)", expectedAnswer: "y"},
	{type: 5, message: "How old are you?", expectedAnswer: "32"},
	{type: 5, message: "Why?", expectedAnswer: "bECauSe"}
],
finishingSequence : [
	{type: 0, comment: "Close Testing"},
	//{type: 1, topic: "air/test/UIspoof", message: "{\"testingModeOn\":false}"},
	{type: 3, waitTime: 1000, message: "clear all messages"}
],
}

const MQTT = require("async-mqtt")
var easyTimer = require('easytimer.js').Timer;
const readline = require('readline');

//globals
var gotAllMessages = false
var currentStep = {type: 3, waitTime: 1000, message: "clear all messages"} //initialize step to handle messages
var messageTimeoutTimer = new easyTimer();

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
    await client.subscribe("air/humidifier/control");
    await client.subscribe("air/heatCoolFan/control");
    //console.log("subscribePromise: "+subscribePromise)

    //handle incoming messages
    client.on('message', async function(topic, message, packet){
		try{
			if(currentStep.type === 2){
				var foundOne=false;
				var allMessagesReceived=true;
				for(let i=0; i<currentStep.responses.length; i++){
					if((topic == currentStep.responses[i].topic) && (message == currentStep.responses[i].message)){
						console.log("	expected message received. -> topic: "+ topic +", message: "+ message)
						currentStep.responses[i].messageReceived = true
						foundOne=true;
					}
					if(currentStep.responses[i].messageReceived != true){
						allMessagesReceived=false;
					}
				}
				if(!foundOne){
	        		endProgram("	UNEXPECTED MESSAGE ->         topic: "+ topic +", message: "+ message)
				}
				gotAllMessages = allMessagesReceived
			}
	        else if(currentStep.type === 3){
	        	if(currentStep.errorIfMessage){
	        		endProgram("	UNEXPECTED MESSAGE ->         topic: "+ topic +", message: "+ message)
	        	} else {
	        		console.log("	received message                -> topic: "+ topic +", message: "+ message)
	        	}
	        }
	    } catch(err) {
            console.error(err)
        }
    });

    await executeSequence(sequences.airTestsSequence)
    endProgram("-----   Passed all tests successfully. ------")
}

async function executeSequence(sequence){
    for(let index=0; index<sequence.length; index++){
    	//console.log("index "+index+" of "+sequence.length)
       	//console.log(JSON.stringify(sequence[index], null, 2))
       	//console.log("index: "+index+sequence[index])
       	if(sequence[index].type === 0){
       		console.log("//// "+sequence[index].comment+" ////")
       	} else if(sequence[index].type === 1){
		    try{
		    	if(sequence[index].timestampSecondsFromNow){
		    		var timestamp = new Date()
		    		timestamp.setSeconds(timestamp.getSeconds()+sequence[index].timestampSecondsFromNow)
		    		sequence[index].message = (sequence[index].message).replace("timestamp", timestamp.toISOString())

		    	}
		        await client.publish(sequence[index].topic, sequence[index].message);
		        console.log("	sent message: topic: "+sequence[index].topic+ ", message: "+ sequence[index].message)
		    } catch(err) {
		        console.error(err)
		    }
		} else if (sequence[index].type === 2){
			console.log("	waiting for message(s)...")
			for(let i=0; i<sequence[index].responses.length; i++){
				console.log("		topic: "+sequence[index].responses[i].topic+" message: "+sequence[index].responses[i].message)
			}
			try{
				currentStep = sequence[index]
				if(sequence[index].timeout){
					startTimer(sequence[index].timeout+1)
				}
				await getMessage()
				endTimer()
			} catch(err){
				endProgram(err)
			}
		    //console.log("got a messagse. index: "+index)
		    gotAllMessages = false
		} else if (sequence[index].type === 3){ //wait
			console.log("	waiting for "+sequence[index].waitTime/1000+" second(s). "+sequence[index].message)
			currentStep = sequence[index]
			await sleep(sequence[index].waitTime)
		} else if(sequence[index].type === 4) { //run sub-sequence
			console.log("	Starting sequence: " + sequence[index].sequenceName)
			await executeSequence(sequences[sequence[index].sequenceName])
		} else if(sequence[index].type === 5) { //await user input
			const answer = await askQuestion(sequence[index].message);
			if(answer.localeCompare(sequence[index].expectedAnswer, undefined, { sensitivity: 'base' })){
				endProgram("Test failed.  Expected answer: "+sequence[index].expectedAnswer)
			}
			//console.log("Test passed.")
		}
    }
}

async function getMessage() {
    return new Promise(function (resolve, reject) {
        (function waitForMessage(){
            if (gotAllMessages) return resolve();
            setTimeout(waitForMessage, 100); //sets how often to recheck for message
        })();
    });
}

//////TIMER STUFF//////
function startTimer(secondsDuration) {
    messageTimeoutTimer.start({countdown: true, startValues: {seconds: secondsDuration+1}})
    printInPlace("	timeout in: "+messageTimeoutTimer.getTimeValues().toString(['minutes'])+":"+messageTimeoutTimer.getTimeValues().toString(['seconds']))
    
    messageTimeoutTimer.addEventListener('secondsUpdated', handleSecondsUpdated)
    messageTimeoutTimer.addEventListener('targetAchieved', handleTargetAchieved)
}

function endTimer(){
	messageTimeoutTimer.stop()
}

function handleSecondsUpdated(){
	var secondsLeft = messageTimeoutTimer.getTimeValues().toString(['seconds'])
	if(gotAllMessages && secondsLeft > 3){
		endProgram("	Received all messages too early.")
	}
    printInPlace("	timeout in: "+messageTimeoutTimer.getTimeValues().toString(['minutes'])+":"+messageTimeoutTimer.getTimeValues().toString(['seconds']))	
}

function handleTargetAchieved(){
	if(!gotAllMessages){
		endProgram("	missing message(s) after timeout.")
	}
}
//////END TIMER STUFF//////

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query+" ", ans => {
        rl.close();
        resolve(ans);
    }))
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