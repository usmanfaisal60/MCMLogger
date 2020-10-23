#include "../Requests/index.h"

class ESPServer
{
private:
public:
  ESPServer() {}

  void setupServer()
  {
    Serial.println("SETTING UP LOCAL SERVER");
    server.on("/ping", HTTP_GET, handlePing);
    server.on("/networks", HTTP_GET, handleGetNetworks);
    server.on("/connect", HTTP_POST, handleConnection);
    server.on("/reset", HTTP_POST, handleReset);
    server.on("/checkLastAttempt", HTTP_GET, handleCheckLastAttempt);
    server.on("/pingModbus", HTTP_POST, handlePingModbus);
    server.onNotFound(handleNotFound);
    server.begin();
  }

  void listenServer()
  {
    server.handleClient();
  }
};

ESPServer localServer = ESPServer();
