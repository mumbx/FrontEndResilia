 const StudentServices = {
  getStudents: async () => {
    return await fetch("https://backendresilia-api.herokuapp.com/students");
  },

  createStudent: async (name, email, birthDate) => {
    const Student = {
      name,
      email,
      birthDate,
    };

    const POST = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify(Student),
    };

    return await fetch("https://backendresilia-api.herokuapp.com/students/create", POST);
  },

  getStudentById: async (id)=>{
    const url = "https://backendresilia-api.herokuapp.com/students/" + id
    const request = await fetch(url)
    const student = await request.json()
    return student;
  },

  updateStudent: async (name, email, birthdate, id)=>{    
    const Student = {
      name,
      email,
      birthdate,
    };

    const put = {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify(Student),
    };

    const url = 'https://backendresilia-api.herokuapp.com/students/' + id;

    const request = await fetch(url, put);
    return await request.json()
  },
};

export default StudentServices;