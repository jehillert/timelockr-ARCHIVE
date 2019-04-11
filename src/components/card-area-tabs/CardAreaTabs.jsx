import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {
  CardArea,
} from 'components';
import { Scrollbars } from 'react-custom-scrollbars';

const S = {};

S.Div = styled.div`
  grid-area: ${props => props.gridArea};
`;

function TabContainer({ children, dir }) {
  return (
    <Typography component='div' dir={dir} style={{ padding: 4 * 1 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

class CardAreaTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  render() {
    const {
      classes,
      entries,
      gridArea,
      refresh,
      theme,
    } = this.props;

    const { value } = this.state;

    return (
      <S.Div className={classes.root} gridArea={gridArea}>
        <AppBar position='static' color='default'>
          <Tabs
            value={value}
            onChange={this.handleChange}
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
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Scrollbars
              autoHide
              autoHideTimeout={650}
              autoHideDuration={300}
              style={{ height: 1000 }}
            >
              <CardArea
                entries={entries}
                refresh={refresh}
              />
            </Scrollbars>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Scrollbars
              autoHide
              autoHideTimeout={650}
              autoHideDuration={300}
              style={{ height: 1000 }}
            >
              <CardArea
                entries={entries}
                refresh={refresh}
              />
            </Scrollbars>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Scrollbars
              autoHide
              autoHideTimeout={650}
              autoHideDuration={300}
              style={{ height: 1000 }}
            >
              <CardArea
                entries={entries}
                refresh={refresh}
              />
            </Scrollbars>
          </TabContainer>
        </SwipeableViews>
      </S.Div>
    );
  }
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
