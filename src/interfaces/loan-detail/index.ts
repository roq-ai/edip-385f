import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface LoanDetailInterface {
  id?: string;
  business_id?: string;
  loan_data?: string;
  created_at?: any;
  updated_at?: any;

  business?: BusinessInterface;
  _count?: {};
}

export interface LoanDetailGetQueryInterface extends GetQueryInterface {
  id?: string;
  business_id?: string;
  loan_data?: string;
}
