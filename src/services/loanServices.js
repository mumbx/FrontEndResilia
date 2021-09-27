const LoanServices = {
  getLoans: async () => {
    return await fetch("https://backendresilia-api.herokuapp.com/loans");
  },

  getAvaliableComputers: async () => {
     const request = await fetch("https://backendresilia-api.herokuapp.com/loans/availableComputers");
     return await request.json()    
     
  },

  createLoan: async (loanDate, returnDate, computerId, studentId) => {
    const Loans = {
      loanDate,
      returnDate,
      computerId,
      studentId,
    };

    const POST = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify(Loans),
    };

    return await fetch("https://backendresilia-api.herokuapp.com/loans/create", POST);
  },

  getLoanById: async (id) => {
    const url = "https://backendresilia-api.herokuapp.com/loans/" + id;
    const request = await fetch(url);
    const Loan = await request.json();
    return Loan;
  },

  updateLoan: async (loanDate, returnDate, computerId, studentId, id) => {
    const Loans = {
      loanDate,
      returnDate,
      computerId,
      studentId,
    };

    const put = {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify(Loans),
    };

    const url = "https://backendresilia-api.herokuapp.com/loans/" + id;

    const request = await fetch(url, put);
    return await request.json();
  },
};

export default LoanServices;
