import { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bankDetails } from "../../slices/slice/bank/BankSlice";
import { userDetails } from "../../slices/slice/auth/AuthSlice";

function LinkBanks() {
  const details = useSelector(bankDetails);
  const user = useSelector(userDetails);

  const [userProfile, setUserProfile] = useState({
    bankName: "",
    accountId: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = async (e) => {
    const currentAmount = Math.ceil(Math.random(1) * 1000000);

    e.preventDefault();
    const selectedBank = details.filter(
      (detail) => detail.bankName === userProfile.bankName
    );
    const userData = {
      bankName: userProfile.bankName,
      userId: user?.id,
      bankId: selectedBank[0].id,
      accountId: userProfile.accountId,
      currentAmount: currentAmount,
      transactionHistory: "",
    };
    console.log(userData);
  };
  return (
    <LinkBankWrapped
      data={details}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      userProfile={userProfile}
    />
  );
}

export default LinkBanks;

class LinkBankWrapped extends Component {
  render() {
    const { data, handleSubmit, handleInputChange, userProfile } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Bank Name</label>
          <select
            className="form-control"
            name="bankName"
            value={userProfile.bankName}
            onChange={handleInputChange}
          >
            <option value="">Select Banks</option>
            {data?.map((value) => (
              <option key={value.bankName}>{value.bankName}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Account ID</label>
          <input
            type="text"
            className="form-control"
            name="accountId"
            value={userProfile.accountId}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Link Bank
        </button>
      </form>
    );
  }
}
