import styled from 'styled-components';
import { Form } from 'formik';

export const SForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  margin: 0 5rem;
  overflow-y: auto;

  > div {
    margin-top: 1rem;
  }

  button {
    margin-top: 2.5rem;
  }
`;

export const LoadingPlaceholderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-self: center;
  & > div {
    width: 100px;
    height: auto;
  }
`;
