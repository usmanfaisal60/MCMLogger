void handlePingModbus()
{
    server.sendHeader("Access-Control-Allow-Origin", "*");
    Serial.println("POST /PingModbus");
    if (server.hasArg("startAddress") && server.hasArg("length"))
    {
        if (server.hasArg("slaveId"))
        {
            if (server.arg("slaveId").toInt() != S_ID)
            {
                S_ID = server.arg("slaveId").toInt();
                startModbusSerialCommunication();
                Serial.println("SLAVE ID CHANGED");
            }
        }
        if (server.hasArg("baudRate"))
        {
            String str = server.arg("baudRate");
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
        }

        ModbusResType resType = server.hasArg("resType") ? ModbusResType(server.arg("resType").toInt()) : DOUBLE_WORD;
        String response = env != MOCK ? updateFromModbus(server.arg("startAddress").toInt(), server.arg("length").toInt(), resType)
                                      : mockUpdateFromModbus(server.arg("startAddress").toInt(), server.arg("length").toInt(), resType);
        server.send(200, "text/plain", response);
    }
    else
    {
        server.send(400, "text/plain", "Bad request");
    }
}
