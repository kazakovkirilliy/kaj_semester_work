import styled from 'styled-components';

export const UnorderedList = styled.ul`
      display: flex;
      align-items: stretch;
      flex: 1;

      li {
        display: flex;
        
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          text-decoration: none;
        }
      }
`;