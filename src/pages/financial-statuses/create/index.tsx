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
import { createFinancialStatus } from 'apiSdk/financial-statuses';
import { Error } from 'components/error';
import { financialStatusValidationSchema } from 'validationSchema/financial-statuses';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { BusinessInterface } from 'interfaces/business';
import { getBusinesses } from 'apiSdk/businesses';
import { FinancialStatusInterface } from 'interfaces/financial-status';

function FinancialStatusCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FinancialStatusInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFinancialStatus(values);
      resetForm();
      router.push('/financial-statuses');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FinancialStatusInterface>({
    initialValues: {
      status_data: '',
      business_id: (router.query.business_id as string) ?? null,
    },
    validationSchema: financialStatusValidationSchema,
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
            Create Financial Status
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status_data" mb="4" isInvalid={!!formik.errors?.status_data}>
            <FormLabel>Status Data</FormLabel>
            <Input type="text" name="status_data" value={formik.values?.status_data} onChange={formik.handleChange} />
            {formik.errors.status_data && <FormErrorMessage>{formik.errors?.status_data}</FormErrorMessage>}
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
    entity: 'financial_status',
    operation: AccessOperationEnum.CREATE,
  }),
)(FinancialStatusCreatePage);
