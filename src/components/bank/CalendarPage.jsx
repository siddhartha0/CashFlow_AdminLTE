import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useGetAllTransactionQuery } from "../../slices/api/transaction/TransactionApi";
import "./CalendarPage.css";
import { useNavigate } from "react-router-dom";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDateTransactions, setSelectedDateTransactions] = useState([]);
  const [upcomingTransactions, setUpcomingTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetAllTransactionQuery();

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const transformedEvents = data?.entities.map((item) => ({
        id: item.id,
        title: `${item.remarks}`,
        start: new Date(item.issuedAt),
        className: item.type === "withdraw" ? "bg-danger" : "bg-warning",
      }));

      const upcomingTrans = data.entities.filter(
        (item) => new Date(item.issuedAt) > new Date()
      );

      // console.log("Monthly: ", monthly);

      setEvents(transformedEvents);
      setUpcomingTransactions(upcomingTrans);
    }
  }, [isLoading, isError, data]);

  const handleDateClick = (info) => {
    const clickedDate = info.date;
    setSelectedDate(clickedDate);

    const filteredTransactions = data.entities.filter(
      (transaction) =>
        new Date(transaction.issuedAt).toDateString() ===
        clickedDate.toDateString()
    );
    setSelectedDateTransactions(filteredTransactions);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return [year, month, day].join("-");
  };

  const handleAddTransaction = () => {
    navigate(`/dashboard/bank/deposit/new?date=${selectedDate.toISOString()}`);
  };

  return (
    <>
      <div className="custom-card container-fluid">
        <div className="row">
          <div className="col-md-9">
            <div className="calendar-container mb-5">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                displayEventTime={false}
                eventClassNames={({ event }) => event.className}
                dateClick={handleDateClick}
              />
            </div>
          </div>
          <div className="col-md-3 mt-4">
            <h4>Upcoming Transactions</h4>
            {upcomingTransactions.length === 0 ? (
              <p>No upcoming transactions</p>
            ) : (
              <ul className="list-group">
                {upcomingTransactions.map((transaction, index) => (
                  <li
                    key={index}
                    className={`list-group-item ${transaction.type}`}
                  >
                    {transaction.remarks} -{" "}
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                    <br />
                    Amount: ${transaction.amount}
                    <br />
                    Date: {new Date(transaction.issuedAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Transactions on {selectedDate ? formatDate(selectedDate) : ""}
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
              {selectedDateTransactions.length === 0 ? (
                <p>No transactions</p>
              ) : (
                <ul className="list-group">
                  {selectedDateTransactions.map((transaction, index) => (
                    <li
                      key={index}
                      className={`list-group-item ${transaction.type}`}
                    >
                      {transaction.remarks} -{" "}
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                      <br />
                      Amount: ${transaction.amount}
                      <br />
                      Date:{" "}
                      {new Date(transaction.issuedAt).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleAddTransaction}
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
