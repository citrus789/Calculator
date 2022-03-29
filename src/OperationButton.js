import { ACTIONS } from './functions'

export default function OperationButton({ dispatch, operation }) {
    return (
        <button 
            onClick = {() => dispatch({ type: ACTIONS.OPERATION, payload: { operation }})}
        >
            {operation}
        </button>
    )
}