void setup() {
  // put your setup code here, to run once:
  pinMode(11, INPUT);
  pinMode(15, OUTPUT);
  pinMode(14, OUTPUT);
  pinMode(21, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(digitalRead(11) == HIGH){
    digitalWrite(21, HIGH);
    digitalWrite(2, HIGH);
    digitalWrite(15, LOW);
    digitalWrite(14, LOW);
    digitalWrite(9, LOW);
    digitalWrite(8, LOW);
    delay(500);
  }
  else{
    digitalWrite(21, LOW);
    digitalWrite(14, HIGH);
    digitalWrite(9, HIGH);
    delay(500);
    digitalWrite(15, HIGH);
    digitalWrite(8, HIGH);
    delay(500);
    digitalWrite(15, LOW);
    digitalWrite(14, LOW);
    digitalWrite(9, LOW);
    digitalWrite(10, LOW);
    delay(500);
  }
}
