int input = 10;
int val;
int prevVal;
void setup() {
  Serial.begin(9600);
  pinMode(input, INPUT);

}

void loop() {
  val = digitalRead(input);
  if(val != prevVal){
    serial.println(val);
  }
  prevVal = val;
}
