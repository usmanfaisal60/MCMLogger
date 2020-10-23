void handleGetNetworks()
{
    server.sendHeader("Access-Control-Allow-Origin", "*");
    Serial.println("GET /networks");
    int n = WiFi.scanNetworks();
    String response = "[\n";
    for (int i = 0; i < n; i++)
    {
        response += "{\"name\": \"" + WiFi.SSID(i) + "\", \"strength\" :" + WiFi.RSSI(i) + "}";
        if (i < n - 1)
            response += ",\n";
    }
    response += "\n]";
    server.send(200, "text/plain", response);
}