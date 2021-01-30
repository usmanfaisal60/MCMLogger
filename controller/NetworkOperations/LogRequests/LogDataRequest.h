// AsyncHTTPRequest request;
#include <ESPAsyncTCP.h>

#define SERVER_HOST_NAME "161.35.28.53"
#define TCP_PORT 3500

static void replyToServer(void* arg) {
	AsyncClient* client = reinterpret_cast<AsyncClient*>(arg);

	// send reply
	if (client->space() > 32 && client->canSend()) {
		char message[32];
		sprintf(message, "this is from %s", WiFi.localIP().toString().c_str());
		client->add(message, strlen(message));
		client->send();
	}
}

static void handleData(void *arg, AsyncClient *client, void *data, size_t len)
{
    Serial.printf("\n data received from %s \n", client->remoteIP().toString().c_str());
    Serial.write((uint8_t *)data, len);
}

void onConnect(void *arg, AsyncClient *client)
{
    Serial.printf("\n client has been connected to %s on port %d \n", SERVER_HOST_NAME, TCP_PORT);
    replyToServer(client);
}

void logger_logDataToserver(String body)
{
    AsyncClient *client = new AsyncClient;
    client->onData(&handleData, client);
    client->onConnect(&onConnect, client);
    client->connect(SERVER_HOST_NAME, TCP_PORT);

    // request.setDebug(false);
    // request.onReadyStateChange([](void *optParm, AsyncHTTPRequest *request, int readyState) {
    //     Serial.println('[REQUEST STATE CHANGE CALLBACK]');
    //     if (readyState == readyStateDone)
    //     {
    //         Serial.println("\n**************************************");
    //         Serial.println(request->responseText());
    //         Serial.println("**************************************");
    //         request->setDebug(false);
    //     }
    // });

    // Serial.println("[BODY TO BE SENT]: " + body);
    // request.open("GET", "http://161.35.28.53/");
    // request.send();
}