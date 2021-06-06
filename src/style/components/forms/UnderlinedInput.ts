import styled from 'styled-components';
import { colors } from '../../colors';
import { BaseInput } from './BaseInput';

export const UnderlinedInput = styled(BaseInput)`
    border: none;
    border-bottom: 2px solid ${colors.layoutGrey};
    transition: all 200ms;
    outline: none;
    padding: 0.8rem 0 0.2rem;
    width: 100%;
    background-color: transparent;
    border-radius: 0;

    &:focus {
        border-color: ${colors.lightBlue};
    }
`;
