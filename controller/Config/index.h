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

const Env env = DEVELOPMENT;

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
