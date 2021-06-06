import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { DummyButton } from '../style/components/DummyButton';

type Props = {
  phrase: string;
  onClick?: () => void;
  style?: Record<string, string>;
};

const getInitials = (phrase: string): string => {
  const initials = phrase
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .match(/\b(\w)/g)
    ?.join('');
  return initials !== undefined ? initials : '';
};

// s - saturation, l - lightness
// https://medium.com/@pppped/compute-an-arbitrary-color-for-user-avatar-starting-from-his-username-with-javascript-cd0675943b66
const stringToHslColor = (phrase: string, s: number, l: number) => {
  let hash = 0;
  for (let i = 0; i < phrase.length; i++) {
    hash = phrase.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};

export const AbbreviationBox: React.FC<Props> = ({ phrase, style, onClick }) => {
  const initials = useMemo(() => getInitials(phrase), [phrase]);

  return (
    <Link
      onClick={onClick}
      style={{
        backgroundColor: stringToHslColor(phrase, 30, 50),
        ...style,
      }}
    >
      {initials}
    </Link>
  );
};

export const linkStyles = css`
  border-radius: 15%;
  width: 35px;
  height: 35px;
`;

const Link = styled(DummyButton)`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  ${linkStyles}
`;
