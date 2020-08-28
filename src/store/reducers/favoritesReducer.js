import { ADD_TO_FAVORITES, DELETE_FROM_FAVORITES, SET_FAVORITES } from "../actions/FavoritesActions";
import { AsyncStorage } from 'react-native';

const favoritesReducer = (state = [], action) => {


    const asyncStorageSetFavorites = async (newState) => {
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(newState));
        } catch (error) {
            console.log(error);
        }
    }

    switch (action.type) {
        case ADD_TO_FAVORITES:
            const newState = state.slice();
            const existAlready = newState.find((value, id) => value.code === action.product.code);
            if (existAlready) {
                return newState;
            }
            newState.push(action.product);
            
            asyncStorageSetFavorites(newState);

            return newState;

        case SET_FAVORITES:
            return action.favorites ? action.favorites : [];

        case DELETE_FROM_FAVORITES:
            const stateClone = state.slice();
            const findProduct = stateClone.find((item, i) => item.code === action.code);

            if (findProduct) {
                stateClone.splice(stateClone.indexOf(findProduct), 1);
            }

            asyncStorageSetFavorites(stateClone);

            return stateClone;

        default:
            return state;
    }
}

export default favoritesReducer;