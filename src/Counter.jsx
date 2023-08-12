import { useReducer } from "react"
import "./App.css"
const ACTIONS = {
    DECREMENT : "DECREMENT",
    INCREMENT : "INCREMENT",
    RESET : "RESET",
    PLUS_FIVE : "PLUS_FIVE",
}

function reducer(state, action) {
    switch (action.type){
      case ACTIONS.DECREMENT:
        return state-1
      case ACTIONS.INCREMENT:
        return state+1
      case ACTIONS.RESET:
        return 0
      case ACTIONS.PLUS_FIVE:
        return state+5
      default:
        return state
    }
}

export function Counter({initialCount = 0}){
    const [state, dispatch] = useReducer(reducer, initialCount)
    return (
        <div className="App">
        <button onClick={()=>dispatch({type: ACTIONS.DECREMENT})}>-</button>
        {state}
        <button onClick={()=>dispatch({type: ACTIONS.INCREMENT})}>+</button>
        <button onClick={()=>dispatch({type: ACTIONS.RESET})}>Reset</button>
        <button onClick={()=>dispatch({type: ACTIONS.PLUS_FIVE})}>+5</button>
        </div>
    )
}