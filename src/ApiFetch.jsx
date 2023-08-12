import { useEffect, useReducer } from "react"

const ACTIONS = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR"
}

// usually action is type and payload
function reducer(state, {type, payload}){
    switch (type){
        case ACTIONS.FETCH_START:
            console.log("ACTIONS.FETCH_Start")
            return {
                isError: false,
                isLoading: true
            }
        case ACTIONS.FETCH_SUCCESS:
            console.log("ACTIONS.FETCH_SUCCESS")
            return {
                //...state,
                data: payload.data,
                isError: false,
                isLoading: false
            }
        case ACTIONS.FETCH_ERROR:
            console.log("ACTIONS.FETCH_ERROR")
            return {
                isError: true,
                isLoading: false
            }
        default:
            return state
    }
}
export function ApiFetch(url, options={}){
    const [state, dispatch] = useReducer(reducer, { 
        isError: false,
        isLoading: true,
    })

    useEffect(()=>{
        dispatch({type: ACTIONS.FETCH_START})
        const controller = new AbortController()

        fetch(url, {signal: controller.signal, ...options}).then(res => {
            if(res.status == 200){
                return res.json()
            }
            return Promise.reject(res)
        }).then(data => {
            dispatch({type: ACTIONS.FETCH_SUCCESS, payload: {data}})
        }).catch(e=>{
            if(e.name === "AbortError") return

            dispatch({type: ACTIONS.FETCH_ERROR})
        })
        return () => {
            controller.abort()
        }
        
    },[url])

    return state
}