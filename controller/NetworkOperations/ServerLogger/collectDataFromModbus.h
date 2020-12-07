String collectDataFromModbus(int startAddress, int len)
{
    String toReturn = "";
    delay(50);
    uint8_t result = meter.readHoldingRegisters(startAddress, len);
    if (result == meter.ku8MBSuccess)
    {
    }
    meter.clearResponseBuffer();
    delay(50);
    return toReturn;
}
