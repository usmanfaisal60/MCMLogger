#include <ArduinoJson.h>
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#define MISSING_ARGS "MISSING_ARGS"
#define CONNECTED "CONNECTED"
#define REFUSED "REFUSED"
void (*resetFunc)(void) = 0;
ESP8266WebServer server(80);

void handlePing()
{
  server.sendHeader("Access-Control-Allow-Origin", "*");
  Serial.println("GET /ping");
  String response;
  const int capacity = JSON_OBJECT_SIZE(2);
  StaticJsonDocument<capacity> doc;
  doc["success"] = true;
  doc["name"] = "Wemos D1 Mini Controller";
  serializeJson(doc, response);
  server.send(200, "text/plain", response);
}

void handleGetNetworks()
{
  server.sendHeader("Access-Control-Allow-Origin", "*");
  Serial.println("GET /networks");
  int n = WiFi.scanNetworks();
  String response = "[\n";
  for (int i = 0; i < n; i++){
    response += "{\"name\": \"" + WiFi.SSID(i) + "\", \"strength\" :" + WiFi.RSSI(i) + "}";
    if (i < n-1) response += ",\n";
  }
  response += "\n]";
  server.send(200, "text/plain", response);
}

void handleConnection()
{
  server.sendHeader("Access-Control-Allow-Origin", "*");
  Serial.println("POST /connection");
  if (server.hasArg("ssid") && server.hasArg("password"))
  {
    String response;
    const int capacity = JSON_OBJECT_SIZE(2);
    StaticJsonDocument<capacity> doc;
    if (conn.connectToAnyServer(server.arg("ssid"), server.arg("password")))
    {
      Serial.println("Can connect to this network");
      conn.setLastConnectionAttempt(true);
      conn.disconnect();
      conn.saveNetwork(server.arg("ssid"), server.arg("password"));
      conn.setupConnection();
    }
    else
    {
      conn.disconnect();
      conn.connectToSavedServer();
      conn.setLastConnectionAttempt(false);
      doc["success"] = false;
      doc["status"] = REFUSED;
      serializeJson(doc, response);
      server.send(400, "text/plain", response);
    }
    doc["success"] = true;
    doc["status"] = CONNECTED;
    serializeJson(doc, response);
    server.send(200, "text/plain", response);
  }
  else
  {
    String response;
    const int capacity = JSON_OBJECT_SIZE(2);
    StaticJsonDocument<capacity> doc;
    doc["success"] = false;
    doc["message"] = MISSING_ARGS;
    serializeJson(doc, response);
    server.send(400, "text/plain", response);
  }
}

void handleReset()
{
  server.sendHeader("Access-Control-Allow-Origin", "*");
  Serial.println("POST /reset");
  server.send(200, "text/plain", "{\"success\": true}");
  delay(1000);
  resetFunc();
}

void handleCheckLastAttempt()
{
  server.sendHeader("Access-Control-Allow-Origin", "*");
  Serial.println("GET /checkLastAttempt");
  String response;
  const int capacity = JSON_OBJECT_SIZE(1);
  StaticJsonDocument<capacity> doc;
  doc["success"] = conn.getLastConnectionAttempt();
  serializeJson(doc, response);
  server.send(200, "text/plain", response);
  conn.setLastConnectionAttempt(false);
}

void handleNotFound()
{
  if (server.method() == HTTP_OPTIONS)
  {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.sendHeader("Access-Control-Max-Age", "10000");
    server.sendHeader("Access-Control-Allow-Methods", "PUT,POST,GET,OPTIONS");
    server.sendHeader("Access-Control-Allow-Headers", "*");
    server.send(204);
  }
  else
    server.send(404, "text/plain", "");
}

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
    server.onNotFound(handleNotFound);

    server.begin();
  }

  void listenServer()
  {
    server.handleClient();
  }
};
