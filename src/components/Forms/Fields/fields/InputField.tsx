import { useField } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { FormLabel } from '../../../../style/components/forms/FormLabel';
import { InputFieldProps } from '../FieldProps';
import { FieldFactory } from './FieldFactory';

export const InputField: React.FC<InputFieldProps> = ({ label, fieldType, ...rest }) => {
  const [field, { error }] = useField(rest);
  return (
    <S.FormControl>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <FieldFactory {...rest} fieldType={fieldType} />
      {error ? <div>error</div> : null}
    </S.FormControl>
  );
};

const S = {
  FormControl: styled.div`
    display: flex;
    flex-direction: column;
  `,
};
