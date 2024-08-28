const display = document.getElementById('display');
let currentNumber = ''; 
let previousNumber = ''; 
let operation = null; 

function updateDisplay(value) {
    display.textContent = value;
    display.scrollLeft = display.scrollWidth; 
}

function clearAll() {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    updateDisplay('');
}

function clearEntry() {
    currentNumber = currentNumber.slice(0, -1); 
    updateDisplay(currentNumber);
}

function appendNumber(number) {
    currentNumber += number;
    updateDisplay(previousNumber + ' ' + (operation || '') + ' ' + currentNumber);
}

function selectOperation(op) {
    if (currentNumber === '') return; 

    
    if (previousNumber !== '' && operation !== null) {
        calculate();
    }

    previousNumber = currentNumber;
    currentNumber = '';
    operation = op;
    
    updateDisplay(previousNumber + ' ' + operation);
}

function calculate() {
    if (currentNumber === '' || operation === null) return;

    let result;
    const prevNum = parseFloat(previousNumber);
    const currNum = parseFloat(currentNumber);

    switch (operation) {
        case '+':
            result = prevNum + currNum;
            break;
        case '-':
            result = prevNum - currNum;
            break;
        case '*':
            result = prevNum * currNum;
            break;
        case '/':
            if (currNum === 0) {
                alert('Error: Division by zero!');
                return;
            }
            result = prevNum / currNum;
            break;
        case '%':
            result = (prevNum * currNum) / 100;
            break;
        default:
            return; // Handle invalid operations
    }

    currentNumber = result.toString(); 
    previousNumber = '';
    operation = null;
    updateDisplay(currentNumber); 
}

function calculateSquareRoot() {
    if (currentNumber === '') return;
    const num = parseFloat(currentNumber);
    if (num < 0) {
        alert('Error: Cannot calculate square root of a negative number!');
        return;
    }
    currentNumber = Math.sqrt(num).toString();
    updateDisplay(currentNumber);
}

const buttons = document.querySelectorAll('.item');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent.trim();
        if (!isNaN(buttonValue) || buttonValue === '.') {
            appendNumber(buttonValue);
        } else if (buttonValue === '+') {
            selectOperation('+');
        } else if (buttonValue === '-') {
            selectOperation('-');
        } else if (buttonValue === '*') {
            selectOperation('*');
        } else if (buttonValue === '/') {
            selectOperation('/');
        } else if (buttonValue === '=') {
            calculate();
        } else if (buttonValue === 'C') {
            clearAll();
        } else if (buttonValue === 'CE') {
            clearEntry();
        } else if (buttonValue === '√') {
            calculateSquareRoot();
        } else if (buttonValue === '%') {
            selectOperation('%');
        }
    });
});
