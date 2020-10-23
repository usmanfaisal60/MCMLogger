void handleCheckLastAttempt()
{
    server.sendHeader("Access-Control-Allow-Origin", "*");
    Serial.println("GET /checkLastAttempt");
    String response;
    const int capacity = JSON_OBJECT_SIZE(1);
    StaticJsonDocument<capacity> doc;
    doc["success"] = conn.getLastConnectionAttempt();
    serializeJson(doc, response);
    server.send(200, "text/plain", response);
    conn.setLastConnectionAttempt(false);
}