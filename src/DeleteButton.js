import { ACTIONS } from './functions'

export default function DeleteButton({ dispatch, evaluate }) {
    return (
        <button 
            onClick = {() => dispatch({ type: ACTIONS.DELETE, payload: { evaluate }})}
        >
            {evaluate}
        </button>
    )
}