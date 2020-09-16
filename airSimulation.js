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
	{type: 4, sequenceName: "temperatureTimeModeTestsSequence"},
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
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 62, \"humidity\": 45}", updateState: {temperatureIn: 62, humidityIn: 45}},
    {type: 1, topic: "air/tempHumOut/tempHum", message: "{\"temperature\": 75, \"humidity\": 64}", updateState: {temperatureOut: 75, humidityOut: 64}},
    {type: 1, topic: "air/co2In/co2", message: "{\"co2\": 650}", updateState: {co2: 650}},
    // wait for messages
	{type: 3, waitTime: 5000, message: "clear all messages"},
],
humidityTestsSequence : [
//// HUMIDIFY TESTS ////
	//Turn ON because of mode change to 1 (humidify)
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"setpoint\": 50}}"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 45}", updateState: {humidityIn: 45}},
    {type: 1, topic: "air/tempHumOut/tempHum", message: "{\"humidity\": 64}", updateState: {humidityOut: 64}},
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"mode\": 1}}"},
	{type: 2, responses: [{topic: "air/humidifier/control", message: "{\"humidifierUnitOn\":true}"}]},
	//Turn OFF because of mode change to 0 (off)
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"mode\": 0}}"},
	{type: 2, responses: [{topic: "air/humidifier/control", message: "{\"humidifierUnitOn\":false}"}]},
	//Turn ON because of humidity inside change
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 52}", updateState: {humidityIn: 52}},
    {type: 1, topic: "air/test/UIspoof", message: "{\"humidity\": {\"mode\": 1}}"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 50}", updateState: {humidityIn: 50}},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.5}", updateState: {humidityIn: 49.5}},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.1}", updateState: {humidityIn: 49.1}},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.0}", updateState: {humidityIn: 49.0}},
	{type: 2, responses: [{topic: "air/humidifier/control", message: "{\"humidifierUnitOn\":true}"}]},
	//turn OFF because of humidity inside change
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 48.0}", updateState: {humidityIn: 48.0}},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.0}", updateState: {humidityIn: 49}},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 49.1}", updateState: {humidityIn: 49.1}},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 50.0}", updateState: {humidityIn: 50}},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 50.9}", updateState: {humidityIn: 50.9}},
    {type: 3, waitTime: 1000, message: "expect no message", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"humidity\": 51.0}", updateState: {humidityIn: 51}},
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
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 62}", updateState: {temperatureIn: 62}},
    {type: 1, topic: "air/tempHumOut/tempHum", message: "{\"temperature\": 75}", updateState: {temperatureOut: 75}},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 1}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},]	},
	//Heating - temperature/fan on - temperature switch on
	{type: 0, comment: "Heating - temperature/fan on - temperature switch on"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 68, \"timeMode\": 0}}"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 69}", updateState: {temperatureIn: 69}},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 1}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},] },
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.1}", updateState: {temperatureIn: 68.1}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.9}", updateState: {temperatureIn: 67.9}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.6}", updateState: {temperatureIn: 67.6}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.5}", updateState: {temperatureIn: 67.5}},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},]	},
	//Heating - temperature/fan on - temperature switch off
	{type: 0, comment: "Heating - temperature/fan on - temperature switch off"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.6}", updateState: {temperatureIn: 67.6}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.1}", updateState: {temperatureIn: 68.1}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.4}", updateState: {temperatureIn: 68.4}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.5}", updateState: {temperatureIn: 68.5}},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},]	},
	//Cooling - temperature/fan on - mode switch on
	{type: 0, comment: "Cooling - temperature/fan on - mode switch on"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 68, \"timeMode\": 0}}"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 69}", updateState: {temperatureIn: 69}},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 2}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},]	},
	//Cooling - temperature/fan on - temperature switch on
	{type: 0, comment: "Cooling - temperature/fan on - temperature switch on"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 68, \"timeMode\": 0}}"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67}", updateState: {temperatureIn: 67}},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},] },
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.9}", updateState: {temperatureIn: 67.9}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.1}", updateState: {temperatureIn: 68.1}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.4}", updateState: {temperatureIn: 68.4}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.5}", updateState: {temperatureIn: 68.5}},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
						  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},]	},
	//Cooling - temperature/fan on - temperature switch off
	{type: 0, comment: "Cooling - temperature/fan on - temperature switch off"},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.4}", updateState: {temperatureIn: 68.4}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.1}", updateState: {temperatureIn: 68.1}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.6}", updateState: {temperatureIn: 67.6}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
    {type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 67.5}", updateState: {temperatureIn: 67.5}},
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
// mode: 0 is "off", 1 is "heating", 2 is "cooling"
// timeMode: 0 is "plan", 1 is "once", 2 is "temp", 3 is "hold"
// settings: index 0 is heating, index 1 is cooling
//// WAKE - HEATING /////
	//Set to HEATING mode, setpoint, and PLAN timeMode
	{type: 0, comment: "Set to HEATING mode, setpoint, and PLAN timeMode"},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68}", updateState: {temperatureIn: 68}},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 67, \"timeMode\": 0}}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 1}}"},
	//Wake time triggers setpoint change when in PLAN mode
	{type: 0, comment: "Wake time triggers setpoint change when in PLAN mode"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeSetpoint\": 69 }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeOn\": true }}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},], timeout: 5	},
	//Wake time triggers setpoint change when in ONCE mode, mode switches to PLAN mode
	{type: 0, comment: "Wake time triggers setpoint change when in ONCE mode, mode switches to PLAN mode"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 67, \"timeMode\": 1}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},], timeout: 5	},
	{type: 5, message: "Did UI change temp timeMode to ONCE? (y/n)", expectedAnswer: "y"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},], timeout: 5	},
	{type: 5, message: "Did UI change temp timeMode to PLAN? (y/n)", expectedAnswer: "y"},
	//Wake time triggers setpoint change when in TEMP mode, mode switches to PLAN mode
	{type: 0, comment: "Wake time triggers setpoint change when in ONCE mode, mode switches to PLAN mode"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 67, \"timeMode\": 2}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},], timeout: 5	},
	{type: 5, message: "Did UI change temp timeMode to TEMP? (y/n)", expectedAnswer: "y"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},], timeout: 5	},
	{type: 5, message: "Did UI change temp timeMode to PLAN? (y/n)", expectedAnswer: "y"},
	//Wake time does NOT trigger setpoint change when in HOLD mode, stays in HOLD mode
	{type: 0, comment: "Wake time does NOT trigger setpoint change when in HOLD mode, stays in HOLD mode"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 67, \"timeMode\": 3}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},], timeout: 5	},
	{type: 5, message: "Did UI change temp timeMode to HOLD? (y/n)", expectedAnswer: "y"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
	{type: 3, waitTime: 5000, message: "should get no messages", errorIfMessage: true},
	{type: 5, message: "Did UI temp timeMode stay in HOLD mode? (y/n)", expectedAnswer: "y"},
	//Check that while in HOLD mode, wake time will still change the setpoint of PLAN mode.
	{type: 0, comment: "Check that while in HOLD mode, wake time will still change the setpoint of PLAN mode."},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 67, \"timeMode\": 0}}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 67, \"timeMode\": 3}}"},
	{type: 3, waitTime: 2000, message: "did not change setpoint, only timeMode to HOLD, should not get any messages", errorIfMessage: true},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
	{type: 3, waitTime: 5000, message: "wake timer should not disrupt HOLD mode. should get no messages", errorIfMessage: true},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"timeMode\": 0}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},], timeout: 5	},
	{type: 5, message: "Did UI change temp timeMode to PLAN mode? (y/n)", expectedAnswer: "y"},
	//Wake timer off clears timer for setpoint change
	{type: 0, comment: "Wake timer off clears timer for setpoint change"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 67, \"timeMode\": 0}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},], timeout: 5	},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
	{type: 3, waitTime: 3000, message: "wait 3 seconds before sending Wake OFF", errorIfMessage: true},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeOn\": false }}}"},
	{type: 3, waitTime: 3000, message: "timer should not go off now, so we should not get any messages", errorIfMessage: true},
	//Changing Wake time resets timer properly
	{type: 0, comment: "Changing Wake time resets timer properly"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 67, \"timeMode\": 0}}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeOn\": true }}}"},
	{type: 3, waitTime: 3000, message: "wait 3 seconds before sending new Wake Time", errorIfMessage: true},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
	{type: 3, waitTime: 3000, message: "wait 3 seconds to make sure old timer does not go off", errorIfMessage: true},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},], timeout: 3	},
	//After timer expires, timer is reset properly

//// SLEEP - COOLING /////
	//Set to COOLING mode, setpoint, and PLAN timeMode
	{type: 0, comment: "Set to HEATING mode, setpoint, and PLAN timeMode"},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 76}", updateState: {temperatureIn: 76}},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 77, \"timeMode\": 0}}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 2}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},], timeout: 5},
	//Sleep time triggers setpoint change when in PLAN mode
	{type: 0, comment: "Sleep time triggers setpoint change when in PLAN mode"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepSetpoint\": 75 }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepOn\": true }}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},], timeout: 5	},
	//Sleep time triggers setpoint change when in ONCE mode, mode switches to PLAN mode
	{type: 0, comment: "Sleep time triggers setpoint change when in ONCE mode, mode switches to PLAN mode"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 77, \"timeMode\": 1}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},], timeout: 5	},
	{type: 5, message: "Did UI change temp timeMode to ONCE? (y/n)", expectedAnswer: "y"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},], timeout: 5	},
	{type: 5, message: "Did UI change temp timeMode to PLAN? (y/n)", expectedAnswer: "y"},
	//Sleep time triggers setpoint change when in TEMP mode, mode switches to PLAN mode
	{type: 0, comment: "Sleep time triggers setpoint change when in ONCE mode, mode switches to PLAN mode"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 77, \"timeMode\": 2}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},], timeout: 5	},
	{type: 5, message: "Did UI change temp timeMode to TEMP? (y/n)", expectedAnswer: "y"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},], timeout: 5	},
	{type: 5, message: "Did UI change temp timeMode to PLAN? (y/n)", expectedAnswer: "y"},
	//Sleep time does NOT trigger setpoint change when in HOLD mode, stays in HOLD mode
	{type: 0, comment: "Sleep time does NOT trigger setpoint change when in HOLD mode, stays in HOLD mode"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 77, \"timeMode\": 3}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},], timeout: 5	},
	{type: 5, message: "Did UI change temp timeMode to HOLD? (y/n)", expectedAnswer: "y"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
	{type: 3, waitTime: 5000, message: "should get no messages", errorIfMessage: true},
	{type: 5, message: "Did UI temp timeMode stay in HOLD mode? (y/n)", expectedAnswer: "y"},
	//Check that while in HOLD mode, sleep time will still change the setpoint of PLAN mode.
	{type: 0, comment: "Check that while in HOLD mode, sleep time will still change the setpoint of PLAN mode."},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 77, \"timeMode\": 0}}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 77, \"timeMode\": 3}}"},
	{type: 3, waitTime: 2000, message: "did not change setpoint, only timeMode to HOLD, should not get any messages", errorIfMessage: true},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
	{type: 3, waitTime: 5000, message: "sleep timer should not disrupt HOLD mode. should get no messages", errorIfMessage: true},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"timeMode\": 0}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},], timeout: 5	},
	{type: 5, message: "Did UI change temp timeMode to PLAN mode? (y/n)", expectedAnswer: "y"},
	//Sleep timer off clears timer for setpoint change
	{type: 0, comment: "Sleep timer off clears timer for setpoint change"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 77, \"timeMode\": 0}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},], timeout: 5	},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
	{type: 3, waitTime: 3000, message: "wait 3 seconds before sending Sleep OFF", errorIfMessage: true},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepOn\": false }}}"},
	{type: 3, waitTime: 3000, message: "timer should not go off now, so we should not get any messages", errorIfMessage: true},
	//Changing Sleep time resets timer properly
	{type: 0, comment: "Changing Sleep time resets timer properly"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 77, \"timeMode\": 0}}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepOn\": true }}}"},
	{type: 3, waitTime: 3000, message: "wait 3 seconds before sending new Sleep Time", errorIfMessage: true},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
	{type: 3, waitTime: 3000, message: "wait 3 seconds to make sure old timer does not go off", errorIfMessage: true},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},], timeout: 3	},
	//After timer expires, timer is reset properly

	//Switching cooling to heating triggers timers to be set properly
	{type: 0, comment: "Switching cooling to heating triggers timers to be set properly"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 67, \"timeMode\": 0}}"},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68}"}, //will stay on because its in COOLING mode
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"wakeOn\": false }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepOn\": false }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeSetpoint\": 69 }}}"}, //in heating mode, will turn on
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeOn\": true }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"sleepSetpoint\": 67 }}}"}, //in heating mode will turn off
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"sleepTime\": \"timestamp\"}}}", timestampSecondsFromNow: 10},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"sleepOn\": true }}}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 1}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},]},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},], timeout: 5},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},], timeout: 5},
	//Switching heating to cooling triggers timers to be set properly
	{type: 0, comment: "Switching heating to cooling triggers timers to be set properly"},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 76}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 75, \"timeMode\": 0}}"}, //will stay on because its in HEATING mode
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"wakeOn\": false }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 0, \"sleepOn\": false }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"wakeSetpoint\": 77 }}}"}, //in heating mode, will turn on
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"wakeTime\": \"timestamp\"}}}", timestampSecondsFromNow: 5},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"wakeOn\": true }}}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepSetpoint\": 75 }}}"}, //in heating mode will turn off
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepTime\": \"timestamp\"}}}", timestampSecondsFromNow: 10},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"settings\": {\"index\": 1, \"sleepOn\": true }}}"},
	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 2}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},]},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},], timeout: 5},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},], timeout: 5},
	//Switching to mode off triggers timers to be cleared
],
temperatureTimeModeTestsSequence : [
// mode: 0 is "off", 1 is "heating", 2 is "cooling"
// timeMode: 0 is "plan", 1 is "once", 2 is "temp", 3 is "hold"
// settings: index 0 is heating, index 1 is cooling
	{type: 0, comment: "//// TIMEMODE TESTS ////"},
	//In ONCE mode, when setpoint is reached in direction of MODE, switches to PLAN mode
	{type: 0, comment: "In ONCE mode, when setpoint is reached in direction of MODE, switches to PLAN mode"},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68}"},
    {type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 68, \"timeMode\": 0}}"},
   	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"mode\": 1}}"},
   	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 69, \"timeMode\": 1}}"},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},]},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 69}", updateState: {temperatureIn: 69}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 69}", updateState: {temperatureIn: 69}}, //test if temp staying the same messes up the hysteresis
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.9}", updateState: {temperatureIn: 68.9}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 69.5}", updateState: {temperatureIn: 69.5}},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},]},
	{type: 5, message: "Did UI change temp timeMode to PLAN and setpoint to 68? (y/n)", expectedAnswer: "y", errorIfMessage: true},
	//In ONCE mode, when setpoint is reached in opposite direction of MODE, switches to PLAN mode
	{type: 0, comment: "In ONCE mode, when setpoint is reached in opposite direction of MODE, switches to PLAN mode"},
   	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 65, \"timeMode\": 1}}"},
   	{type: 3, waitTime: 100, message: "order important. waiting for last message to process", errorIfMessage: true},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 65}", updateState: {temperatureIn: 65}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 65.1}", updateState: {temperatureIn: 65.1}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 64.5}", updateState: {temperatureIn: 64.5}},
	{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":true}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":true}"},]},
	{type: 5, message: "Did UI change temp timeMode to PLAN and setpoint to 68? (y/n)", expectedAnswer: "y", errorIfMessage: true},
	//When in ONCE mode, if node-red is restarted, switches to PLAN mode
	{type: 0, comment: "When in ONCE mode, if node-red is restarted, switches to PLAN mode"},
   	{type: 1, topic: "air/test/UIspoof", message: "{\"temperature\": {\"setpoint\": 70, \"timeMode\": 1}}"},
   	{type: 3, waitTime: 100, message: "order important. waiting for last message to process", errorIfMessage: true},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68}", updateState: {temperatureIn: 68}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 68.5}", updateState: {temperatureIn: 68.5}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 69.5}", updateState: {temperatureIn: 69.5}},
	{type: 3, waitTime: 1000, message: "shouldn't trigger temperature/fan on", errorIfMessage: true},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 70}", updateState: {temperatureIn: 70}},
	{type: 5, message: "Restart node-red and type 'y' to continue. (y/n)", expectedAnswer: "y", errorIfMessage: false},
	{type: 1, topic: "air/tempHumIn/tempHum", message: "{\"temperature\": 70.5}", updateState: {temperatureIn: 70.5}},
	/*{type: 2, responses: [{topic: "air/heatCoolFan/control", message: "{\"temperatureUnitOn\":false}"},
					  {topic: "air/heatCoolFan/control", message: "{\"fanOn\":false}"},]},*/
	{type: 5, message: "Did UI change temp timeMode to PLAN and setpoint to 68? (y/n)", expectedAnswer: "y", errorIfMessage: true},
],
temperatureModeTestsSequence : [
	//When ON in COOLING mode, switching to HEATING mode turns unit OFF
	//When ON in HEATING mode, switching to COOLING mode turn unit OFF
	//When in ONCE mode, when setpoint is reached, switches to PLAN mode
	//When in ONCE mode, setpoint change stays in ONCE mode
	//When in TEMP mode, setpoint change switches to ONCE mode
	//When in HOLD mode, setpoint change switches to ONCe mode
],
temperatureSensorTestsSequence : [
	//When unit is ON and the temperatureIn sensor disconnects
	//When unit if OFF and the temperatureIn sensor disconnects
	//When unit is ON and the temperatureOut sensor disconnects
	//When unit if OFF and the temperatureOut sensor disconnects
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
const skipUserInputs = false
var state = {}

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
    await client.subscribe("air/dehumVent/control");
    await client.subscribe("air/tempHumIn/statusRequest");
    await client.subscribe("air/tempHumOut/statusRequest");
    await client.subscribe("air/co2In/statusRequest");
    //console.log("subscribePromise: "+subscribePromise)

    //handle incoming messages
    client.on('message', async function(topic, message, packet){
		try{
			if(topic === "air/tempHumIn/statusRequest"){
				await client.publish("air/tempHumIn/tempHum", "{\"temperature\":"+state.temperatureIn+", \"humidity\":"+state.humidityIn+"}");
			} else if (topic === "air/tempHumOut/statusRequest"){
				await client.publish("air/tempHumOut/tempHum", "{\"temperature\":"+state.temperatureOut+", \"humidity\":"+state.humidityOut+"}");
			} else if (topic === "air/co2In/statusRequest"){
				await client.publish("air/co2In/co2", "{\"co2\":"+state.co2+"}");
			}
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
			} else if(currentStep.type === 3 || currentStep.type === 5){
	        	if(currentStep.errorIfMessage){
	        		endProgram("	UNEXPECTED MESSAGE ->         topic: "+ topic +", message: "+ message)
	        	} else {
	        		console.log("	received message ->           topic: "+ topic +", message: "+ message)
	        	}
	        } else {
	        	endProgram("	UNEXPECTED MESSAGE ->         topic: "+ topic +", message: "+ message)
	        }
	    } catch(err) {
            endProgram(err)
        }
    });

    await executeSequence(sequences.airTestsSequence)
    endProgram("-----   Successfully passed all tests. ------")
}

async function executeSequence(sequence){
    for(let index=0; index<sequence.length; index++){
    	//console.log("index "+index+" of "+sequence.length)
       	//console.log(JSON.stringify(sequence[index], null, 2))
       	//console.log("index: "+index+sequence[index])
       	currentStep = sequence[index]
       	if(sequence[index].type === 0){
       		console.log("//// "+sequence[index].comment+" ////")
       	} else if(sequence[index].type === 1){
		    try{
		    	if(sequence[index].timestampSecondsFromNow){
		    		var timestamp = new Date()
		    		timestamp.setSeconds(timestamp.getSeconds()+sequence[index].timestampSecondsFromNow)
		    		sequence[index].message = (sequence[index].message).replace("timestamp", timestamp.toISOString())
		    	}
		    	if(sequence[index].updateState){
		    		state = Object.assign(state, sequence[index].updateState) //shallow merge
		    		//console.log(state)
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
				if(sequence[index].timeout){
					var buffer = 1+Math.floor(0.00625*sequence[index].timeout) //gives 1+3 extra seconds at 480 seconds
					startTimer(sequence[index].timeout+buffer)
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
			await sleep(sequence[index].waitTime)
		} else if(sequence[index].type === 4) { //run sub-sequence
			console.log("	Starting sequence: " + sequence[index].sequenceName)
			await executeSequence(sequences[sequence[index].sequenceName])
		} else if(sequence[index].type === 5 && !skipUserInputs) { //await user input
			const answer = await askQuestion("	"+sequence[index].message);
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
	messageTimeoutTimer = new easyTimer()
    messageTimeoutTimer.start({countdown: true, startValues: {seconds: secondsDuration}})
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
		endProgram("Received message(s) too early.")
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
