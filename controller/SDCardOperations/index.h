bool _SD = false;
bool beginSDCard()
{
    if (!SD.begin(10))
    {
        Serial.println("SD CARD INITIALIZATION FAILED");
        _SD = false;
        return false;
    }
    Serial.println("SD CARD INITIALIZATION SUCCESSFULL");
    _SD = true;
    return true;
}

#include "readModbusJSON.h"