import React from 'react';

interface PersonIconProps {
  firstName?: string;
  lastName?: string;
  color: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const PersonIcon: React.FC<PersonIconProps> = ({
  firstName,
  lastName,
  color,
  onClick,
}) => {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: 15,
        padding: 5,
        color: 'white',
        width: 31,
        height: 31,
        textAlign: 'center',
        marginRight: 3,
        cursor: onClick ? 'pointer' : 'initial',
      }}
      onClick={onClick}
    >
      {firstName?.[0]}
      {lastName?.[0]}
    </div>
  );
};
