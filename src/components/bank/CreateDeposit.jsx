import { Component, useState } from "react";
import { useSelector } from "react-redux";
import { userDetails } from "../../slices/slice/auth/AuthSlice";
import PropTypes from "prop-types";
import { userbankDetails } from "../../slices/slice/bank/UserBankSlice";

export default function CreateDeposit() {
  const user = useSelector(userDetails);
  const userBanks = useSelector(userbankDetails);

  const [depositTransaction, setDepositTransaction] = useState({
    cashType: "",
    amount: "",
    withdrawalDate: "",
    fromAccountId: "",
    toAccountId: "",
    remarks: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setDepositTransaction({
      ...depositTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const depositDetails = {
      userId: user?.id,
      type: "deposit",
      issuedAt: new Date().toLocaleDateString(),
      cashType: depositTransaction.cashType,
      amount: depositTransaction.amount,
      withdrawalDate: depositTransaction.withdrawalDate,
      fromAccountId: depositTransaction.fromAccountId,
      toAccountId: depositTransaction.toAccountId,
      remarks: depositTransaction.remarks,
    };
    console.log(depositDetails);
    // Handle form submission logic here
  };

  return (
    <CreateDepositWrapped
      handleChange={(e) => handleChange(e)}
      handleSubmit={(e) => handleSubmit(e)}
      depositTransaction={depositTransaction}
      userBanks={userBanks}
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
  };

  render() {
    const { handleChange, handleSubmit, depositTransaction, userBanks } =
      this.props;
    return (
      <div className="container">
        <h2>Create Deposit</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cash Type</label>
            <select
              className="form-control"
              name="cashType"
              value={depositTransaction.cashType}
              onChange={handleChange}
            >
              <option value="">Select Types</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>

          {depositTransaction.cashType === "Cheque" && (
            <div className="form-group">
              <label>Withdrawal Date</label>
              <input
                type="date"
                name="withdrawalDate"
                value={depositTransaction.withdrawalDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          )}

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={depositTransaction.amount}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>From Account ID</label>
            <input
              className="form-control"
              name="fromAccountId"
              value={depositTransaction.fromAccountId}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>To Account ID</label>
            <select
              className="form-control"
              name="toAccountId"
              value={depositTransaction.toAccountId}
              onChange={handleChange}
            >
              <option value="">Select Banks</option>
              {userBanks?.map((value) => (
                <option key={value?.bankName} value={value?.bankId}>
                  {value?.bankName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Remarks</label>
            <textarea
              name="remarks"
              value={depositTransaction.remarks}
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
