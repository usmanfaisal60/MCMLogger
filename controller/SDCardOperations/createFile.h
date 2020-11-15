bool createFile(String filename, String content)
{
    if (!_SD)
    {
        Serial.println("SD CARD FAILURE");
        return false;
    }
    if (SD.exists(filename))
        SD.remove(filename);
    File _file = SD.open(filename, FILE_WRITE);
    for (int i = 0; i < content.length(); i++)
    {
        _file.write(content.charAt(i));
    }
    _file.close();
}