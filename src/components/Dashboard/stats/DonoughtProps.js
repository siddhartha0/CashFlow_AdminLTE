export default class DounoughtProps {
  value = JSON.parse(localStorage.getItem("dashboard"));

  genLabel() {
    const options = {
      labels: ["Bank", "Wallet"],
    };
    return options;
  }

  genData(overallSelected, currentBankAmount, currentWalletAmount) {
    console.log(overallSelected);
    const series = [
      overallSelected ? this.value.currentBankBalance : currentBankAmount,
      overallSelected ? this.value.currentWalletBalance : currentWalletAmount,
    ];
    return series;
  }
}
