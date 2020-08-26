import { ADD_TO_HISTORY, SET_HISTORY } from "../actions";
import { AsyncStorage } from 'react-native';

const historyReducer = (state = [], action) => {

    switch (action.type) {
        case ADD_TO_HISTORY:
            const newState = state.slice();
            newState.push(action.code);
            try {
                async () => await AsyncStorage.setItem('history', JSON.stringify(newState));
            } catch (error) {
                console.log(error);
            }
            return newState;
        
        case SET_HISTORY:
            return action.history ? action.history : [];
    
        default:
            return state;
    }
}

export default historyReducer;