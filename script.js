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
let isPeriodPressed = false;
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

function displayResult(result){
    display.textContent = roundNumber(result);
    if(display.textContent.length > 10) display.textContent = "Unsupported";
    secondValue = null;
    shouldEraseDisplay = true;
    isPeriodPressed = false;
}

function removeSelectedBackgroundColor(){
    if(operation && document.querySelector(`#${operation}`).classList.toggle("selected")){
        document.querySelector(`#${operation}`).classList.toggle("selected");
    }
}

operationButtons.forEach((btn) => btn.addEventListener("click", (e) => {
    setSelectedBackgroundColor(e);
    if(operatorCounter > 0){
        secondValue = parseFloat(display.textContent);
        let result = operate(setOperation(operation), firstValue, secondValue);
        displayResult(result);
        firstValue = result;
    }else{
        firstValue = parseFloat(display.textContent);
    }
    operation = e.target.id;
    operatorCounter++;
    shouldEraseDisplay = true;
    isPeriodPressed = false;
}));

equalButton.addEventListener("click", (e) => {
    removeSelectedBackgroundColor();
    if(operation === null) return;
    secondValue = parseFloat(display.textContent);
    let result = operate(setOperation(operation), firstValue, secondValue);
    displayResult(result);
    operatorCounter = 0;
    operation = null;
});

clearButton.addEventListener("click", clear);

numButtons.forEach((btn) => btn.addEventListener("click", (e) => {
    removeSelectedBackgroundColor();
    if(display.textContent == 0 || shouldEraseDisplay){
        display.textContent = "";
        shouldEraseDisplay = false;
    }
    if(display.textContent.length == 10) return;
    if(e.target.id == "decimal"){
        if(!isPeriodPressed){
           display.textContent += e.target.textContent;
           isPeriodPressed = true;
        }
        return;
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
    isPeriodPressed = false;
}

function roundNumber(num){
    return Math.round(num * 1000) / 1000;
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

window.addEventListener("keydown", keyPress);

function keyPress(e){
    const btn = document.querySelector(`div[data-key="${e.key}"]`);
    if(btn) btn.dispatchEvent(new Event("click"));
    return;
}