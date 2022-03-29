import { ACTIONS } from './functions'

export default function ClearButton({ dispatch, evaluate }) {
    return (
        <button 
            onClick = {() => dispatch({ type: ACTIONS.CLEAR, payload: { evaluate }})}
        >
            {evaluate}
        </button>
    )
}