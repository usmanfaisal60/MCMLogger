String SERVER_NAME = "192.168.8.103:3000";
const char *loggerEndPoint = "http://192.168.8.103:3000/api/v1/device/log-data";
const char *verifyTokenEndPoint = "http://192.168.8.103:3000/api/v1/device/verify-token";
#define TIMEOUT_REQUEST 8000
bool isDeviceOnline = false;
String deviceToken = "";

#include "UnsentHandler/index.h"
#include "VerifyTokenWithServerRequest.h"
#include "LogRequest.h"