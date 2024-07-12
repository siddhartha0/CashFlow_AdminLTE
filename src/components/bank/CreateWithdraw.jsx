import { Component, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { userbankDetails } from "../../slices/slice/bank/UserBankSlice";
import { userDetails } from "../../slices/slice/auth/AuthSlice";
import PropTypes from "prop-types";
import { useCreateTransactionMutation } from "../../slices/api/transaction/TransactionApi";
import LoaderSpinner from "../../const/widget_component_model/LoaderSpinner";
import formatDate from "../../behindTheScene/helper/DateFormatter";

export default function CreateWithdraw() {
  const user = useSelector(userDetails);
  const userBanks = useSelector(userbankDetails);
  const [CreateWithdraw, { isLoading }] = useCreateTransactionMutation();

  const [withdrawTransaction, setWithdrawTransaction] = useState({
    cashType: "",
    chequeIssueDate: "",
    chequeCashoutDate: "",
    chequeCashoutAvailableData: "",
    amount: "",
    fromAccountId: "",
    remarks: "",
  });

  const [checkDepost, setCheckDeposit] = useState({
    chequeIssueDate_isToday: "",
    checkCashoutDate_isToday: false,
    checkCashoutAvailableDate_isToday: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setWithdrawTransaction({
      ...withdrawTransaction,
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
    withdrawTransaction.cashType === "cheque"
      ? (chequeAlert = true)
      : (chequeAlert = false);

    return chequeAlert;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();

    const withdrawDetails = {
      userId: user?.id,
      type: "withdraw",
      issuedAt: formatDate(currentDate),
      cashType: withdrawTransaction.cashType,

      chequeIssueDate: cashTypeisCheque()
        ? checkDepost.chequeIssueDate_isToday
          ? formatDate(currentDate)
          : withdrawTransaction.chequeIssueDate
        : null,

      chequeCashoutDate: cashTypeisCheque()
        ? checkDepost.checkCashoutDate_isToday
          ? formatDate(currentDate)
          : withdrawTransaction.chequeCashoutDate
        : null,

      chequeCashoutAvailableData: cashTypeisCheque()
        ? checkDepost.checkCashoutAvailableDate_isToday
          ? formatDate(currentDate)
          : withdrawTransaction.chequeCashoutAvailableData
        : null,

      amount: withdrawTransaction.amount,
      fromBankAccountId: parseInt(withdrawTransaction.fromAccountId),
      remarks: withdrawTransaction.remarks,
      alert: withdrawTransaction.cashType === "cheque" ? true : false,
    };
    console.log(withdrawDetails);
    await CreateWithdraw(withdrawDetails).then((resp) => {
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
    <CreateWithdrawWrapped
      handleChange={(e) => handleChange(e)}
      handleSubmit={(e) => handleSubmit(e)}
      withdrawTransaction={withdrawTransaction}
      userBanks={userBanks}
      handleCheck={handleCheck}
      checkDepost={checkDepost}
      isLoading={isLoading}
    />
  );
}

class CreateWithdrawWrapped extends Component {
  static propTypes = {
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    withdrawTransaction: PropTypes.object,
    userBanks: PropTypes.object,
    handleCheck: PropTypes.func,
    checkDepost: PropTypes.object,
    isLoading: PropTypes.bool,
  };

  render() {
    const {
      handleChange,
      handleSubmit,
      withdrawTransaction,
      userBanks,
      handleCheck,
      checkDepost,
      isLoading,
    } = this.props;

    return (
      <div className="container">
        <Toaster />
        {isLoading && <LoaderSpinner />}
        <h2>Create Withdraw</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cash Type</label>
            <select
              className="form-control"
              name="cashType"
              value={withdrawTransaction.cashType}
              onChange={handleChange}
              required
            >
              <option value="">Select Types</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>

          {withdrawTransaction.cashType === "cheque" && (
            <div className="input-group mb-4 mt-4">
              <label className="form-text text-bold">Cheque Issued date</label>
              <div className="checkbox form-check-inline">
                <input
                  type="checkbox"
                  id="checkbox1"
                  name="chequeIssueDate_isToday"
                  checked={checkDepost.chequeIssueDate_isToday}
                  onChange={handleCheck}
                />
                <label htmlFor="checkbox1">Today</label>
              </div>
              {!checkDepost.chequeIssueDate_isToday && (
                <input
                  type="date"
                  className="form-control col-3 ml-2"
                  id="input_from"
                  placeholder="Start Date"
                  name="chequeIssueDate"
                  value={withdrawTransaction.chequeIssueDate}
                  onChange={handleChange}
                />
              )}
            </div>
          )}

          {withdrawTransaction.cashType === "cheque" && (
            <div className="input-group mb-4 mt-4">
              <label className="form-text text-bold">
                Cheque cashout available date
              </label>
              <div className="checkbox form-check-inline">
                <input
                  type="checkbox"
                  id="checkbox2"
                  name="checkCashoutAvailableDate_isToday"
                  checked={checkDepost.checkCashoutAvailableDate_isToday}
                  onChange={handleCheck}
                />
                <label htmlFor="checkbox2">Today</label>
              </div>
              {!checkDepost.checkCashoutAvailableDate_isToday && (
                <input
                  type="date"
                  className="form-control col-3 ml-2"
                  id="input_from"
                  placeholder="Start Date"
                  name="chequeCashoutAvailableData"
                  value={withdrawTransaction.chequeCashoutAvailableData}
                  onChange={handleChange}
                />
              )}
            </div>
          )}

          {withdrawTransaction.cashType === "cheque" && (
            <div className="input-group mb-4 mt-4">
              <label className="form-text text-bold">Cheque cashout date</label>
              <div className="checkbox form-check-inline">
                <input
                  type="checkbox"
                  id="checkbox3"
                  name="checkCashoutDate_isToday"
                  checked={checkDepost.checkCashoutDate_isToday}
                  onChange={handleCheck}
                />
                <label htmlFor="checkbox3">Today</label>
              </div>
              {!checkDepost.checkCashoutDate_isToday && (
                <input
                  type="date"
                  className="form-control col-3 ml-2"
                  id="input_from"
                  placeholder="Start Date"
                  name="chequeCashoutDate"
                  value={withdrawTransaction.chequeCashoutDate}
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
              value={withdrawTransaction.amount}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>From Account ID</label>
            <select
              className="form-control"
              name="fromAccountId"
              value={withdrawTransaction.fromAccountId}
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
            <label>Remarks</label>
            <textarea
              name="remarks"
              required
              value={withdrawTransaction.remarks}
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
