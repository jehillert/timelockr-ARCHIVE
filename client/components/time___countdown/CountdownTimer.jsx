import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import styled from 'styled-components';

momentDurationFormatSetup(moment);

const S = {};

S.CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.CircularProgress = styled.div`
  stroke-dasharray: 151px;
  stroke-dashoffset: 0px;
  stroke-linecap: butt;
  stroke-width: 4px;
  stroke: #fd4f57;
  fill: none;

  svg {
    width: 10rem;
    height: 10rem;
    transform: rotateZ(-90deg);

    @keyframes countdown-animation {
      from {
        stroke-dashoffset: 0px;
      }
      to {
        stroke-dashoffset: 151px;
      }
    }
  }
`;

S.CountdownText = styled.div`
  z-index: 1;
  text-align: center;
  text-anchor: middle;
`;

function CountdownTimer(props) {
  const { futureDate, refresh } = props;
  const now = moment();
  const later = moment(futureDate);

  const [duration, setDuration] = useState(moment.duration(later.diff(now)));
  const [open, setOpen] = useState(false);
  const [seconds, setFraction] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  const formatDisplayTime = () => {
    let tr;
    if (duration.asSeconds() < 0) {
      refresh();
    }
    if (duration.years()) {
      tr = duration.format('y [years], M [months], d [days]', {
        trim: 'all',
      });
    } else if (duration.months()) {
      tr = duration.format('M [months], d [days], h [hours]', {
        trim: 'all',
      });
    } else if (duration.days()) {
      tr = duration.format('d [days], h [hours], m [min]', {
        trim: 'all',
      });
    } else {
      tr = duration.format('hh:mm:ss', {
        trim: false,
      });
    }
    setTimeRemaining(tr);
    console.log(timeRemaining);
  };

  const incrementTime = () => {
    setDuration(() => duration.subtract(1, 's'));
    setFraction(duration.asSeconds());
    formatDisplayTime();
  };

  useEffect(() => {
    let timer = 0;

    formatDisplayTime();
    if (duration.asHours() <= 24) {
      timer = setInterval(incrementTime, 1000);
    }

    setOpen(true);

    return function cleanup() {
      if (timer) {
        clearInterval(timer);
      }
      setOpen(false);
    };
  }, []);

  return (
    <S.CountdownContainer>
      {open && (
        <>
          <S.CircularProgress>
            <svg>
              <circle
                r='24'
                cx='26'
                cy='26'
                style={{
                  animation: `countdown-animation ${duration.asSeconds()}s linear`,
                }}
              />
            </svg>
          </S.CircularProgress>
          <S.CountdownText>
            {timeRemaining}
          </S.CountdownText>
        </>
      )}
    </S.CountdownContainer>
  );
}

CountdownTimer.propTypes = {
  futureDate: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default CountdownTimer;
