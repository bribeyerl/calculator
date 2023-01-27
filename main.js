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

    if (operator && calc.waitingForSecondOperand) {
        calc.operator = nextOperator
        return
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        calc.firstOperand = inputValue
    } else if (operator) {
        const result = operate(firstOperand, inputValue, operator)

        calc.displayValue = String(result)
        calc.firstOperand = result
    }

    calc.waitingForSecondOperand = true
    calc.operator = nextOperator
}

function operate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand
    } else if (operator === '-') {
        return firstOperand - secondOperand
    } else if (operator === '*') {
        return firstOperand * secondOperand
    } else if (operator === '/') {
        return firstOperand / secondOperand
    }
    return secondOperand
}

function clearCalc() {
    calc.displayValue = '0'
    calc.firstOperand = null
    calc.waitingForSecondOperand = false
    calc.operator = null
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
        clearCalc()
        updateDisplay()
        return
    }
    if (target.classList.contains('clear')) {
        console.log('clear', target.value)
        return
    }
    inputDigit(target.value)
    updateDisplay()
})
