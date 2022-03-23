import { ACTIONS } from './App'

export default function DigitButton({ dispatch, parentheses }) {
    return (
        <button 
            onClick = {() => dispatch({ type: ACTIONS.PARENTHESES, payload: { parentheses }})}
        >
            {parentheses}
        </button>
    )
}