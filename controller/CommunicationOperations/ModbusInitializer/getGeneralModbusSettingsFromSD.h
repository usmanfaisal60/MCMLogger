void getGeneralModbusSettingsFromSD()
{
  StaticJsonDocument<400> doc;
  Serial.println(readFile(GENERAL_MB_FILE));
  DeserializationError error = deserializeJson(doc, readFile(GENERAL_MB_FILE));
  if (error)
  {
    Serial.println("ERROR OCCURRED DURING READING FROM JSON FILE");
    return;
  }
  int address = doc["address"];
  S_ID = address;
  unsigned long newBaud = doc["baud"];
  if (BAUD_RATE != newBaud)
  {
    Serial.println("SERIAL RATE CHANGED TO " + String(BAUD_RATE));
    BAUD_RATE = newBaud;
    startSerial();
  }
}
