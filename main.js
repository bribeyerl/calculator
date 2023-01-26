const calc = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}

function updateDisplay() {
    const display = document.querySelector('.display')
    display.value = calc.displayValue
}

updateDisplay()