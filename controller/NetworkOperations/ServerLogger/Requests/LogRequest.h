AsyncHTTPRequest logRequest;
String _reqBody = "";

void logger_reqFailCB()
{
    unsentHandler.handleUnsentRequest(_reqBody);
    _reqBody = "";
}

void logger_requestCB(void *optParm, AsyncHTTPRequest *request, int readyState)
{
    Serial.print("[REQUEST STATUS]: ");
    Serial.println(readyState);

    if (readyState == readyStateDone)
    {
        Serial.println(request->responseText());
        StaticJsonDocument<400> doc;
        DeserializationError error = deserializeJson(doc, request->responseText());
        if (error)
        {
            Serial.println("[RESPONSE DESERIALIZATION FAILED]");
            logger_reqFailCB();
            return;
        }
        bool success = doc["success"];
        String time = doc["time"];
        createFile(DEVICE_STATS_FILE, "{ \"lastOnlineTime\": " + time + "}");
    }
}

void logger_sendRequest(String reqBody)
{
    _reqBody = reqBody;
    if (WiFi.status() != WL_CONNECTED)
    {
        logger_reqFailCB();
        return;
    }
    if (!isDeviceOnline)
    {
        verifyToken_sendRequest();
        logger_reqFailCB();
        return;
    }
    if (logRequest.readyState() == readyStateUnsent || logRequest.readyState() == readyStateDone)
    {
        Serial.println("[SENDING LOGGING REQUEST]");
        logRequest.open("POST", loggerEndPoint);
        String _token = "Bearer-device " + deviceToken;
        char token[_token.length()];
        _token.toCharArray(token, sizeof(token));
        logRequest.setTimeout(TIMEOUT_REQUEST);
        logRequest.setReqHeader("Authorization", token);
        logRequest.send(reqBody);
    }
    else
        logger_reqFailCB();
}

void logger_startAsyncClient()
{
    
    logRequest.onReadyStateChange(logger_requestCB);
    logRequest.setDebug(false);
}