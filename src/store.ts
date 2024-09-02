import { createStore, combineReducers } from "redux";
import accountReducer from "./features/accounts/AccountSlice";
import custumerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: custumerReducer,
});

const store = createStore(rootReducer);

export default store;
