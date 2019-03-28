import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

S.CardArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  grid-column: 2 / span 2;
`;

const CardArea = (props) => (
  <S.CardArea>
    {props.children}
  </S.CardArea>
);

export default CardArea;


/*

[0] http://the-echoplex.net/flexyboxes/?fixed-height=on&display=flex&flex-direction=row&flex-wrap=nowrap&justify-content=space-between&align-items=flex-start&align-content=flex-start&order%5B%5D=0&flex-grow%5B%5D=0&flex-shrink%5B%5D=1&flex-basis%5B%5D=auto&align-self%5B%5D=auto&order%5B%5D=0&flex-grow%5B%5D=0&flex-shrink%5B%5D=1&flex-basis%5B%5D=auto&align-self%5B%5D=auto&order%5B%5D=0&flex-grow%5B%5D=0&flex-shrink%5B%5D=1&flex-basis%5B%5D=auto&align-self%5B%5D=auto
    See for full compatibility css

[1] border-box: border and padding are included in height

[2] @media queries

    Definition and Usage

    The @media rule is used in media queries to apply different styles for
    different media types/devices.

    Media queries can be used to check many things, such as:

        width and height of the viewport
        width and height of the device
        orientation (is the tablet/phone in landscape or portrait mode?)
        resolution

    Using media queries are a popular technique for delivering a tailored
    style sheet (responsive web design) to desktops, laptops, tablets, and
    mobile phones.

    You can also use media queries to specify that certain styles are only
    for printed documents or for screen readers (mediatype: print, screen,
      or speech).

    In addition to media types, there are also media features. Media features
    provide more specific details to media queries, by allowing to test for a
    specific feature of the user agent or display device. For example, you can
    apply styles to only those screens that are greater, or smaller, than a
    certain width.

    @media only screen and (min-width: 500px) {
      .wrapper {
        grid-template-columns: 20% auto;
        grid-template-areas:
          'header   header'
          'area  content'
          'sidebar2 sidebar2'
          'footer   footer';
      }
    }

    @media only screen and (min-width: 600px) {
      .wrapper {
        grid-gap: 20px;
        grid-template-columns: 120px auto 120px;
        grid-template-areas:
          'header  header  header'
          'area content sidebar2'
          'footer  footer  footer';
        max-width: 600px;
      }
    */