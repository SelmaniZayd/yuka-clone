import { ADD_TO_HISTORY, SET_HISTORY, DELETE_FROM_HISTORY } from "../actions/HistoryActions";
import { AsyncStorage } from 'react-native';

const historyReducer = (state = [], action) => {

    const asyncStorageSetHistory = async (newState) => {
        try {
            await AsyncStorage.setItem('history', JSON.stringify(newState));
        } catch (error) {
            console.log(error);
        }
    }

    switch (action.type) {
        case ADD_TO_HISTORY:
            const newState = state.slice();

            const existAlready = newState.find((value, id) => value.code === action.product.code);

            const currentDate = new Date().getTime();
            const object = { ...action.product, date: currentDate };

            if (existAlready) {
                newState.splice(newState.indexOf(existAlready), 1);
            }

            newState.push(object);

            asyncStorageSetHistory(newState);

            return newState;


        case SET_HISTORY:
            return action.history ? action.history : [];

        case DELETE_FROM_HISTORY:
            const stateClone = state.slice();
            const findProduct = stateClone.find((item, i) => item.code === action.code);

            if (findProduct) {
                stateClone.splice(stateClone.indexOf(findProduct), 1);
            }

            asyncStorageSetHistory(stateClone);

            return stateClone;

        default:
            return state;
    }

}

export default historyReducer;