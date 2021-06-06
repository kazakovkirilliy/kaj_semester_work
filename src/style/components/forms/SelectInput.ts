import styled from 'styled-components';
import { colors } from '../../colors';

export const SelectInput = styled.select<{underlined: boolean}>`
    border: none;
    ${props => props.underlined ? `border-bottom: 2px solid ${colors.layoutGrey};` : `border: 1px solid ${colors.layoutGrey}; border-radius: 5px;`}
    outline: none;
    padding: 0.8rem 0.8rem 0.8rem 0;
    background-color: transparent;
    cursor: pointer;
`;