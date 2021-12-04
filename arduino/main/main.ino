 #include <deprecated.h>
#include <MFRC522.h>
#include <require_cpp11.h> 
#include <SPI.h>      // incluye libreria bus SPI
#include <MFRC522.h>      // incluye libreria especifica para MFRC522
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define RST_PIN  5     // constante para referenciar pin de reset
#define SS_PIN  4     // constante para referenciar pin de slave select
 
MFRC522 mfrc522(SS_PIN, RST_PIN); // crea objeto mfrc522 enviando pines de slave select y reset

String ssid     = "wifi_kronos";
String password = "1059707907";

String url = "http://192.168.0.5:8100/api/v1/board/sendData?uid=";

byte cont = 0;
byte max_intentos = 50;

HTTPClient http;
WiFiClient client;


void setup() {
  Serial.begin(115200);     // inicializa comunicacion por monitor serie a 9600 bps
  SPI.begin();        // inicializa bus SPI
  mfrc522.PCD_Init();     // inicializa modulo lector
  Serial.println("Listo");    // Muestra texto Listo
  delay(10);

   Serial.println("\n");

  // Conexión WIFI
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED and cont < max_intentos) { //Cuenta hasta 50 si no se puede conectar lo cancela
    cont++;
    delay(500);
    Serial.print(".");
  }

  if (cont < max_intentos) {  //Si se conectó      
      Serial.println("********************************************");
      Serial.print("Conectado a la red WiFi: ");
      Serial.println(WiFi.SSID());
      Serial.print("IP: ");
      Serial.println(WiFi.localIP());
      Serial.print("macAdress: ");
      Serial.println(WiFi.macAddress());
      Serial.println("*********************************************");
  }
} 
 
void loop() {
 
  if ( ! mfrc522.PICC_IsNewCardPresent()) 
    return;
  
  if ( ! mfrc522.PICC_ReadCardSerial()){
      Serial.println("No lectura");
      delay(2000);
      return;           // retorna al loop esperando por otra tarjeta  
  }
  

  String userid;
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    Serial.print(mfrc522.uid.uidByte[i], HEX);
    userid += String(mfrc522.uid.uidByte[i], HEX);
  }

  if (http.begin(client, url + userid)) {
    int httpCode = http.GET();  // Realizar petición
    if (httpCode > 0) {
      if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
        String payload = http.getString();  // Obtener respuesta
        Serial.println(payload);  // Mostrar respuesta por serial
      }
    }
  }
    
  mfrc522.PICC_HaltA();     // detiene comunicacion con tarjeta                
}