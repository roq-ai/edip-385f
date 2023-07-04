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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getFinancialStatusById, updateFinancialStatusById } from 'apiSdk/financial-statuses';
import { Error } from 'components/error';
import { financialStatusValidationSchema } from 'validationSchema/financial-statuses';
import { FinancialStatusInterface } from 'interfaces/financial-status';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { BusinessInterface } from 'interfaces/business';
import { getBusinesses } from 'apiSdk/businesses';

function FinancialStatusEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<FinancialStatusInterface>(
    () => (id ? `/financial-statuses/${id}` : null),
    () => getFinancialStatusById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FinancialStatusInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFinancialStatusById(id, values);
      mutate(updated);
      resetForm();
      router.push('/financial-statuses');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<FinancialStatusInterface>({
    initialValues: data,
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
            Edit Financial Status
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(FinancialStatusEditPage);
