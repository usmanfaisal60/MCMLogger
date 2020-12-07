void getAllTags()
{
    Serial.println("GET /getAllTags");
    server.sendHeader("Access-Control-Allow-Origin", "*");
    String mbConf = readFile(MODBUS_CONFIG_FILE);
    if (mbConf == NOTFOUND)
    server.send(404, "text/json", "{\"success\": false}");
    else
    server.send(200, "text/json", mbConf);
}