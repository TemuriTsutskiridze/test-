import { useSelector } from "react-redux";
import "./App.css";
import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import { RootState } from "./store";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";

function App() {
  const fullName = useSelector((state: RootState) => state.customer.fullName);

  return (
    <>
      {fullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <BalanceDisplay />
          <AccountOperations />
        </>
      )}
    </>
  );
}

export default App;
