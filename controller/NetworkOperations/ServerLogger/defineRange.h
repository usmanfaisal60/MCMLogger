void defineRange(int *range)
{
    range[0] = 9999;
    range[1] = 0;
    for (int i = 0; i < 30; i++)
    {
        if (mbTags[i].tagName == "")
            break;
        if (mbTags[i].address < range[0])
            range[0] = mbTags[i].address;
        if (mbTags[i].address > range[1])
            range[1] = mbTags[i].address;
    }
}