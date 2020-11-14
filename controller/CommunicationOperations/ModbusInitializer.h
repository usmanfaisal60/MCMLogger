String TEMP_JSON = "[{\"name\":\"Phase 1 current\",\"tagName\":\"Ia\",\"address\":\"40002\",\"dataType\":\"32BIT\",\"commChannel\":\"SERIAL\",\"notificationAction\":[{\"trigger\":\"GT\",\"value\":10}]},{\"name\":\"Phase 2 current\",\"tagName\":\"Ib\",\"address\":\"40004\",\"dataType\":\"32BIT\",\"commChannel\":\"SERIAL\",\"notificationAction\":[]},{\"name\":\"Phase 3 current\",\"tagName\":\"Ic\",\"address\":\"40006\",\"dataType\":\"32BIT\",\"commChannel\":\"SERIAL\",\"notificationAction\":[]},{\"name\":\"Phase 1 voltage\",\"tagName\":\"Ua\",\"address\":\"40012\",\"dataType\":\"32BIT\",\"commChannel\":\"SERIAL\",\"notificationAction\":[{\"trigger\":\"LT\",\"value\":380},{\"trigger\":\"GT\",\"value\":440}]},{\"name\":\"Phase 2 voltage\",\"tagName\":\"Ub\",\"address\":\"40014\",\"dataType\":\"32BIT\",\"commChannel\":\"SERIAL\",\"notificationAction\":[]},{\"name\":\"Phase 3 voltage\",\"tagName\":\"Uc\",\"address\":\"40016\",\"dataType\":\"32BIT\",\"commChannel\":\"SERIAL\",\"notificationAction\":[]}]";

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

void getModbusInfoFromSD()
{
    StaticJsonDocument<1500> doc;
    DeserializationError error = deserializeJson(doc, TEMP_JSON);
    if (error)
        return;
    int i = 0;
    while (i < 10)
    {
        String name = doc[i]["name"];
        String tagName = doc[i]["tagName"];
        if (tagName == "null")
            break;
        String _address = doc[i]["address"];
        int address = getValue(_address, '4', 1).toInt();
        String dataType = doc[i]["dataType"];
        String commChannel = doc[i]["commChannel"];
        // String trigger[3] = {doc[i]["notificationAction"][0]["trigger"],
        //                      doc[i]["notificationAction"][1]["trigger"],
        //                      doc[i]["notificationAction"][2]["trigger"]};
        // int value[3] = {doc[i]["notificationAction"][0]["value"],
        //                 doc[i]["notificationAction"][1]["value"],
        //                 doc[i]["notificationAction"][2]["value"]};

        Serial.println(String(doc[i]["notificationAction"][0]["trigger"]));
        Serial.println(String(doc[i]["notificationAction"][1]["trigger"]));
        Serial.println(String(doc[i]["notificationAction"][2]["trigger"]));
        Serial.println(String(doc[i]["notificationAction"][0]["value"]));
        Serial.println(String(doc[i]["notificationAction"][1]["value"]));
        Serial.println(String(doc[i]["notificationAction"][2]["value"]));
        // mbTags[i] = {name,
        //              tagName,
        //              address,
        //              dataType,
        //              commChannel,
        //              {{trigger[0], value[0]},
        //               {trigger[1], value[1]},
        //               {trigger[2], value[2]}}};
        // Serial.println("JBDJCBDSKCFJBSDKBCDKSB");
        i++;
    }
}

void showAllTags()
{
    int i = 0;
    while (i < 10)
    {
        Serial.print("index: ");
        Serial.print(i);
        Serial.print(", name: ");
        Serial.print(mbTags[i].name);
        Serial.print(", tagName: ");
        Serial.print(mbTags[i].tagName);
        Serial.print(", address: ");
        Serial.print(mbTags[i].address);
        Serial.print(", dataType: ");
        Serial.print(mbTags[i].dataType);
        Serial.print(", commChannel: ");
        Serial.print(mbTags[i].commChannel);
        Serial.print(", notifications: [");
        int j = 0;
        while (j < 3)
        {
            Serial.print("trigger: ");
            Serial.print(mbTags[i].notificationAction[j].trigger);
            Serial.print(", value: ");
            Serial.print(mbTags[i].notificationAction[j].value);
            j++;
        }
        Serial.println("]");
        i++;
    }
}