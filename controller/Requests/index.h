WebSocketsServer ws = WebSocketsServer(81);
void (*resetFunc)(void) = 0;
ESP8266WebServer server(80);
#define MISSING_ARGS "MISSING_ARGS"
#define CONNECTED "CONNECTED"
#define REFUSED "REFUSED"
#define baseServerUrl "http://192.168.8.102:3000/api/v1"

#include "ConnectionRequests/handlePing.h"
#include "ConnectionRequests/handleGetNetworks.h"
#include "ConnectionRequests/handleConnection.h"
#include "ConnectionRequests/handleReset.h"
#include "ConnectionRequests/handleCheckLastAttempt.h"
#include "ConnectionRequests/handleNotFound.h"
#include "ModbusRequests/handlePingModbus.h"
#include "ConfigurationRequests/configureId.h"
#include "ConfigurationRequests/getAllTags.h"
#include "ConfigurationRequests/setAllTags.h"