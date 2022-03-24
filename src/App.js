import './App.css';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import EvaluateButton from './EvaluateButton';
import ParenthesesButton from './ParenthesesButton';
import { useReducer } from 'react';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  TRIG: 'trig',
  CLEAR: 'clear',
  DELETE: 'delete',
  OPERATION: 'operation',
  EVALUATE: 'evaluate',
  PARENTHESES: 'parentheses'
}

//loops through the expression and checks if the parentheses are valid
function validParentheses(expression) {
  var array = [];
  var newExpression = "";
  //converts the expression to have only parentheses
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "(" || expression[i] === ")") { 
      newExpression += expression[i];
    } 
  }
  if (newExpression === "") {
    return true;
  }
  array[0] = newExpression[0];
  console.log(newExpression);
  var j = 0;
  //have two arrays that we loop over to push/pop the number and position of opening and closing brackets
  for (let i = 1; i < newExpression.length; i++) {
    if (newExpression[i] === ')' && array[j] === '(') {
      array[j] = '0';
      if (j > 0) {
        j--;
      }
    }
    else {
      if (array[j] !== '0') {
        j++;
      }
      array[j] = newExpression[i];
    }
  }
  if (array[0] === '0') {
    return true;
  }
  return false;
}
//helper function to replace specific characters in expression
function evaluate(expression) {
  expression = expression.replaceAll('×', '*'); 
  expression = expression.replaceAll('−', '-');
  expression = expression.replaceAll('÷', '/');
  console.log(expression);
  return String(calculate(0, expression)[0]);
}

function calculate(index, expression) {
  var ans = 0;
  var stack = [];
  var sign = "+";
  var signArray = ['+', '-', '/', '*'];

  //pushes the value of the operand(s) onto the array based on what operation is passed
  function pushStack(op, val) {
    if (op === "+") {
      stack.push(val);
    }
    else if (op === "-") {
      stack.push(-1*val);
    }
    else if (op === "*") {
      stack.push(stack.pop() * val);
    }
    else if (op === "/") {
      var prev = stack.pop();
      console.log(prev);
      if (prev < 0) {
        prev = Math.abs(prev);
        stack.push(-(prev / val));
      }
      else {
        stack.push(prev / val);
      }
    }
  }

  //loop through the whole expression
  while (index < expression.length) {

    //turning a string to decimal number
    if ((expression[index] >= '0' && expression[index] <= '9') || expression[index] === '.') {
      let temp = "";
      while (index < expression.length && ((expression[index] >= '0' && expression[index] <= '9') || expression[index] === '.')) {
        temp += expression[index];
        index++;
      }
      index--;
      ans = parseFloat(temp);
    }
    
    //pushing/calculating the value if the char is an operation
    else if (signArray.includes(expression.charAt(index))) {
      pushStack(sign, ans);
      ans = 0;
      sign = expression[index];
    }
    else if (expression[index] === '(') {
      ans = calculate(index + 1, expression)[0];
      index = calculate(index + 1, expression)[1] - 1;
    }
    else if (expression[index] === ')') {
      pushStack(sign, ans);
      return [stack.reduce((pv, cv) => pv + cv, 0), index + 1];
    }
    index++;
  }
  pushStack(sign, ans);
  return [stack.reduce((pv, cv) => pv + cv, 0), index]
}

function reducer(state, {type, payload}) {
  //case statement to determine the current strings to display
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentString === "0") {
        return state;
      }
      if (payload.digit === "." && (state.currentString && state.currentString.includes("."))) {
        return state;
      }
      if (state.previousOperation === ')') {
        return state;
      }
      else {
        return {
          ...state,
          currentString: `${state.currentString || ""}${payload.digit}`,
          previousOperation: null
        }
      }
    case ACTIONS.OPERATION:
      if (state.previousOperation === null) {
        return {
          ...state,
          currentString: `${state.currentString || ""}${payload.operation}`,
          previousOperation: payload.operation
        }
      }
      return state;
    case ACTIONS.PARENTHESES:
      if (payload.parentheses === ')' && state.previousOperation) {
        return state;
      }
      else if (payload.parentheses === '(' && !state.previousOperation) {
        return state;
      }
      return {
        ...state,
        currentString: `${state.currentString || ""}${payload.parentheses}`,
        previousOperation: payload.parentheses
      }
    case ACTIONS.EVALUATE:
      if (state.previousOperation === null || state.previousOperation === ')') {
        if (validParentheses(state.currentString)) {
          return {
            ...state,
            previousString: state.currentString,
            currentString: evaluate(state.currentString),
            previousOperation: null
          }
        }
        return "Invalid Expression";
      }
      return state;
    default:
      return state;
  }
}
function App() {
  const [{currentString, previousString}, dispatch] = useReducer(reducer, {});

  return (
    <div className = "calculator-container">
      <div className = "screen">
        <div className = "previous">
          {previousString}
        </div>
        <div className = "current">
          {currentString}
        </div>
      </div>
      <button>√</button>
      <button>π</button>
      <button>^</button>
      <button>e</button>
      <button>sin</button>
      <button>cos</button>
      <button>tan</button>
      <button>ln</button>
      <button>AC</button>
      <ParenthesesButton parentheses = "(" dispatch = {dispatch}/>
      <ParenthesesButton parentheses = ")" dispatch = {dispatch}/>
      <OperationButton operation = "÷" dispatch = {dispatch}/>
      <DigitButton digit = "7" dispatch = {dispatch}/>
      <DigitButton digit = "8" dispatch = {dispatch}/>
      <DigitButton digit = "9" dispatch = {dispatch}/>
      <OperationButton operation = "×" dispatch = {dispatch}/>
      <DigitButton digit = "4" dispatch = {dispatch}/>
      <DigitButton digit = "5" dispatch = {dispatch}/>
      <DigitButton digit = "6" dispatch = {dispatch}/>
      <OperationButton operation = "−" dispatch = {dispatch}/>
      <DigitButton digit = "1" dispatch = {dispatch}/>
      <DigitButton digit = "2" dispatch = {dispatch}/>
      <DigitButton digit = "3" dispatch = {dispatch}/>
      <OperationButton operation = "+" dispatch = {dispatch}/>
      <DigitButton digit = "0" dispatch = {dispatch}/>
      <DigitButton digit = "." dispatch = {dispatch}/>
      <button>←</button>
      <EvaluateButton evaluate = "=" dispatch = {dispatch}/>
    </div>
  );
}

export default App;
