import axios, { AxiosInstance } from 'axios';

const meterReadingServiceUrl = 'http://localhost:5245/api/v1/meter-readings';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: meterReadingServiceUrl,
  headers: {
    'Content-Type': 'application/json'
  },
});

export default axiosInstance;