class ServerLogger
{
private:
    bool requestTriggered = false;
    unsigned long lastReqTime = 0;
    unsigned long lastCollectionTime = 0;
    byte collectionSize = 20;
    int range[2];
    String modbusResString = "";
    String _modbusResString = "";

public:
    ServerLogger(){};
    void collectModbusData()
    {
        collectDataFromModbus(this->range[0], this->range[1] - this->range[0]);
    }
    void logDataToServer()
    {
        Serial.println("LOGGING DATA TO SERVER");
    }

    void checkDeviceReady()
    {
        defineRange(this->range);
        if (this->range[0] == 9999 || !conn.checkWifiStatus() || readFile(WIFI_CONFIG_FILE) == NOTFOUND || readFile(DEVICE_TOKEN_FILE) == NOTFOUND || readFile(DEVICE_TOKEN_FILE) == NOTFOUND)
            return;
        isDeviceReadyToOperate = true;
    }

    void loop()
    {
        if (isDeviceReadyToOperate)
        {
            if (millis() > this->lastCollectionTime + 1000)
            {
                this->lastCollectionTime = millis();
                this->collectModbusData();
            }
            if (millis() > this->lastReqTime + (1000 * this->collectionSize))
            {
                this->lastReqTime = millis();
                this->logDataToServer();
            }
        }
    }
};

ServerLogger logger = ServerLogger();