import { AsyncStorage } from "react-native";

export const ADD_TO_HISTORY = "ADD_TO_HISTORY";
export const SET_HISTORY = "SET_HISTORY";

export const addToHistoryAction = (code) => {
    return {
        type: ADD_TO_HISTORY,
        code
    };
}

export const setHistoryAction = (history) => {
    return {
        type: SET_HISTORY,
        history
    }
}

export const fetchHistoryAction = (dispatch) => {
    async () => {
        try {
            const myArray = await AsyncStorage.getItem("history");
            if (myArray) {
                dispatch(setHistoryAction(JSON.parse(myArray)));
            }
        } catch (error) {
            console.log(error);
        }
    }
}