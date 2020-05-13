//user switch input values
int digValOne;
int digValTwo;
int digValOneNew;
int digValTwoNew;

void setup() {
 // turn on serial communication
  Serial.begin(9600);
//setup green LED counter outputs
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(10, OUTPUT);

//outputs for the two user switches
  pinMode(9, OUTPUT);
  pinMode(8, OUTPUT);

//input for the two user switches0
  pinMode(19, INPUT);
  pinMode(20, INPUT);

//output for the blue LED
  pinMode(2, OUTPUT);

//set default output of user switch lines to vcc
  digitalWrite(9, HIGH);
  digitalWrite(8, HIGH);

//set default values of user switches
  digValOne = digitalRead(19);
  digValTwo = digitalRead(20);

//set blue light default to off
  digitalWrite(2, LOW);
  
}

void loop() {
  //set default values of user switches
  digValOne = digitalRead(19);
  digValTwo = digitalRead(20);
  
//turn off blue LED
  digitalWrite(2, LOW);
  delay(700);
  

  Serial.println();
  Serial.print("Switch One Value: ");
  Serial.print(digValOne);
  Serial.println();
  Serial.print("Switch Two Value: ");
  Serial.print(digValTwo);
  delay(700);
  
//start of LED timer
//turn on all green LEDs to begin countdown
  digitalWrite(12, HIGH);
  digitalWrite(11, HIGH);
  digitalWrite(10, HIGH);
  delay(1500);
  digitalWrite(10, LOW);
  delay(1500);
  digitalWrite(11, LOW);
  delay(1500);
  digitalWrite(12, LOW);
  delay(2000);
//end of LED timer


//assign new values of user switches to vars for comparison
  digValOneNew = digitalRead(19);
  digValTwoNew = digitalRead(20);
  delay(1000);
//compare states and activate blue LED if necessary
    Serial.println();
    Serial.print("Switch One New Value: ");
    Serial.print(digValOneNew);
    Serial.println();
    Serial.print("Switch Two New Value: ");
    Serial.print(digValTwoNew);
  if((digValOne == digValOneNew)&&(digValTwo == digValTwoNew)){
      digitalWrite(2, HIGH);
  }
  else if((digValOne != digValOneNew)&&(digValTwo != digValTwoNew)){
      digitalWrite(2,HIGH);
  }
  else{
    digitalWrite(2, LOW);
  }

   
  delay(5000);
 
  

}
