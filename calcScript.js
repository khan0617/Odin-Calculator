let displayStr = ''; // variable for the main display
let historyStr = ''; // stores history info, above the main display.
let operators = ['+', '-', '*', '÷', '='];
let prevOperator = '';
let operands = [undefined, undefined];
let opCount = 0;

let switchDisplay = false, needToSwitchHistory = false;

function add(x, y){
    return Number(x) + Number(y);
}

function subtract(x, y){
    return Number(x) - Number(y);
}

function multiply(x, y){
    return Number(x) * Number(y);
}

function divide(x, y){
    if(y == 0){
        return "Divide by Zero!";
    }
    return Number(x) / Number(y);
}

// called whenever a keypad button has been clicked on (not for click or delete).
function updateDisplay(button){
    let value = button.textContent;

    // see if the user clicked +, -, *, ÷, or =
    if(operators.includes(value)){
        clickedOperator(value);

        // DEBUGGING:
        console.log("clicked on operator! " + value);

    }
    else if(displayStr == '&nbsp;' || switchDisplay){
        displayStr = value;
        switchDisplay = false;
    }
    else{
        displayStr += value;
    }

    document.querySelector('.input-display').innerHTML = displayStr;

    // DEBUGGING: 
    // console.log(`Clicked on: ${value}, new display value: ${displayStr}`);
}

// called when the user has clicked on +,-,/,*, or =
function clickedOperator(op){
    let displayDiv = document.querySelector('.input-display');
    let historyDiv = document.querySelector('.input-history');
    if(op == '=' && opCount == 1){
            historyStr += displayDiv.textContent + ' =';
            displayStr = operate(prevOperator, operands[0], displayDiv.textContent);
            operands[0] = Number(displayStr);
            opCount = 0;
            prevOperator = '=';
            needToSwitchHistory = true;
    }
    else{ // clicked on +, -, /, *
        if(opCount == 0 && displayDiv.innerHTML != '&nbsp;'){
            opCount += 1;
            operands[0] = displayDiv.textContent;
            if(needToSwitchHistory){
                historyStr = `${displayDiv.textContent} ${op}`;
                needToSwitchHistory = false;
            }
            historyStr = `${operands[0]} ${op} `;
            switchDisplay = true;
            prevOperator = op;
        }
        else if(opCount == 1 && displayDiv.innerHTML != '&nbsp;'){
            opCount = 1;
            displayStr = operate(prevOperator, operands[0], displayDiv.textContent)
            historyStr = `${displayStr} ${op} `;
            operands[0] = displayStr;
            switchDisplay = true;
            prevOperator = op;
        }
    }

    displayDiv.innerHTML = displayStr;
    historyDiv.innerHTML = historyStr;

}

// reset the display and clear all previous input information
function clearKey(){
    let displayDiv = document.querySelector('.input-display');
    let historyDiv = document.querySelector('.input-history');
    displayStr = '&nbsp;';
    historyStr = '&nbsp;';
    displayDiv.innerHTML = displayStr;
    historyDiv.innerHTML = historyStr;

    operands[0] = undefined;
    operands[1] = undefined;
    prevOperator = '';
    opCount = 0;

    // DEBUGGING: 
    console.log("clicked on: clear");
}

function deleteKey(){
    if(displayStr != '&nbsp;'){
        displayStr = displayStr.toString().slice(0, -1); // remove the last character of the display str
        if(displayStr == ''){
            displayStr = '&nbsp;';
        }
        document.querySelector('.input-display').innerHTML = displayStr;
    }

    // DEBUGGING:
    console.log("clicked on: delete");
}

function updateHistory(string){
    document.querySelector('input-history').textContent = string;
}




// given an operator and 2 arguments, compute the result between them
// operator is a string, x and y are numbers
function operate(operator, x, y){
    let result;
    switch(operator){
        case '+':
            result = add(x, y);
            break;
        
        case '-':
            result = subtract(x, y);
            break;

        case '*':
            result = multiply(x, y);
            break;

        case '÷':
            result = divide(x, y);
            break;

        default:
            result = "Invalid operator!"
    }
    return result;
}


// DEBUGGING: testing the operator function
// console.log(`5+10: ${operate('+', 5, 10)}`); 
// console.log(`5*10: ${operate('*', 5, 10)}`);
// console.log(`5-10: ${operate('-', 5, 10)}`);
// console.log(`5÷10: ${operate('÷', 5, 10)}`);
// console.log(`5÷0: ${operate('÷', 5, 0)}`);