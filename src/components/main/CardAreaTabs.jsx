import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  CardArea,
  TabContainer,
  VerticalScrollbars,
} from 'components';
// import { Scrollbars } from 'react-custom-scrollbars';
import useWindowSize from '@rehooks/window-size';

const S = {};

S.Div = styled.div`
  grid-area: ${props => props.gridArea};
`;

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

function CardAreaTabs(props) {
  const windowSize = useWindowSize();
  const {
    classes,
    entries,
    gridArea,
    refresh,
    theme,
  } = props;

  const [value, setValue] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(windowSize.innerHeight - 147);
  }, [windowSize.innerHeight]);

  const handleChange = (event, v) => setValue(v);

  const handleChangeIndex = index => setValue(index);

  return (
    <S.Div className={classes.root} gridArea={gridArea}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
        >
          <Tab label='Locked' />
          <Tab label='Unlocked' />
          <Tab label='Item Three' />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}>
          <VerticalScrollbars
            autoHide
            autoHideTimeout={650}
            autoHideDuration={300}
            style={{ height }}
          >
            <CardArea
              entries={entries}
              refresh={refresh}
            />
          </VerticalScrollbars>
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <VerticalScrollbars
            autoHide
            autoHideTimeout={650}
            autoHideDuration={300}
            style={{ height }}
          >
            <div></div>
          </VerticalScrollbars>
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <VerticalScrollbars
            autoHide
            autoHideTimeout={650}
            autoHideDuration={300}
            style={{ height }}
          >
            <div></div>
          </VerticalScrollbars>
        </TabContainer>
      </SwipeableViews>
    </S.Div>
  );
}

CardAreaTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  entries: PropTypes.shape({
    locked: PropTypes.array,
    released: PropTypes.array,
  }).isRequired,
  gridArea: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

S.Div.propTypes = {
  gridArea: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(CardAreaTabs);
