const numButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operators");
const display = document.querySelector(".display");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");
const delButton = document.querySelector("#del");

let operation = null;
let operatorCounter = 0;
let shouldEraseDisplay = false;
let firstValue = null;
let secondValue = null;
let callbackFunctions = {
    "add": add,
    "subtract": subtract,
    "multiply": multiply,
    "divide": divide,
};

delButton.addEventListener("click", () => {
    if(display.textContent.length == 0) return;
    display.textContent = display.textContent.split("").slice(0,-1).join("");
});

function setOperation(operation){
    return callbackFunctions[operation];
}

function setSelectedBackgroundColor(e){
    e.target.classList.toggle("selected");
}
function removeSelectedBackgroundColor(){
    if(operation && document.querySelector(`#${operation}`).classList.toggle("selected")){
        document.querySelector(`#${operation}`).classList.toggle("selected");
    }
}

operationButtons.forEach((btn) => btn.addEventListener("click", (e) => {
    firstValue = parseFloat(display.textContent);
    setSelectedBackgroundColor(e);
    if(operatorCounter > 0){
        secondValue = parseFloat(display.textContent);
        let result = operate(setOperation(operation), firstValue, secondValue);
        display.textContent = result;
        secondValue = null;
        shouldEraseDisplay = true;
    }
    operation = e.target.id;
    operatorCounter++;
    shouldEraseDisplay = true;
}));

equalButton.addEventListener("click", (e) => {
    if(operation === null) return;
    secondValue = parseFloat(display.textContent);
    result = operate(setOperation(operation), firstValue, secondValue);
    display.textContent = result;
    secondValue = null;
    shouldEraseDisplay = true;
    operatorCounter = 0;
});

clearButton.addEventListener("click", clear);

numButtons.forEach((btn) => btn.addEventListener("click", (e) => {
    removeSelectedBackgroundColor();
    if(display.textContent == 0 || shouldEraseDisplay){
        display.textContent = "";
        shouldEraseDisplay = false;
    }
    display.textContent += e.target.textContent;
}));

function clear(){
    removeSelectedBackgroundColor();
    display.textContent = "0";
    operation = null;
    shouldEraseDisplay = false;
    firstValue = null;
    secondValue = null;
    operatorCounter = 0;
}

function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    if(b == 0) return "Math ERROR";
    return a / b;
}
function operate(callback, a, b){
    return callback(a, b);
}