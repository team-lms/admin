import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3030/api/v1';
export const Employee = {
  /**
   * Get Employee List
   */
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
  },

  /**
   * Create Employee
   */
  createAEmployee: async (employee) => {
    try {
      const result = await axios.post('/employee', { ...employee });
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

export const Supervisor = {
  getSupervisorList: async (filters) => {
    try {
      const result = await axios.get('/supervisor', {
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

export const Teams = {
  getTeamList: async (filters) => {
    try {
      const result = await axios.get('/team', {
        params: {
          offset: filters.offset,
          limit: filters.limit,
          sortField: filters.sortField,
          sortType: filters.sortType
        }
      });
      return result;
    } catch (error) {
      return error.response.data;
    }
  },

  createTeam: async (team) => {
    try {
      const result = await axios.post('/team', { ...team });
      return result;
    } catch (error) {
      return error.response.data;
    }
  }
};

export const CountryList = {
  getCountryList: async () => {
    try {
      const result = await axios.get('https://restcountries.eu/rest/v2/all?fields=name;callingCodes;demonym');
      return result;
    } catch (error) {
      return error.response;
    }
  }
};
