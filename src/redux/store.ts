import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { followingReducer as following } from "./reducer/followingReducer";
import { recommandationReducer as recommandation } from "./reducer/recommandationReducer";
import { topArtistReducer as topArtist } from "./reducer/topArtistReducer";
import { topTrackReducer as topTrack } from "./reducer/topTrackReducer";
import { userInfoReducer as userInfo } from "./reducer/userInfoReducer";
import { userLoginReducer as userLogin } from "./reducer/userLoginReducer";
import thunk from "redux-thunk";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const spotifyData = combineReducers({
  following,
  recommandation,
  topArtist,
  topTrack,
  userInfo,
});

const rootReducer = combineReducers({ userLogin, spotifyData });
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
