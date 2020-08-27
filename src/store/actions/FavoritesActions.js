import { AsyncStorage } from "react-native";


export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const SET_FAVORITES = "SET_FAVORITES";
export const DELETE_FROM_FAVORITES = "DELETE_FROM_FAVORITES";

export const addToFavoritesAction = (product) => {
    return {
        type: ADD_TO_FAVORITES,
        product
    }
}

export const setFavoritesAction = (favorites) => {
    return {
        type: SET_FAVORITES,
        favorites
    }
}

export const fetchFavoritesAction = (dispatch) => {
    asyncStorageGetFavorites(dispatch);
}

const asyncStorageGetFavorites = async (dispatch) => {
    try {
        const myArray = await AsyncStorage.getItem('favorites');
        if (myArray) {
            dispatch(setFavoritesAction(JSON.parse(myArray)));
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteFromFavoritesAction = (code) => {
    return {
        type: DELETE_FROM_FAVORITES,
        code
    }
} 