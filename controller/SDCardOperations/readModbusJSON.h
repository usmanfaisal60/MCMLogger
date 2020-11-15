#define conf ".conf"
#define NOCONF "CONF_NOT_FOUND"
#define FILE_ERROR "FILE_ERROR"

String readModbusJSON()
{
    if (!_SD)
    {
        return "";
    }
    if (!SD.exists(conf))
    {
        Serial.println("CONFIG FILE NOT FOUND");
        return NOCONF;
    }
    File _conf = SD.open(conf, FILE_READ);
    if (!_conf)
    {
        return FILE_ERROR;
    }
    String toReturn = "";
    while (_conf.available())
    {
        toReturn += (char)_conf.read();
    }
    _conf.close();
    return toReturn;
}