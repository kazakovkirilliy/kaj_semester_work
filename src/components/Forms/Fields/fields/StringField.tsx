import React from 'react';
import { Field } from 'formik';
import { BaseInput } from '../../../../style/components/forms/BaseInput';
import { StringFieldProps } from '../FieldProps';
import { UnderlinedInput } from '../../../../style/components/forms/UnderlinedInput';

export const StringField: React.FC<StringFieldProps> = ({ ...props }) => {
  return (
    <Field type="input" {...props} as={props.underlined ? UnderlinedInput : BaseInput} />
  );
};
