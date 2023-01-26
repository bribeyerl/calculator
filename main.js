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

function inputDigit(digit) {
    const { displayValue } = calc
    calc.displayValue = displayValue === '0' ? digit : displayValue + digit
}

const keys = document.querySelector('.pad')
keys.addEventListener('click', (event) => {
    const { target } = event

    if (!target.matches('button')) {
        return
    }
    if (target.classList.contains('operator')) {
        console.log('operator', target.value)
        return
    }
    if (target.classList.contains('decimal')) {
        console.log('decimal', target.value)
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