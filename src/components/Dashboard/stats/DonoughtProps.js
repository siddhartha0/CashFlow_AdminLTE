export default class DounoughtProps {
  genLabel() {
    const options = {
      labels: ["Bank", "Wallet"],
    };
    return options;
  }

  genData(overallSelected, currentBankAmount = 0, currentWalletAmount = 0) {
    const series = [currentBankAmount, currentWalletAmount];
    return series;
  }
}

{
  /* <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4 fixed-width bg-light border p-3"></div> */
}
