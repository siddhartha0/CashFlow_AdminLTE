import { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import LocalStorageInitData from "../../../behindTheScene/helper/LocalStorageInitData";

export default function BankRank() {
  const { allBankData, userBank } = LocalStorageInitData();

  const [bankDetails, setBankDetails] = useState([]);

  useEffect(() => {
    if (allBankData) {
      let datas = [];
      allBankData?.entities.map((bank) => {
        const data = {
          bankName: bank.bankName,
          accountType: bank.accountAvailable,
          interest: bank.interestRate,
        };

        datas.push(data);
      });
      setBankDetails(datas);
    }
  }, [allBankData]);
  return <BankRankWrapped bankDetails={bankDetails} userBank={userBank} />;
}

class BankRankWrapped extends Component {
  static propTypes = {
    bankDetails: PropTypes.array,
    userBank: PropTypes.array,
  };
  render() {
    const { bankDetails, userBank } = this.props;

    return (
      <main className=" d-flex flex-column">
        <header className="text-md text-bold">
          Current Bank Interest Rate
        </header>

        {userBank &&
          userBank?.map((bank, i) => (
            <div key={bank.id + i} className="mt-2 d-flex mr-4">
              <article>{bank.bankName} : </article>
              <article className="ml-2">{bank.interestRate}</article>
            </div>
          ))}

        <hr />

        <header className="text-md text-bold">
          Top 5 Highest interest bank
        </header>
      </main>
    );
  }
}
