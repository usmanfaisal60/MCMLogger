#define maxCountPerFile 200

class UnsentHandler
{
private:
    int fileCount = 0;
    int currentFileEntryCount = 0;

public:
    UnsentHandler() {}
    void handleUnsentRequest(String unsentBody)
    {
        if (saveUnsentData(String(fileCount) + ".json", unsentBody))
            this->currentFileEntryCount += collectionSize;
        if (this->currentFileEntryCount > maxCountPerFile)
        {
            this->currentFileEntryCount = 0;
            fileCount++;
        }
        Serial.println("[SD CARD WRITTEN]");
    }

    void syncUnsentData()
    {
        Serial.println('[SYNCING UNSENT DATA]');
        WiFiClient client;
        const int httpPort = 3000;
        if (!client.connect(SERVER_NAME, httpPort))
        {
            Serial.println("connection failed");
            return;
        }
        client.println("POST /api/v1/device/sync-unsent-data HTTP/1.1");
        client.println("Host: " + SERVER_NAME);
        client.println("Authorization: Bearer-device " + deviceToken);
        client.println("Accept: */*");
        client.println("Content-Type: application/json");
        client.println();
        for (int i = 0; i < this->fileCount; i++)
            client.print(readFile(UNSENT_DATA_DIRECTORY + "/" + i + ".json"));
    }

    void setupUnsentHandler()
    {
        this->fileCount = getUnsentFileCount();
    }
};

UnsentHandler unsentHandler = UnsentHandler();