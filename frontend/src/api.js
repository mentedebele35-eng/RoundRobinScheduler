import axios from 'axios';

const API_URL = '/api';

export const simulateRoundRobin = async (processes, quantum) => {
  try {
    const response = await axios.post(`${API_URL}/simulate`, {
      processes,
      quantum
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.status,
      config: error.config
    });
    // Rethrow a more descriptive error if the server provided one
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
