#define WIFI_CONFIG_FILE "_conf/wifi.conf"
#define MODBUS_CONFIG_FILE "_conf/mb.conf"
#define DEVICE_TOKEN_FILE "_conf/dev.conf"
#define GENERAL_MB_FILE "_conf/g_mb.conf"
#define DEVICE_STATS_FILE "_dev/stat.json"

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

#include "readFile.h"
#include "createFile.h"
#include "unsentData.h"