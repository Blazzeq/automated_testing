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

// Transfer data
export const transferData = {
  selectedOption: '2',
  amount: '150,00',
  title: 'Pizza',
  receiver: 'Chuck Demobankowy',
};

// Top Up data
export const topUpData = {
  amount: '40',
  phoneNumber: '504 xxx xxx',
};

// Errors
export const wrongLoginErrorMessage = 'identyfikator ma min. 8 znaków';
export const wrongPasswordErrorMessage = 'hasło ma min. 8 znaków';

// Messages
export const transferSuccessMessage = `Przelew wykonany!`;
export const topUpSuccessMessage = `Doładowanie wykonane!`;