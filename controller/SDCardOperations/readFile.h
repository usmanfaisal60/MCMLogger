#define NOTFOUND "NOT_FOUND"
#define FILE_ERROR "FILE_ERROR"

String readFile(String filename)
{
    if (!_SD)
    {
        return "";
    }
    if (!SD.exists(filename))
    {
        Serial.println("FILE NOT FOUND: " + filename);
        return NOTFOUND;
    }
    File _filename = SD.open(filename, FILE_READ);
    if (!_filename)
    {
        return FILE_ERROR;
    }
    String toReturn = "";
    while (_filename.available())
    {
        toReturn += (char)_filename.read();
    }
    _filename.close();
    return toReturn;
}