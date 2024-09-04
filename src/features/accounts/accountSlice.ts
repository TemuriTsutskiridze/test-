import { Action } from "redux";

const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

interface AccountState {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
}

export interface DepositAction extends Action {
  type: "account/deposit";
  payload: number;
}

interface WithdrawAction extends Action {
  type: "account/withdraw";
  payload: number;
}

interface RequestLoanAction extends Action {
  type: "account/requestLoan";
  payload: {
    amount: number;
    purpose: string;
  };
}

interface ConvertingCurrencyAction extends Action {
  type: "account/convertingCurrency";
}

interface PayLoanAction extends Action {
  type: "account/payLoan";
}

type AccountActions =
  | DepositAction
  | WithdrawAction
  | RequestLoanAction
  | PayLoanAction
  | ConvertingCurrencyAction;

export default function accountReducer(
  state: AccountState = accountInitialState,
  action: AccountActions
) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export function deposit(
  amount: number,
  currency: string
): DepositAction | Promise<void> {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const host = "api.frankfurter.app";
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(amount: number): WithdrawAction {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(
  amount: number,
  purpose: string
): RequestLoanAction {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

export function payLoan(): PayLoanAction {
  return { type: "account/payLoan" };
}
