#define AllTagsArg "allTags"

void setAllTags()
{
    Serial.println("POST /setAllTags");
    server.sendHeader("Access-Control-Allow-Origin", "*");
    if (server.hasArg(AllTagsArg))
    {
        createFile(MODBUS_CONFIG_FILE, server.arg(AllTagsArg));
        server.send(200, "text/json", "{\"success\": true}");
        getModbusInfoFromSD();
    }
    else
    {
        server.send(400, "text/json", "{\"success\": false}");
    }
}