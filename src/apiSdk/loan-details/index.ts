import axios from 'axios';
import queryString from 'query-string';
import { LoanDetailInterface, LoanDetailGetQueryInterface } from 'interfaces/loan-detail';
import { GetQueryInterface } from '../../interfaces';

export const getLoanDetails = async (query?: LoanDetailGetQueryInterface) => {
  const response = await axios.get(`/api/loan-details${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLoanDetail = async (loanDetail: LoanDetailInterface) => {
  const response = await axios.post('/api/loan-details', loanDetail);
  return response.data;
};

export const updateLoanDetailById = async (id: string, loanDetail: LoanDetailInterface) => {
  const response = await axios.put(`/api/loan-details/${id}`, loanDetail);
  return response.data;
};

export const getLoanDetailById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/loan-details/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLoanDetailById = async (id: string) => {
  const response = await axios.delete(`/api/loan-details/${id}`);
  return response.data;
};
