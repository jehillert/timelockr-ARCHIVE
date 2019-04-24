// https://jamie.build/styled-theming.html
// npm install styled-theming --save
// import theme from 'styled-theming';
// theme(name, values)
// theme.variants(name, prop, themes)
// theme('size', { normal: ..., compact: ... });
// <ThemeProvider theme={{ mode: 'dark', size: 'compact' }}>


const defaultTheme = {
  // color
  accentColor: '#D93646',
  backgroundColor: 'white',
  backgroundHoverColor: '#D93646',
  backgroundBorderHoverColor: '#D93646',
  primaryFontColor: 'white',
  primaryColor: '#6A6A6A',
  secondaryFontColor: '#839496',
  secondaryColor: '#202020',
  // margin
  insideFacingMargin: '0.25rem',
  outsideFacingMargin: '0.25rem',
  cornerButtonRightMargin: '-0.25',
  cornerButtonTopMargin: '-0.25rem',
  // radius
  backgroundBorderRadius: '0rem',
  modalBorderRadius: '0rem',
  tabBorderRadius: '0rem',
  // shadow
  boxShadowToLeft: '-10px 0px 5px rgba(24,29,39,.1)',
  boxShadowToRight: '10px 0px 45px rgba(24,29,39,.1)',
  boxShadow: `0 0 100px rgba(24,29,39,.1),
              0 15px 30px rgba(24,29,39,.1),
              0 5px 10px rgba(24,29,39,.05)`,
  // icons (https://google.github.io/material-design-icons/)

};

export default defaultTheme;
