// include the neopixel library
#include <Adafruit_NeoPixel.h>

int potData = A5;
int button = 2;
int ledPin = 3; // the pin the LED data line is connected to
int numLED = 5; // number of LEDs you are controlling
unsigned long red;
unsigned long green;
int pushed;
int output[] = {-1, -1};
int potVal;
int i = 0;

// call the constructor for the neopixels
Adafruit_NeoPixel leds(numLED, ledPin, NEO_GRB + NEO_KHZ800);

int input[] = {0, 0, 0};      // an array to hold color data

String inputString = "";      // a String to hold incoming data
bool stringComplete = false;  // whether the string is complete

void setup() {
  // start serial
  Serial.begin(9600);
  // start communication with the LEDs
  leds.begin();
  // it's necessary to call show() to write the values to the lights
  // in this case, right after begin(), it just insures that they are all off
  leds.show();
  red = leds.Color(255, 0, 0);
  green = leds.Color(0, 255, 0);
  // reserve memory for the inputString:
  inputString.reserve(50);

  establishContact(); // make sure we're communicating
  delay(16);  // small delay
}

void loop() {
  pushed = digitalRead(button);
  potVal = analogRead(potData);
//  Serial.println(potVal);
  if(potVal < 204.8){
    potVal = 1;
  }
  else if((potVal>204.8)&&(potVal <= 409.6)){
    potVal = 2;
  }
  else if((potVal > 409)&&(potVal<=614.4)){
    potVal = 3;
  }
  else if ((potVal > 614.4)&&(potVal<=819.2)){
    potVal = 4;
  }
  else if(potVal > 819){
    potVal = 5;
  }
  if(pushed == 1){
    pushed = 100;
  }
  if (pushed == 0){
    pushed = 500;
  }
  output[0] = pushed;
  output[1] = potVal;
  Serial.println(potVal);
  delay(500);
  if(pushed == 100){
    Serial.println(pushed);
    delay(5000);
  }
  
  // while there's data available
  while (Serial.available()) {
    // get the new byte and store it
    char inChar = (char)Serial.read();
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, 
    // set a flag so the main loop can do something about it:
    if (inChar == '\n') {
      stringComplete = true;
      inputString.trim(); // trim off any whitespace
    }

  }
  
  // if we have a valid string
  if (stringComplete) { 
//    leds.fill(red);
//    leds.show();
   if(inputString == "red"){
    leds.setPixelColor(i, 255, 0, 0);
//    leds.fill(red);
    leds.show();
    i++;
   }
   else if(inputString == "green"){
     leds.setPixelColor(i, 0, 255, 0);
//    leds.fill(green);
    leds.show();
    i++;
   }

   

    inputString = ""; // clear the string for more information
    stringComplete = false; // get ready for another new set of information
    //Serial.print('A'); // ask for more
  }
}

void establishContact() {
  while (Serial.available() <= 0) {
    //Serial.print('A');   // send an initial string
    delay(300);
  }
}
