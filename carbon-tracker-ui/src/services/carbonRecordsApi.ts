    // src/services/api.ts
import axios from 'axios';


import { CarbonRecord } from '../features/carbon/types';

const API_URL = 'https://localhost:7097/api/carbonrecords';

interface PagedResponse<T> {
    data: T[];
    total: number;
  }
  
  export const getCarbonRecords = (page: number, pageSize: number) =>
    axios.get<PagedResponse<CarbonRecord>>(API_URL, {
      params: { page, pageSize },
    });
  
  
  
export const getCarbonRecord = (id: number) => axios.get<CarbonRecord>(`${API_URL}/${id}`);
export const createCarbonRecord = (data: CarbonRecord) => axios.post(API_URL, data);
export const updateCarbonRecord = (id: number, data: CarbonRecord) => axios.put(`${API_URL}/${id}`, data);
export const deleteCarbonRecord = (id: number) => axios.delete(`${API_URL}/${id}`);
export const getCarbonRecordById = (id: number) =>  axios.get<CarbonRecord>(`${API_URL}/${id}`);

