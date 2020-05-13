var movieNum;
var movie; //current movie from api
var qType; //type/format of question asked
var CA, ICA1, ICA2, ICA3;
var corasmt, asmt1, asmt2, asmt3;
var ansAsmts;
var numCorrect = 0;
var numWrong = 0;
var numAsked = 0;
var question = "";
var prevInput;
var lastWasHundred;

var serial;

function preload() {
  let url = 'https://ghibliapi.herokuapp.com/films';
  APIdata = loadJSON(url); // saves the API data into this variable
}

function setup() {
  serial = new p5.SerialPort();
  serial.open('COM3');
  serial.on('open', gotOpen);
  // print out the API data
  console.log('*****API response below****');
  console.log(APIdata);
  console.log('*****API response above****');
  serial.on('data', gotData);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateQuestion(){
  if(numAsked < 5) {
    // answers = ['a', 'b', 'c', 'd'];
  movieNum = getRandomInt(19);
  qType = getRandomInt(4);
  console.log("Movie Number: ", movieNum);
  
  // movie = APIdata[movieNum];
  console.log("Movie Info: ");
  console.log(APIdata[movieNum]);
  incAns1 = APIdata[(movieNum+12)%19];
  incAns2 = APIdata[(movieNum+45)%19];
  incAns3 = APIdata[(movieNum+739)%19];
  var temp;
  
    
    
    
  
  switch(qType){
    case 0:    //who is the director?
      CA = APIdata[movieNum].director;
      this.question = "Who is the director of: " + APIdata[movieNum].title + "?\n\n";
      this.ICA1 = incAns1.director;
      this.ICA2 = incAns2.director;
      this.ICA3 = incAns3.director;
      //randomly assign possible answers
      while(ICA1 == CA){
        temp = getRandomInt(19);
        ICA1 = temp.director;
      }
      while((ICA2==CA)||(ICA2==ICA1)){
        temp = getRandomInt(19);
        ICA2 = temp.director;
      }
      while((ICA3 == CA)||(ICA3==ICA1)||(ICA3==ICA2)){
        temp = getRandomInt(19);
        ICA3 = temp.director;
      }      
      assignAnswers(this.CA, this.ICA1, this.ICA2, this.ICA3);
    break;
    case 1:    //who is the producer
      this.question = "Who is the rotten tomato score of: " + APIdata[movieNum].title + "?\n\n";
      CA = APIdata[movieNum].rt_score;
      this.ICA1 = incAns1.rt_score;
      this.ICA2 = incAns2.rt_score;
      this.ICA3 = incAns3.rt_score;
      while(ICA1 == CA){
        temp = getRandomInt(19);
        ICA1 = temp.rt_score;
      }
      while((ICA2==CA)||(ICA2==ICA1)){
        temp = getRandomInt(19);
        ICA2 = temp.rt_score;
      }
      while((ICA3 == CA)||(ICA3==ICA1)||(ICA3==ICA2)){
        temp = getRandomInt(19);
        ICA3 = temp.rt_score;
      }      
      assignAnswers(this.CA, this.ICA1, this.ICA2, this.ICA3);
    break;
    case 2:    //title based on description
      this.question = "What is the title of the film with this description: \n\n" + APIdata[movieNum].description;
      CA = APIdata[movieNum].title;
      this.ICA1 = incAns1.title;
      this.ICA2 = incAns2.title;
      this.ICA3 = incAns3.title;
      assignAnswers(this.CA, this.ICA1, this.ICA2, this.ICA3);
    break;
    case 3:    //release date
      this.question = "What is the release date of: " + APIdata[movieNum].title + "?\n\n";
      this.CA = APIdata[movieNum].release_date;
      this.ICA1 = incAns1.release_date;
      this.ICA2 = incAns2.release_date;
      this.ICA3 = incAns3.release_date;
      assignAnswers(this.CA, this.ICA1, this.ICA2, this.ICA3);
    break;
  }  
  numAsked++;
  }
  else{
    if(numCorrect > numWrong){
      youWin();
    }
    else {
      youLose();
    }
  }
}


function assignAnswers(corA, inc1, inc2, inc3){ //assign letter answers, print choices
  var answers = ['a', 'b', 'c', 'd'];
  var i = 0;
  var temp = [-1];
  this.ansAsmts = [[this.CA, corasmt],[this.ICA1, asmt1], [this.ICA2, asmt2], [this.ICA3, asmt3]]; 
  while(answers.length != 0){
    currInd = getRandomInt(answers.length);
    temp = answers.splice(currInd, 1);
    ansAsmts[i][1] = temp[0];
    i++;
  }
  console.log("Answer assignments: ");
  console.log("[", this.ansAsmts[0], this.ansAsmts[1], this.ansAsmts[2], this.ansAsmts[3], "]");
  printOptions();
}
function printOptions(){
  var i = 0;
  var options = this.question;
  while(i < 4){
    if(ansAsmts[i][1] == 'a'){
      options += "\n\n\nA. " + ansAsmts[i][0];
    }
    i++;
  }
  i = 0;
  while(i < 4){
    if(ansAsmts[i][1] == 'b'){
      options += "\n\nB. " + ansAsmts[i][0];
    }
    i++;
  }
  i = 0;
  while(i < 4){
    if(ansAsmts[i][1] == 'c'){
      options += "\n\nC. " + ansAsmts[i][0];
    }
    i++;
  }
  i = 0;
  while(i < 4){
    if(ansAsmts[i][1] == 'd'){
      options += "\n\nD. " + ansAsmts[i][0];
    }
    i++;
  }
  console.log("Options: ");
  console.log(options);
  var output = document.getElementById('output');
  this.output.innerText = options;
}

function answerA(){
  if(this.ansAsmts[0][1] == "a") {
    numCorrect++;
    correct();
  }
  else {
    numWrong++;
    wrong();
  }
  generateQuestion();
}
function answerB(){
  if(this.ansAsmts[0][1] == "b") {
    numCorrect++;
    correct();
  }
  else {
    numWrong++;
    wrong();
  }
  generateQuestion();
}
function answerC(){
  if(this.ansAsmts[0][1] == "c") {
    numCorrect++;
    correct();
  }
  else {
    numWrong++;
    wrong();
  }
  generateQuestion();
}
function answerD(){
  if(this.ansAsmts[0][1] == "d") {
    numCorrect++;
    correct();
  }
  else {
    numWrong++;
    wrong();
  }
  generateQuestion();
}
function correct(){
 //play 'correct' animation 
  appear(document.getElementsByTagName('img')[0], 0, 5, 40);
  appear(document.getElementsByTagName('img')[0], 100, -5, 40);
  this.numCorrect++;
  // var send = 'green';
  this.serial.write('green\n');
}
function wrong(){
  //play 'wrong' animation
  appear(document.getElementsByTagName('img')[1], 0, 5, 40);
  appear(document.getElementsByTagName('img')[1], 100, -5, 40);
  numWrong++;
  // var send = 'red';
  this.serial.write('red\n');
}
function youLose(){
  this.output.innerText = "";
  document.getElementsByTagName('img')[4].style.opacity = (20/100);
  appear(document.getElementsByTagName('img')[5], 0, 5, 100);
  var despair = document.getElementById("kiritsugu");   
  despair.play();
}
function youWin(){
  this.output.innerText = "";
  document.getElementsByTagName('img')[2].style.opacity = (20/100);
  appear(document.getElementsByTagName('img')[3], 0, 5, 100);
  var gg = document.getElementById("howl");   
  gg.play();
}









function appear(elm, i, step, speed){
    var t_o;
    //initial opacity
    i = i || 0;
    //opacity increment
    step = step || 5;
    //time waited between two opacity increments in msec
    speed = speed || 250; 

    t_o = setInterval(function(){
        //get opacity in decimals
        var opacity = i / 100;
        //set the next opacity step
        i = i + step; 
        if(opacity > 1 || opacity < 0){
            clearInterval(t_o);
            //if 1-opaque or 0-transparent, stop
            return; 
        }
        //modern browsers
        elm.style.opacity = opacity;
        //older IE
        elm.style.filter = 'alpha(opacity=' + opacity*100 + ')';
    }, speed);
}



function gotOpen() {
 print("Serial Port is Open");
  var serialVar = serial.read();
  console.log('Data from Adafruit: ' + serialVar);
}

function gotData(){
  console.log("ENTERED GOT DATA");
  var potVal = serial.readLine();
  trim(potVal);
  if(!potVal) return;
  var nums = potVal.split(',');
  var numVal = parseInt(potVal, 10);
  var pushed = parseInt(nums[1], 10);
  console.log("numVAl: " + numVal);
  if(numVal != 100){
    this.prevInput = numVal;
    lastWas100 = false;
  }
  if((numVal)==1){
    getFocus('button', 0); 
  }
  if((numVal)==2){
    getFocus('button', 1); 
  }
  if((numVal)==3){
    getFocus('button', 2); 
  }
  if((numVal)==4){
    getFocus('button', 3); 
  }
  if((numVal)==5){
    getFocus('button', 4); 
  }
  
  
  if((numVal == 100)&&(!lastWas100)){
   //  var focused = document.activeElement;
   //  if (!focused || focused == document.body)
   //      focused = null;
   //  else if (document.querySelector)
   //      focused = document.querySelector(":focus");
   // var evt = new CustomEvent('keyup');
   // evt.which = 13;
   // evt.keyCode = 13;
   // document.activeElement.dispatchEvent(evt); //This would trigger the event listener.
   if(this.prevInput == 1){
     answerA();
   }
    if(this.prevInput == 2){
      answerB();
   }
    if(this.prevInput == 3){
      answerC();
   }
    if(this.prevInput == 4){
      answerD();
   }
    if(this.prevInput == 5){
      generateQuestion();
   }
    lastWas100 = true;
  }
}

function getFocus(field, ind) {           
  document.getElementsByTagName(field)[ind].focus();
}
