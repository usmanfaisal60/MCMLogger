bool checkIpAddressChange(String ipAddress)
{
    int tmpIp[] = {getValue(ipAddress, '.', 0).toInt(),
                   getValue(ipAddress, '.', 1).toInt(),
                   getValue(ipAddress, '.', 2).toInt(),
                   getValue(ipAddress, '.', 3).toInt()};
    for (int i = 0; i < 4; i++)
    {
        if ((byte)tmpIp[i] != ipv4[i])
            return true;
    }
    return false;
}

void handlePingModbusTcpEvent(String payload)
{
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, getValue(payload, '=', 1));
    if (error)
        return;
    int startAddress = doc["startAddress"];
    int length = doc["length"];
    String slaveIP = doc["slaveIP"];
    ModbusResType resType = doc["resType"];
    int slaveUnitId = doc["slaveUnitId"];
    byte slavePort = doc["slavePort"];

    byte tmpIp[] = {(byte)getValue(slaveIP, '.', 0).toInt(),
                    (byte)getValue(slaveIP, '.', 1).toInt(),
                    (byte)getValue(slaveIP, '.', 2).toInt(),
                    (byte)getValue(slaveIP, '.', 3).toInt()};
    if (!checkIpAddressChange(slaveIP))
    {
        remotePort = slavePort ? slavePort : remotePort;
        startModbusTcp(tmpIp, remotePort);
    }
    remoteUnitId = slaveUnitId ? slaveUnitId : remoteUnitId;
    String response = env != MOCK ? updateFromModbusTcp(startAddress, length, resType, tmpIp)
                                  : mockUpdateFromModbusTcp(startAddress, length, resType, tmpIp);
    String str = "{\"type\": \"pingResponse\", \"data\": \"" + response + "\"}";
    int str_len = str.length() + 1;
    char char_array[str_len];
    str.toCharArray(char_array, str_len);
    ws.broadcastTXT(char_array, sizeof(char_array) - 1);
}
