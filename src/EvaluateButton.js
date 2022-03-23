import { ACTIONS } from './App'

export default function DigitButton({ dispatch, evaluate }) {
    return (
        <button 
            onClick = {() => dispatch({ type: ACTIONS.EVALUATE, payload: { evaluate }})}
        >
            {evaluate}
        </button>
    )
}