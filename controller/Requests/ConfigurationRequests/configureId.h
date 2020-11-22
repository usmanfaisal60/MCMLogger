#define DEVICE_TOKEN "token"

void configureDeviceId()
{
    Serial.println("POST configureDevice");
    server.sendHeader("Access-Control-Allow-Origin", "*");
    if (server.hasArg(DEVICE_TOKEN))
    {
        String conf = "{ \"deviceToken\": \"" + server.arg(DEVICE_TOKEN) + "\" }";
        createFile("_conf/dev.conf", conf);
        server.send(200, "text/json", "{ \"success\": true}");
    }
    else
    {
        server.send(400, "text/json", "{ \"success\": false}");
    }
}