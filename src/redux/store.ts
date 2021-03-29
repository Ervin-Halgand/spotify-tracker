import { createStore, combineReducers } from "redux";
import { userReducer as userLogin } from "./reducer/userReducer";
import { spotifyReducer as spotifyData } from "./reducer/spotifyReducer";

const rootReducer = combineReducers({ userLogin, spotifyData });
export const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
