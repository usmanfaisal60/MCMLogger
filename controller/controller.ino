#include "Config/index.h"                      // This file contains code for development environment. After this, an env variable is available globally
#include "CommunicationOperations/ModbusCom.h" // This file consists of serial communication operations
#include "NetworkOperations/Connection.h"      // In this file, a connection instance is immidiately instantiated with name conn and is available to be used in the rest of the program
#include "NetworkOperations/ESPServer.h"       //  In this file, a connection instance is immidiately instantiated with name localServer and is available to be used in the rest of the program

#define BAUD_RATE 9600

void setup()
{
  Serial.begin(BAUD_RATE);
  Serial.println("READY");
  conn.setupConnection();
  localServer.setupServer();
  delay(1000);
  Serial.println("STARTING MODBUS");
  startModbus();
}

void loop()
{
  localServer.listenServer();
}
