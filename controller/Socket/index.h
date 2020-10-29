#include "./handlePingModbusEvent.h"

void webSocketEventsHandler(uint8_t num, WStype_t type, uint8_t *payload, size_t length)
{
    if (type == WStype_TEXT)
    {
        String _payload = "";
        for (int i = 0; i < length; i++)
        {
            _payload += (char)payload[i];
        }
        if (_payload.indexOf("/pingModbus") != -1)
            handlePingModbusEvent(_payload);
        }
}