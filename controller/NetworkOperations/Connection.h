#define PIN_LED 13
#define PASS_ADDRESS 100
#define SSID_ADDRESS 100

class Conn
{
private:
  byte onBoardPin = PIN_LED;
  // String ssid = "Phaedra Dev";
  // String password = "internet175";
  // String ssid = "Maxwell";
  // String password = "Maxwell321";
  // String ssid = "Redmi 9C";
  // String password = "12121122";
  String ssid = "";
  String password = "";
  String softApName = "MCM Logger";
  String softApPassword = "12345678";
  bool wasLastConnectionAttemptSuccessfull = false;

public:
  Conn() {}

  void checkForSSID()
  {
    StaticJsonDocument<500> doc;
    DeserializationError error = deserializeJson(doc, readFile(WIFI_CONFIG_FILE));
    if (error)
    {
      Serial.println("ERROR OCCURRED DURING READING FROM JSON FILE");
      return;
    }
    String _ssid = doc["ssid"];
    String _password = doc["password"];
    this->ssid = _ssid;
    this->password = _password;
    Serial.println("SSID AND PASSWORD SET");
  }

  void setupConnection()
  {
    this->checkForSSID();
    if (!this->connectToAnyServer(this->ssid, this->password))
    {
      Serial.println("Failed to connect to the network " + this->ssid + " with password " + this->password);
      WiFi.disconnect();
      this->setupAccessPoint();
    }
  }

  bool
  setupAccessPoint()
  {
    Serial.print("Setting soft-AP ... ");
    IPAddress local_IP(192, 168, 0, 50);
    IPAddress gateway(192, 168, 0, 1);
    IPAddress subnet(255, 255, 255, 0);
    WiFi.softAPConfig(local_IP, gateway, subnet);
    boolean result = WiFi.softAP(this->softApName, this->softApPassword);
    Serial.print("The IP Address of ESP8266 Module is: ");
    Serial.println(WiFi.softAPIP());
    return result;
  }

  bool connectToAnyServer(String ssid, String password)
  {
    if (ssid.length() == 0)
      return false;
    WiFi.begin(ssid, password);
    byte counter = 0;
    while (WiFi.status() != WL_CONNECTED)
    {
      delay(500);
      counter++;
      if (counter == 50)
      {
        return false;
      }
      Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connection Successful");
    Serial.print("The IP Address of ESP8266 Module is: ");
    Serial.println(WiFi.localIP());
    return true;
  }

  bool connectToSavedServer()
  {
    return this->connectToAnyServer(this->ssid, this->password);
  }

  void disconnect()
  {
    Serial.println("Disconnected from current network");
    WiFi.disconnect();
  }

  void setLastConnectionAttempt(bool arg)
  {
    this->wasLastConnectionAttemptSuccessfull = arg;
  }
  bool getLastConnectionAttempt()
  {
    return this->wasLastConnectionAttemptSuccessfull;
  }

  void saveNetwork(String ssid, String password)
  {
    this->ssid = ssid;
    this->password = password;
    createFile(WIFI_CONFIG_FILE, "{\n\"ssid\": \"" + ssid + "\",\n\"password\": \"" + password + "\"\n}");
  }

  bool checkWifiStatus()
  {
    if (WiFi.status() == WL_CONNECTED)
      return true;
    return false;
  }
};

Conn conn = Conn();
