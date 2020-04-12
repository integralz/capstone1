#define trig 22
#define echo 23 
int led[3] = {15, 4, 17}; 
int gnd[3] = {2, 16, 5}; 
 
void setup() { 
  for (int i=0; i<3; i++) { 
    pinMode(led[i], OUTPUT); 
    digitalWrite(led[i], 1); 
      
    pinMode(gnd[i], OUTPUT); 
    digitalWrite(gnd[i], 0); 
    } 
  Serial.begin(115200); 
  Serial.println("초음파 센서 시작");

  pinMode(trig, OUTPUT);   
  pinMode(echo, INPUT);
 } 
 
 
 void loop() { 
  static int j=30; 
  long duration, distance;
             
  digitalWrite(trig, HIGH);    
  delayMicroseconds(10);          
  digitalWrite(trig, LOW);  
  duration = pulseIn(echo, HIGH); 
  distance = duration * 170 / 1000;
  
  for (int k=0; k<3; k++) { 
     digitalWrite(led[k], 1); 
     delay(distance/5); 
     digitalWrite(led[k], 0); 
     delay(distance/3); 
   }
  Serial.print("거리: ");
  Serial.print(distance); 
  Serial.println("mm");
  delay(100);      
 } 