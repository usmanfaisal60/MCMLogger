#include <ArduinoJson.h>
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>

WebSocketsServer ws = WebSocketsServer(81);
void (*resetFunc)(void) = 0;
ESP8266WebServer server(80);
#define MISSING_ARGS "MISSING_ARGS"
#define CONNECTED "CONNECTED"
#define REFUSED "REFUSED"

#include "ConnectionRequests/handlePing.h"
#include "ConnectionRequests/handleGetNetworks.h"
#include "ConnectionRequests/handleConnection.h"
#include "ConnectionRequests/handleReset.h"
#include "ConnectionRequests/handleCheckLastAttempt.h"
#include "ConnectionRequests/handleNotFound.h"
#include "ModbusRequests/handlePingModbus.h"
