byte ipv4[] = {192, 168, 43, 62};
int remotePort = 502;
byte remoteUnitId = 1;
ModbusIP mb;
int delayInterval = 25;

bool startModbusTcp(byte ipArr[], int port)
{
    IPAddress remoteIp(ipArr[0], ipArr[1], ipArr[2], ipArr[3]);
    Serial.println(remoteIp.toString());
    mb.connect(remoteIp, port);
    byte ctr = 0;
    while (!mb.isConnected(remoteIp))
    {
        Serial.print(".");
        ctr++;
        delay(25);
        if (ctr > 50)
            return false;
    }
    return true;
}

String updateFromModbusTcp(int startAddress, int length, ModbusResType resType = SIGNED_INT, byte ipArr[] = ipv4)
{
    IPAddress remoteIp(ipArr[0], ipArr[1], ipArr[2], ipArr[3]);
    if (!mb.isConnected(remoteIp))
    {
        bool conn = startModbusTcp(ipArr, remotePort);
        if (!conn)
            return "Connection to remote unit failed";
    }
    uint16_t res[length];
    for (int i = 0; i < length; i++)
        res[i] = 0;
    for (int i = 0; i < length; i++)
    {
        mb.readHreg(remoteIp, i + startAddress, &res[i], 1, nullptr, remoteUnitId);
        mb.task();
    }
    delay(500);
    String toReturn = "";
    for (int i = 0; i < length; i++)
    {
        if (resType == DOUBLE_WORD)
        {
            float temp;
            UintToFloat(res[i], res[i + 1], &temp);
            toReturn += "[" + String(startAddress + i) + "]  " + String(temp) + ":br:";
            i++;
        }
        if (resType == SIGNED_INT)
        {
            toReturn += "[" + String(startAddress + i) + "]  " + String(res[i]) + ":br:";
        }
    }
    return toReturn;
}

String mockUpdateFromModbusTcp(int startAddress, int len, ModbusResType resType = SIGNED_INT, byte ipArr[] = ipv4)
{
    String toReturn = "";
    switch (resType)
    {
    case SIGNED_INT:
        for (int i = startAddress; i < len; i++)
        {
            int temp = random(420);
            toReturn += "[" + String(i) + "]  " + String(temp) + ":br:";
        }
        break;
    case DOUBLE_WORD:
        for (int i = startAddress; i < len; i++)
        {
            float temp;
            UintToFloat(random(32767), random(32767), &temp);
            toReturn += "[" + String(i) + "]  " + String(temp) + ":br:";
            i++;
        }
        break;
    default:
        break;
    }
    delay(100);
    return toReturn;
}
