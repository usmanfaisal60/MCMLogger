struct NotificationTrigger
{
    String trigger;
    int value;
};

struct ModbusTagObj
{
    String name;
    String tagName;
    int address;
    String dataType;
    String commChannel;
    unsigned long lastTriggerred;
    NotificationTrigger notificationAction[3];
};

ModbusTagObj mbTags[30];

#include "getModbusInfoFromSD.h"
#include "getGeneralModbusSettingsFromSD.h"
#include "showAllTags.h"