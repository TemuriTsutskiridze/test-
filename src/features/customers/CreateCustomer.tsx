import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";
import { AppDispatch } from "../../store";

export default function CreateCustomer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  function handleClick() {
    if (!fullName || !nationalId) {
      return;
    }
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div>
      <h2>Create new Customer</h2>
      <div>
        <div>
          <label htmlFor="name">Customer full name</label>
          <input
            id="name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nationalId">National Id</label>
          <input
            id="nationalId"
            type="text"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new Customer</button>
      </div>
    </div>
  );
}
