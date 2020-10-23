void handlePingModbus()
{
    server.sendHeader("Access-Control-Allow-Origin", "*");
    Serial.println("POST /PingModbus");
    if (server.hasArg("startAddress") && server.hasArg("length"))
    {
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