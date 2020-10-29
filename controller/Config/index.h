enum Env
{
    TESTING,
    MOCK,
    DEVELOPMENT,
    PRODUCTION
};

enum ModbusResType
{
    SIGNED_INT,
    DOUBLE_WORD
};

const Env env = MOCK;

long BAUD_RATE = 9600;

void startSerial()
{
    Serial.end();
    while (Serial)
    {
    }
    Serial.begin(BAUD_RATE);
    while (!Serial)
    {
    }
}

String getValue(String data, char separator, int index)
{
    int found = 0;
    int strIndex[] = {0, -1};
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++)
    {
        if (data.charAt(i) == separator || i == maxIndex)
        {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i + 1 : i;
        }
    }

    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}
