import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface FinancialDetailInterface {
  id?: string;
  business_id?: string;
  financial_data?: string;
  created_at?: any;
  updated_at?: any;

  business?: BusinessInterface;
  _count?: {};
}

export interface FinancialDetailGetQueryInterface extends GetQueryInterface {
  id?: string;
  business_id?: string;
  financial_data?: string;
}
