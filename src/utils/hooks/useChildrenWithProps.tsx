import React from 'react';

export const useChildrenWithProps = (children, ...rest) => {
  return React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      index,
      ...rest,
    });
  });
};
