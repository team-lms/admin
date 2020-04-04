const axios = require('axios').default;

axios.default.baseURL = process.env.REACT_BASE_URL;

const Employee = {
  getEmployeeList: async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/employee');
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
};

module.exports = {
  Employee
};
