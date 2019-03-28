// FUNCTION THEMES
//
// You can also pass a function for the theme prop.
// This function will receive the parent theme,
// that is from another <ThemeProvider> higher up
// tree. This way themes themselves can the be made
// contextual.
//
// This example renders our above themed Button and
// a second one that uses a second ThemeProvider to
// invert the background and foreground colors. The
// function invertTheme receives the upper theme and
// creates a new one.


// Define our button, but with the use
// of props.theme this time.
const Button = styled.button`
  color: ${props => props.theme.fg};
  border: 2px solid ${props => props.theme.fg};
  background: ${props => props.theme.bg};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

// Define our `fg` and `bg` on the theme
const theme = {
  fg: 'palevioletred',
  bg: 'white'
};

// This theme swaps `fg` and `bg`
const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg
});

render(
  <ThemeProvider theme={theme}>
    <div>
      <Button>Default Theme</Button>

      <ThemeProvider theme={invertTheme}>
        <Button>Inverted Theme</Button>
      </ThemeProvider>
    </div>
  </ThemeProvider>
);

// GETTING THE THEME WITHOUT STYLED COMPONENTS
//
// If you ever need to use the current theme outside
// styled components (e.g. inside big components),
// you can use the withTheme higher order component.

import { withTheme } from 'styled-components';

class MyComponent extends React.Component {
  render() {
    console.log('Current theme: ', this.props.theme);
    // ...
  }
}

export default withTheme(MyComponent);


// THE 'theme' PROP
//
// A theme can also be passed down to a component using
// the theme prop. This is useful to circumvent a missing
// a missing ThemeProvider or to override it.

Define our button

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  // Color the border and text with theme.main
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

// Define what main theme will look like
const theme = {
  main: 'mediumseagreen'
};

render(
  <div>
    <Button theme={{ main: 'royalblue' }}>Ad hoc theme</Button>
    <ThemeProvider theme={theme}>
      <div>
        <Button>Themed</Button>
        <Button theme={{ main: 'darkorange' }}>Overidden</Button>
      </div>
    </ThemeProvider>
  </div>
);

// DEFINE THEME IN CLASS

export default class SignupForm extends React.Component {

  constructor(props) {
    super(props);

    this.theme = {
      secondaryColor: 'white',
      primaryColor: '#282828',
      borderColor: '#ccc',
    };

    if (props.dark) {
      this.theme.secondaryColor = '#282828';
      this.theme.primaryColor = '#fff';
    }
  }

  /* ... */

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <Form onSubmit={this.signUp}>
          <Title>
            Sign up to my newsletter
          </Title>
          <Input type='email' name='email' />
          <Button>Sign up</Button>
        </Form>
      </ThemeProvider>
    );
  }
}