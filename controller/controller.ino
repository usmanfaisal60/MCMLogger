#include "Config/index.h"                                    // This file contains code for development environment. After this, an env variable is available globally
#include "Helpers/index.h"                                   // This code is just helper methods available to all the code
#include "SDCardOperations/index.h"                          // SD card operations
#include "CommunicationOperations/ModbusCom.h"               // Modbus serial communication operations
#include "CommunicationOperations/ModbusInitializer/index.h" // Modbus initialization operations
#include "CommunicationOperations/ModbusTcpCom.h"            // Modbus tcp communication operations
#include "NetworkOperations/Connection.h"                    // In this file, a connection instance is immidiately instantiated with name conn and is available to be used in the rest of the program
#include "NetworkOperations/ESPServer.h"                     // In this file, a local server is setup and is run to the local network
#include "NetworkOperations/ServerLogger/index.h"            // In this file, a server logger is instantiated which logs data to server

void setup()
{
  startSerial();
  beginSDCard();
  conn.setupConnection();
  localServer.setupServer();
  getModbusInfoFromSD();
  getGeneralModbusSettingsFromSD();
  startModbusSerialCommunication();
  logger.checkDeviceReady();
}

void loop()
{
  localServer.listenServer();
  logger.loop();
}
