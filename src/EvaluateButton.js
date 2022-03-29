import { ACTIONS } from './functions'

export default function EvaluateButton({ dispatch, evaluate }) {
    return (
        <button 
            onClick = {() => dispatch({ type: ACTIONS.EVALUATE, payload: { evaluate }})}
        >
            {evaluate}
        </button>
    )
}