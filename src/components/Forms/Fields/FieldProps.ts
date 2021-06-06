import { InputHTMLAttributes } from 'react';
import { TimerecordPayload } from '../../../actions/dashboard/timerecord';

export type FormFieldProps =
  | BooleanFieldProps
  | StringFieldProps
  | DropdownSearchFieldProps
  | SelectFieldProps
  | MultiSelectFieldProps;

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  fieldType?: FieldType;
  label?: string;
  name: string;
  readonly?: boolean;
  underlined?: boolean;
};

export type BooleanFieldProps = {
  isToggle?: boolean; // display as toggle switch
  trueLabel?: string; // label if field value is true
  falseLabel?: string; // label if field value is false
} & InputFieldProps;

export type StringFieldProps = {
  long?: boolean;
} & InputFieldProps;

export type DropdownSearchFieldProps = {
  values?: TimerecordPayload;
} & InputFieldProps;

export type SelectFieldProps = InputFieldProps & {
  // FIXME
  // options?: {
  //   value: string;
  //   label: string;
  // }[];
};

export type KeyValueItem = {
  id: number | string;
  title: number | string;
};

export type MultiSelectFieldProps = InputFieldProps & {
  data: KeyValueItem[];
  toggleText: string;
};

export type FieldType =
  | 'string'
  | 'long'
  | 'date'
  | 'boolean'
  | 'select'
  | 'enum'
  | 'file'
  | 'address'
  | 'action'
  | 'dropdown-search';
