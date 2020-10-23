void handlePing()
{
    server.sendHeader("Access-Control-Allow-Origin", "*");
    Serial.println("GET /ping");
    String response;
    const int capacity = JSON_OBJECT_SIZE(2);
    StaticJsonDocument<capacity> doc;
    doc["success"] = true;
    doc["name"] = "Wemos D1 Mini Controller";
    serializeJson(doc, response);
    server.send(200, "text/plain", response);
}