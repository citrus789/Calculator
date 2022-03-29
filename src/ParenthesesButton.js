import { ACTIONS } from './functions'

export default function ParenthesesButton({ dispatch, parentheses }) {
    return (
        <button 
            onClick = {() => dispatch({ type: ACTIONS.PARENTHESES, payload: { parentheses }})}
        >
            {parentheses}
        </button>
    )
}