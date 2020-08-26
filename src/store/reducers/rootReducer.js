import { combineReducers } from "redux";
import historyReducer from "./historyReducer";
import favoritesReducer from "./favoritesReducer";

export default combineReducers(
    {
        history: historyReducer,
        favorites: favoritesReducer
    }
)