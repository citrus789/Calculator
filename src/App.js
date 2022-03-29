import './App.css';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import EvaluateButton from './EvaluateButton';
import ParenthesesButton from './ParenthesesButton';
import DeleteButton from './DeleteButton';
import ClearButton from './ClearButton';
import { useReducer } from 'react';
import { reducer } from './functions';


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
      <ClearButton evaluate = "AC" dispatch = {dispatch}/>
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
      <DeleteButton evaluate = "←" dispatch = {dispatch}/>
      <EvaluateButton evaluate = "=" dispatch = {dispatch}/>
    </div>
  );
}

export default App;
