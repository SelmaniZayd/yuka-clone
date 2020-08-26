import { ADD_TO_FAVORITES } from "../actions/FavoritesActions";
import { AsyncStorage } from 'react-native';

const favoritesReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_FAVORITES:
            const newState = state.slice();
            console.log("Add to favorites");
            newState.push(action.code);
            try {
                async () => await AsyncStorage.setItem('favorites', JSON.stringify(newState));
            } catch (error) {
                console.log(error);
            }
            return newState;
    
        default:
            return state;
    }
}

export default favoritesReducer;