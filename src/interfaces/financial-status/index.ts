import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface FinancialStatusInterface {
  id?: string;
  business_id?: string;
  status_data?: string;
  created_at?: any;
  updated_at?: any;

  business?: BusinessInterface;
  _count?: {};
}

export interface FinancialStatusGetQueryInterface extends GetQueryInterface {
  id?: string;
  business_id?: string;
  status_data?: string;
}
