import * as yup from 'yup';

export const financialStatusValidationSchema = yup.object().shape({
  status_data: yup.string(),
  business_id: yup.string().nullable(),
});
