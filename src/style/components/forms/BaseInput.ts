import styled from 'styled-components';
import { colors } from '../../colors';

export const BaseInput = styled.input`
    border: 1px solid ${colors.layoutGrey};
    background-color: transparent;
    transition: all 200ms;
    outline: none;
    padding: 0.8rem 0 0.8rem 0.8rem;
    border-radius: 0.5rem;
    width: auto;

    &:focus {
        outline-color: ${colors.lightBlue};
    }
`;
