void getModbusInfoFromSD()
{
    StaticJsonDocument<1500> doc;
    DeserializationError error = deserializeJson(doc, readFile(".conf"));
    if (error)
    {
        Serial.println("ERROR OCCURRED DURING READING FROM JSON FILE");
        return;
    }
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
        NotificationTrigger notificationAction[3] = {{"", 0},
                                                     {"", 0},
                                                     {"", 0}};
        int j = 0;
        while (j < 3)
        {
            String _notObj = doc[i]["notificationAction"][j];
            if (_notObj == "[]" || _notObj == "null")
                break;
            String _trigger = doc[i]["notificationAction"][j]["trigger"];
            if (_trigger == "null")
                break;
            int _value = doc[i]["notificationAction"][j]["value"];
            notificationAction[j].trigger = _trigger;
            notificationAction[j].value = _value;
            j++;
        }
        mbTags[i] = {name,
                     tagName,
                     address,
                     dataType,
                     commChannel,
                     {notificationAction[0],
                      notificationAction[1],
                      notificationAction[2]}};
        i++;
    }
}
