void handleReset()
{
    server.sendHeader("Access-Control-Allow-Origin", "*");
    Serial.println("POST /reset");
    server.send(200, "text/plain", "{\"success\": true}");
    delay(1000);
    resetFunc();
}
