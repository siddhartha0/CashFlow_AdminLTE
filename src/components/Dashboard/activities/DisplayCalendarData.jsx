function DisplayCalendarData(props) {
  const { title, amount, start, duration } = props.props;
  console.log(props);
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
        <article className="mb-1 text-capitalize text-md">
          {duration} Basis
        </article>
        Arrival Date : {start.toString()}
      </section>
    </div>
  );
}

export default DisplayCalendarData;
