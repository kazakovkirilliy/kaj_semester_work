import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../style/colors';

type Props = {
  onClick: () => void;
  checked: boolean;
} & KeyValueItem;

type KeyValueItem = {
  id: number | string;
  title: number | string;
};

export const MultiSelectOption: React.FC<Props> = ({ title, onClick, checked }) => {
  return (
    <ListItem>
      <SOptionLabel>
        <input readOnly type={'checkbox'} onClick={onClick} checked={checked} />
        {title}
      </SOptionLabel>
    </ListItem>
  );
};

const ListItem = styled.li`
  display: flex;
`;

const SOptionLabel = styled.label`
  user-select: none;
  cursor: pointer;
  padding: 0.8rem;
  width: 100%;
  input[type='checkbox'] {
    margin-right: 1rem;
  }
  &:hover {
    background-color: ${colors.layoutGrey};
  }
`;
