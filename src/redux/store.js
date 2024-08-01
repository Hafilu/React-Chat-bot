import rootReducer, { localStorageMiddleware } from './reducer';
 
import { createStore, applyMiddleware } from "redux";
 
 
// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

 
const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(localStorageMiddleware));

export default store;
