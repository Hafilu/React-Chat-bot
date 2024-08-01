import { combineReducers } from "redux";
import { SET_FORM_DATA } from "./action";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  location: "",
};

const formDataReducer = (state = initialFormData, action) => {
  switch (action.type) {
    case SET_FORM_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// Middleware to store Redux state in local storage
export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  return result;
};

const rootReducer = combineReducers({
  formData: formDataReducer,
});

export default rootReducer;
