import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { deposit } from "./features/accounts/AccountSlice";
import store from "./store.ts";
import { createCustomer } from "./features/customers/customerSlice.ts";

// import "./store-v1.ts";

store.dispatch(deposit(1000000));

store.dispatch(createCustomer("Temo", "1234567890"));

console.log(store.getState());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
