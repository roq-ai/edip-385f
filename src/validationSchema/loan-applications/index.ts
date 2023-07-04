import * as yup from 'yup';

export const loanApplicationValidationSchema = yup.object().shape({
  application_data: yup.string(),
  business_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
