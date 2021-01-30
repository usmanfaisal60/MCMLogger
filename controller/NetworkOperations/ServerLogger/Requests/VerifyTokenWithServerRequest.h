#define VERIFIED_RESPONSE "VERIFIED"
AsyncHTTPRequest verifyTokenRequest;

void verifyToken_reqFailCB()
{
    isDeviceOnline = false;
}

void verifyToken_sendRequest()
{
    if (WiFi.status() != WL_CONNECTED)
    {
        verifyToken_reqFailCB();
        return;
    }
    if (verifyTokenRequest.readyState() == readyStateUnsent || verifyTokenRequest.readyState() == readyStateDone)
    {
        Serial.println("[SENDING TOKEN VERIFICATION REQUEST]");
        verifyTokenRequest.open("GET", verifyTokenEndPoint);
        String _token = "Bearer-device " + deviceToken;
        char token[_token.length()];
        _token.toCharArray(token, sizeof(token));
        verifyTokenRequest.setTimeout(TIMEOUT_REQUEST);
        verifyTokenRequest.setReqHeader("Authorization", token);
        verifyTokenRequest.send();
    }
    else
        verifyToken_reqFailCB();
}

void verifyToken_requestCB(void *optParm, AsyncHTTPRequest *request, int readyState)
{
    if (readyState == readyStateDone)
    {
        Serial.println(request->responseText());
        if (request->responseText() != VERIFIED_RESPONSE)
            verifyToken_reqFailCB();
        else
        {
            unsentHandler.syncUnsentData();
            isDeviceOnline = true;
        }
    }
}

void verifyToken_startAsyncClient()
{
    verifyTokenRequest.onReadyStateChange(verifyToken_requestCB);
    verifyTokenRequest.setDebug(false);
    verifyToken_sendRequest();
}