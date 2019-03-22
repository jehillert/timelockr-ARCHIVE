import { createGlobalStyle } from 'styled-components';

// YOU CAN DEFINE OTHER GLOBAL STYLES AS WELL.

const GlobalStyles = createGlobalStyle`
  body {
    color: #839496;
    background-color: light grey;
    /* font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; */
  }

  .shadow {
    /* offset-x | offset-y | color */
    /* offset-x | offset-y | blur-radius | color */
    /* offset-x | offset-y | blur-radius | spread-radius | color */
    /* inset | offset-x | offset-y | color */
    /* box-shadow: 5px 5px 2px 3px rgba(255, 255, 255, 0.6); */
    box-shadow: 0 0 10px rgba(24,29,39,.1), 0 15px 30px rgba(24,29,39,.1), 0 5px 10px rgba(24,29,39,.05);
  }
`;

export default GlobalStyles;
