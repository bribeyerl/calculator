const calc = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calc

    if (waitingForSecondOperand === true) {
        calc.displayValue = digit
        calc.waitingForSecondOperand = false
    } else {
        calc.displayValue = displayValue === '0' ? digit : displayValue + digit
    }
}

function inputDecimal(dot) {
    if (!calc.displayValue.includes(dot)) {
        calc.displayValue += dot
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calc
    const inputValue = parseFloat(displayValue)

    if (firstOperand === null && !isNaN(inputValue)) {
        calc.firstOperand = inputValue
    }
    calc.waitingForSecondOperand = true
    calc.operator = nextOperator
}

function updateDisplay() {
    const display = document.querySelector('.display')
    display.value = calc.displayValue
}

updateDisplay()

const keys = document.querySelector('.pad')
keys.addEventListener('click', (event) => {
    const { target } = event

    if (!target.matches('button')) {
        return
    }
    if (target.classList.contains('operator')) {
        handleOperator(target.value)
        updateDisplay()
        return
    }
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value)
        updateDisplay()
        return
    }
    if (target.classList.contains('ac')) {
        console.log('all clear', target.value)
        return
    }
    if (target.classList.contains('clear')) {
        console.log('clear', target.value)
        return
    }
    inputDigit(target.value)
    updateDisplay()
})
