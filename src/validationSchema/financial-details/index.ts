import * as yup from 'yup';

export const financialDetailValidationSchema = yup.object().shape({
  financial_data: yup.string(),
  business_id: yup.string().nullable(),
});
