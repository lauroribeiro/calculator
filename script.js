const numButtons = document.querySelectorAll(".numbers");
const opButtons = document.querySelectorAll(".operators");
const display = document.querySelector(".display");
const clearButton = document.querySelector("#clear");
delButton = document.querySelector("#del");
let operation = null;
let operationSelected = false;
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

opButtons.forEach((btn) => btn.addEventListener("click", (e) => {
    let result = null;
    if(!firstValue) firstValue = parseInt(display.textContent);
    if (!operation) operation = e.target.id;
    console.log(operation);
    operationSelected = true;
    if(e.target.id == "equal"){
        secondValue = parseInt(display.textContent);
        console.log(firstValue);
        console.log(secondValue);
        result = operate(callbackFunctions[operation], firstValue, secondValue);
        console.log(result);
        clear();
    } 
    if(operation == "invertSignal") result = invertSignal(parseInt(display.textContent));
    
    if(result) display.textContent = result;
}));

clearButton.addEventListener("click", clear);

numButtons.forEach((btn) => btn.addEventListener("click", (e) => {
    if(display.textContent == 0 || operationSelected){
        display.textContent = "";
        operationSelected = false;
    }
    display.textContent += e.target.textContent;
}));

function clear(){
    display.textContent = "0";
    operation = null;
    operationSelected = false;
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