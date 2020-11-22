void getAllTags()
{
    Serial.println("GET /getAllTags");
    server.sendHeader("Access-Control-Allow-Origin", "*");
    String mbConf = readFile("_conf/mb.conf");
    if (mbConf == NOTFOUND)
    server.send(404, "text/json", "{\"success\": false}");
    else
    server.send(200, "text/json", mbConf);
}