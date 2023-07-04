import axios from 'axios';
import queryString from 'query-string';
import { FinancialDetailInterface, FinancialDetailGetQueryInterface } from 'interfaces/financial-detail';
import { GetQueryInterface } from '../../interfaces';

export const getFinancialDetails = async (query?: FinancialDetailGetQueryInterface) => {
  const response = await axios.get(`/api/financial-details${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFinancialDetail = async (financialDetail: FinancialDetailInterface) => {
  const response = await axios.post('/api/financial-details', financialDetail);
  return response.data;
};

export const updateFinancialDetailById = async (id: string, financialDetail: FinancialDetailInterface) => {
  const response = await axios.put(`/api/financial-details/${id}`, financialDetail);
  return response.data;
};

export const getFinancialDetailById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/financial-details/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFinancialDetailById = async (id: string) => {
  const response = await axios.delete(`/api/financial-details/${id}`);
  return response.data;
};
