#define AllTagsArg "allTags"

void setAllTags()
{
    Serial.println("POST /setAllTags");
    server.sendHeader("Access-Control-Allow-Origin", "*");
    if (server.hasArg(AllTagsArg))
    {
        createFile("_conf/mb.conf", server.arg(AllTagsArg));
        server.send(200, "text/json", "{\"success\": true}");
    }
    else
    {
        server.send(400, "text/json", "{\"success\": false}");
    }
}