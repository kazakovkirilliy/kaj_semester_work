import { Field } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { BooleanFieldProps } from '../FieldProps';

export const CheckboxField: React.FC<BooleanFieldProps> = ({ isToggle, ...props }) => {
  return (
    <>
      {isToggle ? (
        <>
          <S.ToggleLabel>
            <Field type="checkbox" />
          </S.ToggleLabel>
        </>
      ) : (
        <Field type="checkbox" {...props} />
      )}
    </>
  );
};

const S = {
  ToggleLabel: styled.label``,
};
