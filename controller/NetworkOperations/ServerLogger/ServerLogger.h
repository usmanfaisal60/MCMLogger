class ServerLogger
{
private:
    bool requestTriggered = false;
    unsigned long lastReqTime;
    unsigned long lastCollectionTime;
    int range[2];
    String sendToServerString = "";
    String _modbusResString = "";

public:
    ServerLogger(){};
    void collectModbusData()
    {
        String mbData = collectDataFromModbus(this->range[0], this->range[1] - this->range[0]);
        if (mbData == "")
            return;
        this->sendToServerString += (this->sendToServerString != "" ? ", \n" : "") + mbData;
    }
    void logDataToServer()
    {
        if (this->sendToServerString != "")
        {
            // logger_sendRequest(this->sendToServerString);
        }
        this->sendToServerString = "";
    }

    void checkDeviceReady()
    {
        // unsentHandler.setupUnsentHandler();
        defineRange(this->range);
        // if (this->range[0] == 9999 || !conn.checkWifiStatus() || readFile(WIFI_CONFIG_FILE) == NOTFOUND || readFile(DEVICE_TOKEN_FILE) == NOTFOUND || readFile(DEVICE_TOKEN_FILE) == NOTFOUND)
        if (this->range[0] == 9999 || readFile(WIFI_CONFIG_FILE) == NOTFOUND || readFile(DEVICE_TOKEN_FILE) == NOTFOUND || readFile(DEVICE_TOKEN_FILE) == NOTFOUND)
            return;
        if (S_ID < 0)
            return;
        isDeviceReadyToOperate = true;
        this->lastReqTime = millis();
        this->lastCollectionTime = millis();
        this->getDeviceToken();
        // verifyToken_startAsyncClient();
        // logger_startAsyncClient();
    }

    void getDeviceToken()
    {
        StaticJsonDocument<1000> doc;
        DeserializationError error = deserializeJson(doc, readFile(DEVICE_TOKEN_FILE));
        if (error)
            Serial.println("[TOKEN JSON DESERIALIZE FAILED]");
        String _deviceToken = doc["deviceToken"];
        deviceToken = _deviceToken;
    }

    void loop()
    {
        // if (isDeviceReadyToOperate)
        // {
        if (millis() > this->lastCollectionTime + 1000)
        {
            this->lastCollectionTime = millis();
            this->collectModbusData();
        }
        if (millis() > this->lastReqTime + (1000 * collectionSize))
        {
            this->lastReqTime = millis();
            // this->logDataToServer();
            logger_logDataToserver("HEY THIS IS A BODY");
        }
        // }
    }
};

ServerLogger logger = ServerLogger();