import { combineReducers } from "redux";
import { userStore } from "./user/reducer";
const rootReducer = combineReducers({
  user: userStore.reducer,
});

export default rootReducer;
