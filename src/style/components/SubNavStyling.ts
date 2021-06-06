import styled from 'styled-components';
import { layoutConstants } from '../layoutConstants';

const SubNavStyling = {
   Header: styled.section`
    display: flex;
    flex-grow: 1;
    align-items: center;
    padding: 2rem ${layoutConstants.sidePadding};
  `,
  Title: styled.h1`
    font-size: 2rem;
    font-weight: 700;
  `,
  
}
export default SubNavStyling;