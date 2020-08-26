export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const SET_FAVORITES = "SET_FAVORITES";

export const addToFavoritesAction = (code) => {
    return {
        type: ADD_TO_FAVORITES,
        code
    }
}

export const setFavoritesAction = (favorites) => {
    return {
        type: SET_FAVORITES,
        favorites
    }
}

export const fetchFavoritesAction = (dispatch) => {
    async () => {
        try {
            const myArray = await AsyncStorage.getItem("favorites");
            if (myArray) {
                dispatch(setHistoryAction(JSON.parse(myArray)));
            }
        } catch (error) {
            console.log(error);
        }
    }
}