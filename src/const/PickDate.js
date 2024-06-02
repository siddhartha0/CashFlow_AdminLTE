import Balance from "../behindTheScene/balance/Balance";

class PickDate {
  monthRange = [];
  cashFlow() {
    const cashflow = new Balance();
    const monthsLabel = cashflow.duration;
    console.log(monthsLabel);
  }
}

new PickDate().cashFlow();
