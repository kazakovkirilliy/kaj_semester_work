import React from 'react';
import { Field } from 'formik';
import { SelectFieldProps } from '../FieldProps';
import { SelectInput } from '../../../../style/components/forms/SelectInput';

export const SelectField: React.FC<SelectFieldProps> = ({ children, ...props }) => {
  return (
    <Field as={SelectInput} {...props}>
      {children}
    </Field>
  );
};
