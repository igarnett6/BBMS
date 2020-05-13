void setup() {
  // put your setup code here, to run once:
  pinMode(2, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(2, HIGH); //write 5v to pin 2
  delay(500);           //wait 500ms
  digitalWrite(2, LOW);  //write 0v to pin 2
  delay(500);           //500 ms
}
