import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createLoanApplication } from 'apiSdk/loan-applications';
import { Error } from 'components/error';
import { loanApplicationValidationSchema } from 'validationSchema/loan-applications';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { BusinessInterface } from 'interfaces/business';
import { UserInterface } from 'interfaces/user';
import { getBusinesses } from 'apiSdk/businesses';
import { getUsers } from 'apiSdk/users';
import { LoanApplicationInterface } from 'interfaces/loan-application';

function LoanApplicationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: LoanApplicationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createLoanApplication(values);
      resetForm();
      router.push('/loan-applications');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<LoanApplicationInterface>({
    initialValues: {
      application_data: '',
      business_id: (router.query.business_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: loanApplicationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Loan Application
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="application_data" mb="4" isInvalid={!!formik.errors?.application_data}>
            <FormLabel>Application Data</FormLabel>
            <Input
              type="text"
              name="application_data"
              value={formik.values?.application_data}
              onChange={formik.handleChange}
            />
            {formik.errors.application_data && <FormErrorMessage>{formik.errors?.application_data}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<BusinessInterface>
            formik={formik}
            name={'business_id'}
            label={'Select Business'}
            placeholder={'Select Business'}
            fetcher={getBusinesses}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'loan_application',
    operation: AccessOperationEnum.CREATE,
  }),
)(LoanApplicationCreatePage);
