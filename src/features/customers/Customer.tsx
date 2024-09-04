import { useSelector } from "react-redux";
import { RootState } from "../../store"; // Assuming RootState is defined in the store file

export default function Customer() {
  const customer = useSelector((store: RootState) => store.customer.fullName);
  console.log(customer);
  return <div>Welcome, {customer}</div>;
}
