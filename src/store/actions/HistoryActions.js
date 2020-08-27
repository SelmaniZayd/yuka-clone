import { AsyncStorage } from "react-native";
import { DELETE_FROM_FAVORITES } from "./FavoritesActions";

export const ADD_TO_HISTORY = "ADD_TO_HISTORY";
export const SET_HISTORY = "SET_HISTORY";
export const DELETE_FROM_HISTORY = "DELETE_FROM_HISTORY";

export const addToHistoryAction = (product) => {
    return {
        type: ADD_TO_HISTORY,
        product
    };
}

export const setHistoryAction = (history) => {
    return {
        type: SET_HISTORY,
        history
    }
}

export const fetchHistoryAction = (dispatch) => {
    asyncStorageGetHistory(dispatch);
}

const asyncStorageGetHistory = async (dispatch) => {
    try {
        const myArray = await AsyncStorage.getItem("history");
        if (myArray) {
            dispatch(setHistoryAction(JSON.parse(myArray)));
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteFromHistoryAction = (code) => {
    return {
        type: DELETE_FROM_HISTORY,
        code
    }
}