void showAllTags()
{
    int i = 0;
    while (i < 10)
    {
        Serial.print("\nindex: ");
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
            Serial.print(", ");
            j++;
        }
        Serial.println("]");
        i++;
    }
}