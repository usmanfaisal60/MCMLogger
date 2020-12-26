String UNSENT_DATA_DIRECTORY = "_unsent";

bool saveUnsentData(String filename, String content)
{
    if (!_SD)
    {
        Serial.println("SD CARD FAILURE");
        return false;
    }
    String _dir = UNSENT_DATA_DIRECTORY + "/" + filename;
    if (SD.exists(_dir))
        content = ",\n" + content;
    File _file = SD.open(_dir, FILE_WRITE);
    for (int i = 0; i < content.length(); i++)
    {
        _file.write(content.charAt(i));
    }
    _file.close();
}

int getUnsentFileCount()
{
    int count = 0;
    File dir = SD.open(UNSENT_DATA_DIRECTORY);
    while (true)
    {
        File entry = dir.openNextFile();
        if (!entry)
            break;
        count++;
    }
    Serial.print("[FILE COUNT]: ");
    Serial.println(count);
    return count;
}