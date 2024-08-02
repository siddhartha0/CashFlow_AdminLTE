import { useEffect, useState } from "react";
import HeadController from "../../../behindTheScene/helper/HeadController";

function DisplayCalendarData(props) {
  const { title, amount, start, duration, recieved, userbankId } = props.props;
  const [claimDiv, setClaimDiv] = useState(false);
  const { user_Bank_Data } = HeadController();
  const [bank, setBank] = useState();

  useEffect(() => {
    if (user_Bank_Data) {
      const data = user_Bank_Data.filter((data) => data.id === userbankId);
      setBank(data[0]);
    }
    const todayDate = new Date().getDate();
    const todayMonth = new Date().getUTCMonth();
    const todayYear = new Date().getFullYear();

    const eventDate = start.getDate();
    const eventMonth = start.getMonth();
    const eventYear = start.getFullYear();

    if (
      todayDate >= eventDate &&
      todayMonth >= eventMonth &&
      todayYear >= eventYear &&
      !recieved
    ) {
      setClaimDiv(true);
    }

    // console.log(todayDate.toTimeString() - start.toTimeString());
  }, [start, recieved, user_Bank_Data, userbankId]);

  return (
    <div className="d-flex flex-column p-2">
      <header>Selected Event Details</header>
      <section className="d-flex flex-column ">
        <header className="d-flex mt-2 mb-1 text-bold text-lg">
          <article>{title}</article>
          <article className="ml-2" style={{ color: "#11c485" }}>
            Rs. {amount}
          </article>
        </header>
        <article className="mt-2 mb-1 text-capitalize text-md">
          {duration} Basis
        </article>
        <article className="mb-1 text-capitalize text-md">
          Arrival Date : {start.toString().slice(0, 16)}
        </article>
        <article className="mb-1 text-capitalize text-md">
          Linked Bank : {bank?.bankName}
        </article>
      </section>
      {claimDiv && (
        <button className="btn btn-primary w-50 mt-4">Recieved</button>
      )}
    </div>
  );
}

export default DisplayCalendarData;
