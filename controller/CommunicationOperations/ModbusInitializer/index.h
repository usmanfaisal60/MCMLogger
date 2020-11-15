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
    NotificationTrigger notificationAction[3];
};

ModbusTagObj mbTags[10];

#include "getModbusInfoFromSD.h"
#include "showAllTags.h"