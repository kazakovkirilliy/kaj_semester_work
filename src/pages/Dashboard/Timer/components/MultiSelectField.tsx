import { FieldArray } from 'formik';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { HiTag } from 'react-icons/hi';
import { Tag } from '../../../../actions/dashboard/tag';
import { Popup } from '../../../../style/components/Popup';
import useOutsideClickHandler from '../../../../utils/hooks/useOutsideClickHandler';
import { KeyValueItem, MultiSelectFieldProps } from '../../../../components/Forms/Fields/FieldProps';
import { MultiSelectOption } from './MultiSelectOption';
import { colors } from '../../../../style/colors';
import { FormLabel } from '../../../../style/components/forms/FormLabel';

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  data,
  children,
  toggleText,
  label,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClickHandler(wrapperRef, () => setVisible(false));

  const renderOptions = ({ push, remove, form }) => {
    if (!data) return;
    return data.map((option: KeyValueItem) => {
      let index = form.values.tags.findIndex((el: Tag) => el.id === option.id);
      return (
        <MultiSelectOption
          key={option.id}
          id={option.id}
          title={option.title}
          checked={index !== -1}
          onClick={() => {
            if (index === -1) {
              push(option);
            } else {
              remove(index);
            }
          }}
        />
      );
    });
  };

  return (
    <FieldArray
      {...rest}
      render={(arrayHelpers) => (
        <Wrapper ref={wrapperRef}>
          {label && <FormLabel>{label}</FormLabel>}
          <ToggleText type={'button'} onClick={() => setVisible((prev) => !prev)}>
            <HiTag />
            {toggleText}
          </ToggleText>
          <Popup isVisible={visible}>
            <ul>{renderOptions(arrayHelpers)}</ul>
          </Popup>
        </Wrapper>
      )}
    />
  );
};

const Wrapper = styled.div``;
const ToggleText = styled.a`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  background-color: ${colors.layoutGrey};
  border-radius: 0.5rem;

  > svg:first-of-type {
    margin-right: 0.5rem;
  }
`;
