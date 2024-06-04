function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const randomDate = Math.random() < 0.5 ? today : yesterday;
  return randomDate.toISOString().split("T")[0];
}

export function generateRandomTransactions(numTransactions) {
  const transactions = [];
  const types = [
    "wallet transfer",
    "cash",
    "online payment",
    "ATM withdrawal",
    "cheque",
  ];
  const status = ["deposit", "withdraw", "transfer"];
  const banks = [
    "Siddhartha",
    "Everest",
    "Nabil",
    "Himalayan",
    "Global",
    "NIC Asia",
  ];
  const remarks = [
    "Update software",
    "Salary",
    "Groceries",
    "Rent payment",
    "Bill payment",
    "Refund",
    "Rent",
    "Allowance",
    "Shopping",
    "Internet payment",
  ];

  for (let i = 1; i <= numTransactions; i++) {
    const transaction = {
      id: i,
      account: getRandomInt(1000000, 9999999).toString(),
      type: getRandomElement(types),
      status: getRandomElement(status),
      bank: getRandomElement(banks),
      amount: getRandomInt(100, 50000),
      remarks: getRandomElement(remarks),
      date: generateRandomDate(),
    };

    transactions.push(transaction);
  }

  return transactions;
}