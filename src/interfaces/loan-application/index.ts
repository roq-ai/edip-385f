import { BusinessInterface } from 'interfaces/business';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface LoanApplicationInterface {
  id?: string;
  business_id?: string;
  user_id?: string;
  application_data?: string;
  created_at?: any;
  updated_at?: any;

  business?: BusinessInterface;
  user?: UserInterface;
  _count?: {};
}

export interface LoanApplicationGetQueryInterface extends GetQueryInterface {
  id?: string;
  business_id?: string;
  user_id?: string;
  application_data?: string;
}
