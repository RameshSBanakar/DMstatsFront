const initialState = []

const Reducer = (state=initialState,action) => {
    // console.log(action.type)
    // console.log(action.payload)
    switch (action.type) {
        case "DM_FOLDER": {
            return {
                state:action.payload
            }
        }
        default:{
            return state 
        }
    }
}
export default Reducer