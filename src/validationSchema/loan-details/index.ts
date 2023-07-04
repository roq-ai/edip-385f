import * as yup from 'yup';

export const loanDetailValidationSchema = yup.object().shape({
  loan_data: yup.string(),
  business_id: yup.string().nullable(),
});
