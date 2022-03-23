import { ACTIONS } from './App'

export default function DigitButton({ dispatch, operation }) {
    return (
        <button 
            onClick = {() => dispatch({ type: ACTIONS.OPERATION, payload: { operation }})}
        >
            {operation}
        </button>
    )
}