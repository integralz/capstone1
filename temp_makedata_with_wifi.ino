#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#define USE_SERIAL Serial
WiFiMulti wifiMulti;
#define ONE_WIRE_BUS 4 
OneWire oneWire(ONE_WIRE_BUS);       
DallasTemperature sensors(&oneWire);  

String text1 = "http://34.229.111.147:8080/?device_id=12&temperature_value=";
String text3 = "&sequence_number=456";
void setup() {

    USE_SERIAL.begin(115200);

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

    for(uint8_t t = 4; t > 0; t--) {
        USE_SERIAL.printf("[SETUP] WAIT %d...\n", t);
        USE_SERIAL.flush();
        delay(1000);
    }

    wifiMulti.addAP("iptime401", "63161995");
    Serial.begin(115200);
    sensors.begin();

}

void loop() {
    if((wifiMulti.run() == WL_CONNECTED)) {
        sensors.requestTemperatures();
        String text2 = String(sensors.getTempCByIndex(0));
        Serial.println(sensors.getTempCByIndex(0));

        HTTPClient http;
        USE_SERIAL.print("[HTTP] begin...\n");
        http.begin(text1+text2+text3); 
        USE_SERIAL.print("[HTTP] GET...\n");
        
        int httpCode = http.GET();

       
        if(httpCode > 0) {
          
            USE_SERIAL.printf("[HTTP] GET... code: %d\n", httpCode);

            if(httpCode == HTTP_CODE_OK) {
                String payload = http.getString();
                USE_SERIAL.println(payload);
            }
        } else {
            USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        }

        http.end();
    }

    delay(60000);
}