void setup() {
  // put your setup code here, to run once:
  pinMode(2, OUTPUT);
  pinMode(3, INPUT);
}


void loop() {
  // put your main code here, to run repeatedly:

if(digitalRead(3) == HIGH){   //if pin 5 is Vcc do something
 digitalWrite(2, HIGH); //write 5v to pin 2 
}
else{
  digitalWrite(2, LOW);
}


  
  digitalWrite(2, HIGH); //write 5v to pin 2
  delay(250);           //wait 250ms
  digitalWrite(2, LOW);  //write 0v to pin 2
  delay(250);           //250 ms
}
