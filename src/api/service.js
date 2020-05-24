import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3030/api/v1';
export const Employee = {
  getEmployeeList: async (filters) => {
    try {
      const result = await axios.get('/employee', {
        params: {
          offset: filters.offset,
          limit: filters.limit,
          sortType: filters.sortType,
          sortField: filters.sortField
        }
      });
      return result;
    } catch (error) {
      return error.response.data;
    }
  }
};

export const HumanResource = {
  getHumanResourceList: async (filters) => {
    try {
      const result = await axios.get('/hr', {
        params: {
          offset: filters.offset,
          limit: filters.limit,
          sortType: filters.sortType,
          sortField: filters.sortField
        }
      });
      return result;
    } catch (error) {
      return error.response.data;
    }
  }
};
