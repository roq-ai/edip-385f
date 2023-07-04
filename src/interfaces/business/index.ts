import { FinancialDetailInterface } from 'interfaces/financial-detail';
import { FinancialStatusInterface } from 'interfaces/financial-status';
import { LoanApplicationInterface } from 'interfaces/loan-application';
import { LoanDetailInterface } from 'interfaces/loan-detail';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BusinessInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  financial_detail?: FinancialDetailInterface[];
  financial_status?: FinancialStatusInterface[];
  loan_application?: LoanApplicationInterface[];
  loan_detail?: LoanDetailInterface[];
  user?: UserInterface;
  _count?: {
    financial_detail?: number;
    financial_status?: number;
    loan_application?: number;
    loan_detail?: number;
  };
}

export interface BusinessGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
