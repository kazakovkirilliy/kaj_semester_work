export const layoutConstants = {
  headerHeight: '5.5rem',
  navbarWidth: '8rem',
  subNavWidth: '30rem',
  sidebarWidth: '10rem',
  sidePadding: '2rem',
  paddingTop: '2.5rem'
};

export const layoutDashboard = {
  firstRowHeight: '45vh',
  secondRowHeight: `calc(100vh - 45vh - ${layoutConstants.headerHeight} - ${layoutConstants.paddingTop})`,
  firstColWidth: '45vw',
  secondColWidth: `calc(100vw - 45vw - ${layoutConstants.navbarWidth} - ${layoutConstants.subNavWidth})`,
}

export const devices = {
  extraLarge: '(min-width: 1200px)',
  large: '(max-width: 1200px)',
  medium: '(min-width: 600px) and (max-width: 1024px)',
  small: '(max-width: 600px)',
}