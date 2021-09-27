const ComputerServices = {
  getComputers: async () => {
    return await fetch("https://backendresilia-api.herokuapp.com/computers");
  },

  createComputer: async (description) => {
    const Computer = {
      description
    };

    const POST = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify(Computer),
    };

    return await fetch("https://backendresilia-api.herokuapp.com/computers/create", POST);
  },

  getComputerById: async (id)=>{
    const url = "https://backendresilia-api.herokuapp.com/computers/" + id
    const request = await fetch(url)
    const Computer = await request.json()
    return Computer;
  },

  updateComputer: async (description, id)=>{    
    const Computer = {
     description
    };

    const put = {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify(Computer),
    };

    const url = 'https://backendresilia-api.herokuapp.com/computers/' + id;

    const request = await fetch(url, put);
    return await request.json()
  },
};

export default ComputerServices;