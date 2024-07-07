import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.css";

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  // Mock data for deposit, withdraw, and transfer history
  const data = [
    {
      id: 7,
      userId: 4,
      type: "transfer",
      cashType: "cash",
      amount: 30000,
      fromAccountId: 1,
      toAccountId: 2,
      issuedAt: "2023-02-03T22:13:59.000Z",
      remarks: "Electronics",
      createdAt: "2024-07-02T05:42:33.630Z",
      updatedAt: "2024-07-02T06:58:12.086Z",
    },
    // Add more events as needed
  ];

  // Function to format the date as YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return [year, month, day].join("-");
  };

  // Function to filter events by date
  const eventsByDate = data.reduce((acc, event) => {
    const date = formatDate(new Date(event.issuedAt));
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});

  // Get the transactions for the selected date
  const transactions = eventsByDate[formatDate(value)] || [];

  // Function to determine if a date has transactions and return summary
  const getTileContent = (date) => {
    const formattedDate = formatDate(date);
    if (eventsByDate[formattedDate]) {
      return (
        <div className="events">
          {eventsByDate[formattedDate].map((event, index) => (
            <div key={index} className={`event ${event.type}`}>
              {event.type === "deposit"
                ? "D: "
                : event.type === "withdraw"
                ? "W: "
                : "T: "}
              {event.amount}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleDateClick = (date) => {
    setValue(date);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="calendar-page container">
      <h1 className="my-4">Transaction History</h1>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateClick}
          value={value}
          tileContent={({ date, view }) =>
            view === "month" ? getTileContent(date) : null
          }
        />
      </div>

      {/* Modal */}
      <div
        className={`modal ${showModal ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Transactions on {formatDate(value)}
              </h5>
              <button
                type="button"
                className="close"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {transactions.length === 0 ? (
                <p>No transactions</p>
              ) : (
                <ul className="list-group">
                  {transactions.map((transaction, index) => (
                    <li
                      key={index}
                      className={`list-group-item ${transaction.type}`}
                    >
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                      : ${transaction.amount}
                      <br />
                      Remarks: {transaction.remarks}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
