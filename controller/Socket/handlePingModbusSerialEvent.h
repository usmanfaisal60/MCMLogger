void handlePingModbusSerialEvent(String payload)
{
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, getValue(payload, '=', 1));
    if (error)
        return;

    int startAddress = doc["startAddress"];
    int length = doc["length"];
    int slaveId = doc["slaveId"];
    ModbusResType resType = doc["resType"];
    long baudRate = doc["baudRate"];

    if (slaveId != S_ID)
    {
        S_ID = slaveId;
        startModbusSerialCommunication();
        Serial.println("SLAVE ID CHANGED");
    }
    if (baudRate != 0 && BAUD_RATE != baudRate)
    {
        BAUD_RATE = baudRate;
        startSerial();
        startModbusSerialCommunication();
        Serial.println("SERIAL RATE CHANGED TO " + String(BAUD_RATE));
    }
    String response = env != MOCK ? updateFromModbus(startAddress, length, resType)
                                  : mockUpdateFromModbus(startAddress, length, resType);
    String str = "{\"type\": \"pingResponse\", \"data\": \"" + response + "\"}";
    int str_len = str.length() + 1;
    char char_array[str_len];
    str.toCharArray(char_array, str_len);
    ws.broadcastTXT(char_array, sizeof(char_array) - 1);
}
