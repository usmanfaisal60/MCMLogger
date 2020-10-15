#include "Connection.h"
Conn conn = Conn();
#include "ESPServer.h"
ESPServer localServer = ESPServer();

void setup() {
  conn.setupConnection();
  localServer.setupServer();
}

void loop() {
  localServer.listenServer();
}