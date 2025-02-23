//decleration of variable
let currentInput = "";
let previousInput = "";
let operator = "";
let decimalAdded = false;

// function to append a number or decimal point to currentInput  
function appendNumber(number) {
  // if the input is a decimal point and decimal has already been added do nothing and return
  if (number === "." && decimalAdded) return; 
  // if the number input is a decimal point set decimal added to true        
  if (number === ".") decimalAdded = true;
  //append the number to the current input
  currentInput += number;
  // update the displayed result in the input field with the new value
  document.getElementById("result").value = currentInput;
}

// function to clear the calculator display and reset stored values
function clearResult() {
  // resetting currentInput 
  currentInput = "";
  // resetting previousInput 
  previousInput = "";
  // clearing operator
  operator = "";
  //reset the decimal tracking flag to allow a new decimal point input
  decimalAdded = false;
  // update the displayed result to an empty string
  document.getElementById("result").value = "";  
}

//function to clear a last digit in the calculator display. 
function clearDigit(){
  // check there is any input in currentInput
  if (currentInput.length > 0) {
    //remove the last digit form the current input
    currentInput = currentInput.slice(0, -1);
    //update decimal tracking if the remaining input contains a decimal keep true otherwise set false
    decimalAdded = currentInput.includes(".");
  }
    // if currentInput is empty but operator is set clear the operator
  else if (operator) {
    operator = "";  
  }
  // if both currentInput and operator are empty clear pervious input
   else {
    previousInput = "";
  }
   // update the displayed result with the modified currentInput
  document.getElementById("result").value = currentInput;
}

// funtion to set the operator for a mathematical operation. 
function setOperator(op) {
  // if there is no currentInput and the operator is not squareroot(√)  do nothing and return
  if (currentInput === "" && op !== "√") return; 
  // If the operator is squareroot(√)
  if (op === "√") {
    //convert the currentInput into number
    let number = parseFloat(currentInput);
    // if the number is negative alert the user and stop execution
    if (number < 0) {
      alert("Invalid input!");
      return;
    }                                                   
    // calculate the squarerootof the number and convert into string
    currentInput = Math.sqrt(number).toString();
    // update the display result with value after calculation and returing
    document.getElementById("result").value = currentInput;
    return;
  }
  // if the previousInput is not empty then calling calculateResult function
  if (previousInput !== "") {
    calculateResult();
  }
  // store the selected operator
  operator = op;
  // Storing currentInput Value as previousInput.
  previousInput = currentInput;    
  // resetting the currentInput
  currentInput = "";
  //reset the decimal tracking flag to allow a new decimal point input
  decimalAdded = false;
}

//function to perform the calculation based on the selected operator
function calculateResult() {
  // ensure both previousInput and currentInput exists before performing a calculation
  if (previousInput === "" || currentInput === "") return; 
  //variable to store the final result
  let result;
  //convert previousInput and currentInput to floating point number
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  // if either input is not a valid number exit in the function 
  if (isNaN(prev) || isNaN(current)) return;  
  // perform the calculation based on operators      
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "%":
      result = (prev / 100) * current;
      break;
      // check for division by zero, if current is divided by zero alert Error
    case "/":
      result = current === 0 ? (alert("Error"), null) : prev / current;
      break;
    default:
      return;
  }
  //convert the result to a string and update currentInput
  currentInput = result.toString();  
  //store the result as previousInput for potential further calculation       
  previousInput = currentInput;   
  // clear the operator as the operation is completed
  operator = "";       
  // update decimal tracking based on the result 
  decimalAdded = currentInput.includes(".");
  // Display the calculated on the screen
  document.getElementById("result").value = result;
}