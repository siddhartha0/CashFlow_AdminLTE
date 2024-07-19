import { Component, useState } from "react";
import { useSelector } from "react-redux";
import { userDetails } from "../../slices/slice/auth/AuthSlice";
import PropTypes from "prop-types";
import { userbankDetails } from "../../slices/slice/bank/UserBankSlice";
import { useCreateTransactionMutation } from "../../slices/api/transaction/TransactionApi";
import LoaderSpinner from "../../const/widget_component_model/LoaderSpinner";
import toast, { Toaster } from "react-hot-toast";
import formatDate from "../../behindTheScene/helper/DateFormatter";

export default function CreateDeposit() {
  const user = useSelector(userDetails);
  const userBanks = useSelector(userbankDetails);
  const [createDeposit, { isLoading }] = useCreateTransactionMutation();

  console.log(userBanks);

  const [depositTransaction, setDepositTransaction] = useState({
    cashType: "",
    chequeIssueDate: "",
    chequeCashoutDate: "",
    chequeCashoutAvailableData: "",
    amount: "",
    toAccountId: "",
    source: "",
  });

  const [checkDepost, setCheckDeposit] = useState({
    chequeIssueDate_isToday: "",
    checkCashoutDate_isToday: false,
    checkCashoutAvailableDate_isToday: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setDepositTransaction({
      ...depositTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setCheckDeposit({
      ...checkDepost,
      [name]: checked,
    });
  };

  function cashTypeisCheque() {
    let chequeAlert = false;
    depositTransaction.cashType === "cheque"
      ? (chequeAlert = true)
      : (chequeAlert = false);

    return chequeAlert;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();

    const depositDetails = {
      userId: user?.id,
      type: "deposit",
      issuedAt: formatDate(currentDate),
      cashType: depositTransaction.cashType,

      chequeIssueDate: cashTypeisCheque()
        ? checkDepost.chequeIssueDate_isToday
          ? formatDate(currentDate)
          : depositTransaction.chequeIssueDate
        : null,

      chequeCashoutDate: cashTypeisCheque()
        ? checkDepost.checkCashoutDate_isToday
          ? formatDate(currentDate)
          : depositTransaction.chequeCashoutDate
        : null,

      chequeCashoutAvailableData: cashTypeisCheque()
        ? checkDepost.checkCashoutAvailableDate_isToday
          ? formatDate(currentDate)
          : depositTransaction.chequeCashoutAvailableData
        : null,

      amount: depositTransaction.amount,
      toBankAccountId: parseInt(depositTransaction.toAccountId),
      source: depositTransaction.source,
      alert: depositTransaction.cashType === "cheque" ? true : false,
    };
    console.log(depositDetails);
    await createDeposit(depositDetails).then((resp) => {
      if (resp.error) {
        console.log(resp?.error);
        if (resp?.error?.status === "FETCH_ERROR") {
          toast.error("There is some issue in the server. Please wait!!!");
        }
        if (resp?.error?.status !== "FETCH_ERROR")
          toast.error(resp?.error?.data?.message);
      }
      if (resp.data) {
        toast.success("Succesfully created!!!");
      }
    });
  };

  return (
    <CreateDepositWrapped
      handleChange={(e) => handleChange(e)}
      handleSubmit={(e) => handleSubmit(e)}
      depositTransaction={depositTransaction}
      userBanks={userBanks}
      handleCheck={handleCheck}
      checkDepost={checkDepost}
      isLoading={isLoading}
    />
  );
}

class CreateDepositWrapped extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    depositTransaction: PropTypes.object,
    userBanks: PropTypes.object,
    handleCheck: PropTypes.func,
    checkDepost: PropTypes.object,
    isLoading: PropTypes.bool,
  };

  render() {
    const {
      handleChange,
      handleSubmit,
      depositTransaction,
      userBanks,
      handleCheck,
      checkDepost,
      isLoading,
    } = this.props;
    return (
      <div className="container">
        <Toaster />
        {isLoading && <LoaderSpinner />}
        <h2>Create Deposit</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cash Type</label>
            <select
              className="form-control"
              name="cashType"
              value={depositTransaction.cashType}
              onChange={handleChange}
              required
            >
              <option value="">Select Types</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>

          {depositTransaction.cashType === "cheque" && (
            <div className="input-group mb-4 mt-4">
              <label className="form-text text-bold">Cheque Issued date</label>
              <div className="checkbox form-check-inline">
                <input
                  type="checkbox"
                  id="checkbox"
                  name="chequeIssueDate_isToday"
                  checked={checkDepost.chequeIssueDate_isToday}
                  onChange={handleCheck}
                />
                <label htmlFor="checkbox">Today</label>
              </div>
              {!checkDepost.chequeIssueDate_isToday && (
                <input
                  type="date"
                  className="form-control col-3 ml-2"
                  id="input_from"
                  placeholder="Start Date"
                  name="chequeIssueDate"
                  value={depositTransaction.chequeIssueDate}
                  onChange={handleChange}
                />
              )}
            </div>
          )}

          {depositTransaction.cashType === "cheque" && (
            <div className="input-group mb-4 mt-4">
              <label className="form-text text-bold">
                Cheque cashout available date
              </label>
              <div className="checkbox form-check-inline">
                <input
                  type="checkbox"
                  id="checkCashoutAvailableDate_isToday"
                  name="checkCashoutAvailableDate_isToday"
                  checked={checkDepost.checkCashoutAvailableDate_isToday}
                  onChange={handleCheck}
                />
                <label htmlFor="checkCashoutAvailableDate_isToday">Today</label>
              </div>
              {!checkDepost.checkCashoutAvailableDate_isToday && (
                <input
                  type="date"
                  className="form-control col-3 ml-2"
                  id="input_from"
                  placeholder="Start Date"
                  name="chequeCashoutAvailableData"
                  value={depositTransaction.chequeCashoutAvailableData}
                  onChange={handleChange}
                />
              )}
            </div>
          )}

          {depositTransaction.cashType === "cheque" && (
            <div className="input-group mb-4 mt-4">
              <label className="form-text text-bold">Cheque cashout date</label>
              <div className="checkbox form-check-inline">
                <input
                  type="checkbox"
                  id="checkCashoutDate_isToday"
                  name="checkCashoutDate_isToday"
                  checked={checkDepost.checkCashoutDate_isToday}
                  onChange={handleCheck}
                />
                <label htmlFor="checkCashoutDate_isToday">Today</label>
              </div>
              {!checkDepost.checkCashoutDate_isToday && (
                <input
                  type="date"
                  className="form-control col-3 ml-2"
                  id="input_from"
                  placeholder="Start Date"
                  name="chequeCashoutDate"
                  value={depositTransaction.chequeCashoutDate}
                  onChange={handleChange}
                />
              )}
            </div>
          )}

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              required
              name="amount"
              value={depositTransaction.amount}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>To Account ID</label>
            <select
              className="form-control"
              name="toAccountId"
              value={depositTransaction.toAccountId}
              onChange={handleChange}
              required
            >
              <option value="">Select Banks</option>
              {userBanks?.map((value) => (
                <option key={value?.bankName} value={value?.id}>
                  {value?.bankName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Source</label>
            <textarea
              name="source"
              required
              value={depositTransaction.source}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
