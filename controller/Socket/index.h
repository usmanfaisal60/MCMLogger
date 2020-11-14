#include "handlePingModbusSerialEvent.h"
#include "handlePingModbusTcpEvent.h"

void webSocketEventsHandler(uint8_t num, WStype_t type, uint8_t *payload, size_t length)
{
    if (type == WStype_TEXT)
    {
        String _payload = "";
        for (int i = 0; i < length; i++)
        {
            _payload += (char)payload[i];
        }
        if (_payload.indexOf("/pingModbusSerial") != -1)
            handlePingModbusSerialEvent(_payload);
        if (_payload.indexOf("/pingModbusTcp") != -1)
            handlePingModbusTcpEvent(_payload);
    }
}