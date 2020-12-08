#define DATATYPE_16BIT "16BIT"
#define DATATYPE_32BIT "32BIT"

String collectDataFromModbus(int startAddress, int len)
{
    Serial.println("READING FROM " + String(startAddress) + " TO LENGTH " + String(len));
    String toReturn = "";
    delay(20);
    uint8_t result = meter.readHoldingRegisters(startAddress, len + 5);
    if (result == meter.ku8MBSuccess)
    {
        toReturn += "{";
        for (int i = 0; i < 30; i++)
        {
            if (mbTags[i].tagName == "")
                break;
            if (mbTags[i].dataType == DATATYPE_32BIT)
            {
                float temp;
                UintToFloat(meter.getResponseBuffer(mbTags[i].address - startAddress), meter.getResponseBuffer(mbTags[i].address - startAddress + 1), &temp);
                toReturn += "\"" + mbTags[i].tagName + "\": " + String(temp) + ",";
            }
            else
                toReturn += "\"" + mbTags[i].tagName + "\": " + meter.getResponseBuffer(mbTags[i].address - startAddress) + ",";
        }
        toReturn = toReturn.substring(0, toReturn.length() - 1);
        toReturn += "}";
    }
    meter.clearResponseBuffer();
    delay(20);
    return toReturn;
}
