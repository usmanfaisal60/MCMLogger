#define SSID_CONN "ssid"
#define PASS_CONN "password"

void handleConnection()
{
    server.sendHeader("Access-Control-Allow-Origin", "*");
    Serial.println("POST /connection");
    if (server.hasArg(SSID_CONN) && server.hasArg(PASS_CONN))
    {
        String response;
        const int capacity = JSON_OBJECT_SIZE(2);
        StaticJsonDocument<capacity> doc;
        if (conn.connectToAnyServer(server.arg(SSID_CONN), server.arg(PASS_CONN)))
        {
            Serial.println("Can connect to this network");
            conn.setLastConnectionAttempt(true);
            conn.disconnect();
            conn.saveNetwork(server.arg(SSID_CONN), server.arg(PASS_CONN));
            conn.setupConnection();
        }
        else
        {
            conn.disconnect();
            conn.connectToSavedServer();
            conn.setLastConnectionAttempt(false);
            doc["success"] = false;
            doc["status"] = REFUSED;
            serializeJson(doc, response);
            server.send(400, "text/plain", response);
        }
        doc["success"] = true;
        doc["status"] = CONNECTED;
        serializeJson(doc, response);
        server.send(200, "text/plain", response);
    }
    else
    {
        String response;
        const int capacity = JSON_OBJECT_SIZE(2);
        StaticJsonDocument<capacity> doc;
        doc["success"] = false;
        doc["message"] = MISSING_ARGS;
        serializeJson(doc, response);
        server.send(400, "text/plain", response);
    }
}
