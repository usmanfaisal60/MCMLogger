#define GENERALCONFPARAM_ADDRESS "address"
#define GENERALCONFPARAM_BAUD "baud"

void configureMBGeneral()
{
    Serial.println("POST configureMBGeneral");
    server.sendHeader("Access-Control-Allow-Origin", "*");
    if (server.hasArg(GENERALCONFPARAM_ADDRESS) && server.hasArg(GENERALCONFPARAM_BAUD))
    {
        String str = server.arg(GENERALCONFPARAM_BAUD);
        int str_len = str.length() + 1;
        char char_array[str_len];
        str.toCharArray(char_array, str_len);
        long newBaud = atol(char_array);
        if (BAUD_RATE != newBaud)
        {
            Serial.println("SERIAL RATE CHANGED TO " + String(BAUD_RATE));
            BAUD_RATE = newBaud;
            startSerial();
            startModbusSerialCommunication();
        }
        S_ID = server.arg(GENERALCONFPARAM_ADDRESS).toInt();
        String generalConfig = "{ \"baud\": " + String(BAUD_RATE) + ", \"address\":" + String(S_ID) + " }";
        Serial.println(generalConfig);
        createFile(GENERAL_MB_FILE, generalConfig);
        server.send(200, "text/json", "{ \"success\": true }");
        startSerial();
    }
    else
    {
        server.send(400, "text/json", "{ \"success\": false }");
    }
}