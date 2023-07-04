import axios from 'axios';
import queryString from 'query-string';
import { FinancialStatusInterface, FinancialStatusGetQueryInterface } from 'interfaces/financial-status';
import { GetQueryInterface } from '../../interfaces';

export const getFinancialStatuses = async (query?: FinancialStatusGetQueryInterface) => {
  const response = await axios.get(`/api/financial-statuses${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFinancialStatus = async (financialStatus: FinancialStatusInterface) => {
  const response = await axios.post('/api/financial-statuses', financialStatus);
  return response.data;
};

export const updateFinancialStatusById = async (id: string, financialStatus: FinancialStatusInterface) => {
  const response = await axios.put(`/api/financial-statuses/${id}`, financialStatus);
  return response.data;
};

export const getFinancialStatusById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/financial-statuses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFinancialStatusById = async (id: string) => {
  const response = await axios.delete(`/api/financial-statuses/${id}`);
  return response.data;
};
