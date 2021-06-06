import styled from "styled-components";
import { colors } from "../../colors";
import { DummyButton } from "../DummyButton";

export const ActionButton = styled(DummyButton)`
    background-color: ${colors.lightBlue};
    padding: 0.8rem;
    color: #fff;
    width: max-content;
`;