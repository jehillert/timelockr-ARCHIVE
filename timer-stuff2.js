const moment = require('moment');

const futureDate = '2019-05-01T10:55:00.000Z';
const now = moment();
const later = moment(futureDate);
const duration = moment.duration(later.diff(now));

const printTime = () => {
  duration.subtract(1, 's');
  if (duration.asSeconds() < 0) {
    return console.log('done!')
    // return refresh();
  }
  const timeRemaining = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
  return console.log(timeRemaining);
};

const stopTimer = () => {
  return clearInterval(timer);
}

const timer = setInterval(printTime, 1000);

// ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
// const now = moment();
// const later = moment(futureDate);

// const [duration, setDuration] = useState(moment.duration(later.diff(now)));
