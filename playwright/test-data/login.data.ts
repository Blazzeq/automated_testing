// Correct user data
export const userData = {
  login: 'tester12',
  password: 'password',
  name: 'Jan Demobankowy',
};

// Wrong user data
export const wrongUserData = {
  login: 'tester',
  password: '123456',
};

// Quick transfer data
export const quickTransferData = {
  selectedOption: '2',
  amount: '150,00',
  title: 'Pizza',
  receiver: 'Chuck Demobankowy',
  expectedMessage() {
    return `Przelew wykonany! ${this.receiver} - ${this.amount}PLN - ${this.title}`;
  },
};

// Transfer data
export const transferData = {
  amount: '222',
  receiver: 'Jan Nowak',
  account: '12 3456 7890 1234 5678 9012 3456',
  expectedMessage() {
    return `Przelew wykonany! ${this.amount},00PLN dla ${this.receiver}`;
  },
};

// Top Up data
export const topUpData = {
  amount: '40',
  phoneNumber: '504 xxx xxx',
  expectedMessage() {
    return `Doładowanie wykonane! ${this.amount},00PLN na numer ${this.phoneNumber}`;
  },
};

// Errors
export const wrongLoginErrorMessage = 'identyfikator ma min. 8 znaków';
export const wrongPasswordErrorMessage = 'hasło ma min. 8 znaków';
