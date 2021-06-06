import React from 'react';
import { FormFieldProps, InputFieldProps } from '../FieldProps';
import { CheckboxField } from './CheckboxField';
import { StringField } from './StringField';
import { SelectField } from './SelectField';

export const FieldFactory: React.FC<InputFieldProps> = (props) => {
  const Field = React.useMemo(() => {
    let _field: React.FC<FormFieldProps>;
    switch (props.fieldType) {
      case 'string':
        _field = StringField;
        break;
      case 'select':
        _field = SelectField;
        break;
      case 'boolean':
        _field = CheckboxField;
        break;
      default:
        _field = StringField;
    }
    return _field;
  }, [props.fieldType]);

  return <Field {...props} />;
};
