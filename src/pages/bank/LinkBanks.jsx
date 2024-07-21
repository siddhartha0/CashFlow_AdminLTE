import { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bankDetails } from "../../slices/slice/bank/BankSlice";
import { userDetails } from "../../slices/slice/auth/AuthSlice";
import { useLinkUserBankMutation } from "../../slices/api/bank/UserBankApi";
import PropTypes from "prop-types";
import {
  storeUserBankData,
  userbankDetails,
} from "../../slices/slice/bank/UserBankSlice";
import LoaderSpinner from "../../const/widget_component_model/LoaderSpinner";
import toast, { Toaster } from "react-hot-toast";

function LinkBanks() {
  const details = useSelector(bankDetails);
  const user = useSelector(userDetails);
  const userbank = useSelector(userbankDetails);

  const dispatch = useDispatch();
  const [linkBank, { isLoading }] = useLinkUserBankMutation();
  const [err, setErr] = useState("");
  const [accountTypes, setAccountTypes] = useState();

  const [userProfile, setUserProfile] = useState({
    bankName: "",
    accountId: "",
    accountTypes: "",
  });

  const [interestRate, setInterestRate] = useState();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  useEffect(() => {
    const accountDetails = details?.filter(
      (detail) => detail.bankName === userProfile.bankName
    );
    setAccountTypes(accountDetails[0]?.accountAvailable);
    if (accountDetails) {
      const interestRateIndex = accountDetails[0]?.accountAvailable?.indexOf(
        userProfile.accountTypes
      );

      setInterestRate(accountDetails[0]?.interestRate[interestRateIndex]);
    }
  }, [details, userProfile, userProfile.accountTypes]);

  const handleSubmit = async (e) => {
    let userBanks = [];
    const currentAmount = Math.ceil(Math.random(1) * 1000000);

    e.preventDefault();
    const selectedBank = details.filter(
      (detail) => detail.bankName === userProfile.bankName
    );
    const userData = {
      bankName: userProfile.bankName,
      userId: parseInt(user?.id),
      bankId: parseInt(selectedBank[0].id),
      accountId: userProfile.accountId,
      currentAmount: currentAmount,
      accountType: userProfile.accountTypes,
      interestRate: interestRate,
    };

    if (userbank) {
      userBanks.push(userbank, userData);
    }
    if (!userbank) {
      userBanks.push(userData);
    }

    await linkBank(userData).then((resp) => {
      if (resp.data) {
        dispatch(storeUserBankData(userBanks));
        toast.success("Bank has been linked");
        setUserProfile({
          accountId: "",
          bankName: "",
        });
      }
      if (resp.error) {
        setErr(resp.error);
      }
    });
  };
  return (
    <LinkBankWrapped
      data={details}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      userProfile={userProfile}
      isLoading={isLoading}
      err={err}
      accountTypes={accountTypes}
    />
  );
}

export default LinkBanks;

class LinkBankWrapped extends Component {
  static propTypes = {
    data: PropTypes.array,
    handleSubmit: PropTypes.func,
    handleInputChange: PropTypes.func,
    userProfile: PropTypes.object,
    isLoading: PropTypes.bool,
    err: PropTypes.string,
    accountTypes: PropTypes.array,
  };
  render() {
    const {
      data,
      handleSubmit,
      handleInputChange,
      userProfile,
      isLoading,
      err,
      accountTypes,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Toaster />
        {isLoading && <LoaderSpinner />}
        {err && <div className="alert alert-danger">{err}</div>}

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

        {userProfile.bankName && (
          <div className="form-group">
            <label>Account Types</label>
            <select
              className="form-control"
              name="accountTypes"
              value={userProfile.accountTypes}
              onChange={handleInputChange}
            >
              <option value="">Select Account Types</option>
              {accountTypes?.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Link Bank
        </button>
      </form>
    );
  }
}
