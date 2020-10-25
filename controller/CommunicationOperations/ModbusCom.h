#include <ModbusMaster.h>
#include <FloatTwiddler.h>
ModbusMaster meter;
#define MAX485_DE 2     //enable communication
#define MAX485_RE_NEG 2 //enable communication
int S_ID = 0;

void preTransmission()
{
  digitalWrite(MAX485_DE, 1);
  digitalWrite(MAX485_RE_NEG, 1);
}
void postTransmission()
{
  digitalWrite(MAX485_DE, 0);
  digitalWrite(MAX485_RE_NEG, 0);
}

void startModbus()
{
  pinMode(MAX485_DE, OUTPUT);
  pinMode(MAX485_RE_NEG, OUTPUT);
  digitalWrite(MAX485_DE, 0);
  digitalWrite(MAX485_RE_NEG, 0);
  meter.begin(S_ID, Serial);
  meter.preTransmission(preTransmission);
  meter.postTransmission(postTransmission);
  delay(500);
}

String updateFromModbus(int startAddress, int len, ModbusResType resType)
{
  String toReturn = "";
  delay(50);
  uint8_t result = meter.readHoldingRegisters(startAddress, len);
  Serial.println("Result: " + String(result));
  if (result == meter.ku8MBSuccess)
  {
    for (int i = 1; i < len; i++)
    {
      if (resType == DOUBLE_WORD)
      {
        float temp;
        UintToFloat(meter.getResponseBuffer(i), meter.getResponseBuffer(i + 1), &temp);
        toReturn += "[" + String(startAddress + i) + "]  " + String(temp) + "\n";
        i++;
      }
      if (resType == SIGNED_INT)
      {
        toReturn += "[" + String(startAddress + i) + "]  " + String(meter.getResponseBuffer(i)) + "\n";
      }
    }
  }
  else
  {
    toReturn += "Communication with controller unsuccessfull";
  }
  delay(50);
  return toReturn;
}

String mockUpdateFromModbus(int startAddress, int len, ModbusResType resType)
{
  String toReturn = "";
  switch (resType)
  {
  case SIGNED_INT:
    for (int i = startAddress; i < len; i++)
    {
      float temp = random(420);
      toReturn += "[" + String(i) + "]  " + String(temp) + "\n";
    }
    break;
  case DOUBLE_WORD:
    for (int i = startAddress; i < len; i++)
    {
      float temp;
      UintToFloat(random(32767), random(32767), &temp);
      toReturn += "[" + String(i) + "]  " + String(temp) + "\n";
      i++;
    }
    break;
  default:
    break;
  }
  delay(100);
  return toReturn;
}
