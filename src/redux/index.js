import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const initialState = {};
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const store = createStore(
  rootReducer,
  // initialState,
  composeEnhancers(applyMiddleware(...middleware))
  // applyMiddleware(...middleware)
);

export default store;
