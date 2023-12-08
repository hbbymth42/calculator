let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let resetScreen = false;

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.getElementById('equalsBtn');
const clearButton = document.getElementById('clearBtn');
const posNegButton = document.getElementById('posNegBtn');
const lastOp = document.getElementById('lastOperation');
const currentOp = document.getElementById('currentOperation');

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
posNegButton.addEventListener('click', posNegNum);

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
);

function appendNumber(number) {
    if(currentOp.textContent === '0' || resetScreen)  {
        reset();
    }
    currentOp.textContent += number;
}

function reset() {
    currentOp.textContent = '';
    resetScreen = false;
}

function clear() {
    currentOp.textContent = '0';
    lastOp.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function posNegNum() {
    if (resetScreen) {
        reset();
    }
    if (currentOp.textContent === '') {
        currentOp.textContent = '0';
    }
    if (currentOp.textContent.charAt(0) == '-') {
        currentOp.textContent = currentOp.textContent.toString().slice(1,currentOp.textContent.length);
    }
    else {
        currentOp.textContent = '-' + currentOp.textContent.toString();
    }
}

function setOperation(operator) {
    if (currentOperation !== null) {
        evaluate();
    }
    firstOperand = currentOp.textContent;
    currentOperation = operator;
    lastOp.textContent = `${firstOperand} ${currentOperation}`;
    resetScreen = true;
}

function evaluate() {
    if (currentOperation === null || resetScreen){
        return;
    }
    if (currentOperation === '/' && currentOp.textContent === '0') {
        alert("No no, no 0!");
        return;
    }
    secondOperand = currentOp.textContent
    currentOp.textContent = roundResult(operate(firstOperand, currentOperation, secondOperand));
    lastOp.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 + num2;
}

function divide(num1, num2) {
    return num1 + num2;
}

function operate(num1, operator, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            if (num2 === 0) {
                return null;
            }
            return divide(num1, num2);
        default:
            return null;
    }
}