const numButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operators");
const display = document.querySelector(".display");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");
const delButton = document.querySelector("#del");

let operation = null;
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

operationButtons.forEach((btn) => btn.addEventListener("click", (e) => {
    firstValue = parseFloat(display.textContent);
    operation = e.target.id;
    if(operation == "invertSignal"){
        display.textContent = invertSignal(firstValue);
        return;
    }
    shouldEraseDisplay = true;
}));

equalButton.addEventListener("click", (e) => {
    secondValue = parseFloat(display.textContent);
    result = operate(setOperation(operation), firstValue, secondValue);
    display.textContent = result;
    shouldEraseDisplay = true;
});

clearButton.addEventListener("click", clear);

numButtons.forEach((btn) => btn.addEventListener("click", (e) => {
    if(display.textContent == 0 || shouldEraseDisplay){
        display.textContent = "";
        shouldEraseDisplay = false;
    }
    display.textContent += e.target.textContent;
}));

function clear(){
    display.textContent = "0";
    operation = null;
    shouldEraseDisplay = false;
    firstValue = null;
    secondValue = null;
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
function invertSignal(a){
    return -a;
}
function operate(callback, a, b){
    return callback(a, b);
}