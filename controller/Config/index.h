#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ModbusMaster.h>
#include <FloatTwiddler.h>
#include <ModbusIP_ESP8266.h>
#include <ESP8266WebServer.h>
#include <WebSocketsServer.h>
#include <SPI.h>
#include <SD.h>

enum Env
{
    TESTING,
    MOCK,
    DEVELOPMENT,
    PRODUCTION
};

enum ModbusResType
{
    SIGNED_INT,
    DOUBLE_WORD
};

const Env env = TESTING;

long BAUD_RATE = 9600;

void startSerial()
{
    Serial.end();
    while (Serial)
    {
    }
    Serial.begin(BAUD_RATE);
    while (!Serial)
    {
    }
}