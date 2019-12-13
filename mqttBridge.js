const MQTT = require("async-mqtt")

var numberOfMessages = 0

main().catch((err) => { console.error(err) })
 
async function main() {
    //connect
    console.log("connecting...")
    remoteClient = await MQTT.connectAsync("mqtt://192.168.1.19:1883",{clientId:"bridgeEntrance"})
    localClient = await MQTT.connectAsync("mqtt://localhost:1883",{clientId:"bridgeExit"})
    console.log("remoteClient.connected = "+remoteClient.connected+" localClient.connected = "+localClient.connected)

    //handle errors
    remoteClient.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)});
    localClient.on("error",function(error){
        console.log("Can't connect" + error);
        process.exit(1)});

    //subscribe
    var subscribePromise = await remoteClient.subscribe("water_monitor/flow_meter")
    //console.log("subscribePromise: "+subscribePromise)

    //handle message
    remoteClient.on('message', async function(topic, message){
    	numberOfMessages++
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write("number of messages: "+numberOfMessages+ " message: "+message.toString())
        try{
            var publishPromise = await localClient.publish(topic, message);
        } catch(err) {
            console.error(err)
        }
    });

}