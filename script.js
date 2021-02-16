const numButtons = document.querySelectorAll(".numbers");
const display = document.querySelector(".display");
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => display.textContent = "0");
numButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if(display.textContent == 0) display.textContent = "";
        display.textContent += e.target.textContent;
    });
});

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

function operate(operation, a, b){
    return operation(a, b);
}