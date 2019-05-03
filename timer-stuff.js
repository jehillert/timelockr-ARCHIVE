const moment = require('moment');
const momentDurationFormatSetup = require('moment-duration-format');

momentDurationFormatSetup(moment);

const futureDate = '2020-06-05T12:21:00.000Z';
const now = moment();
const later = moment(futureDate);
const duration = moment.duration(later.diff(now));

const printTime = () => {
  duration.subtract(1, 's');

  let timeRemaining = '';

  if (duration.asSeconds() < 0) {
    return console.log('done!')
    // return refresh();
  }

  if (duration.years()) {
    timeRemaining = duration.format('y [years], M [months], d [days]', {
      trim: 'all'
    });
  } else if (duration.months()) {
    timeRemaining = duration.format('M [months], d [days], h [hours]', {
      trim: 'all'
    });
  } else if (duration.days()) {
    timeRemaining = duration.format('d [days], h [hours], m [min]', {
      trim: 'all'
    });
  } else {
    timeRemaining = duration.format('hh:mm:ss', {
      trim: false
    });
  }
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

// ∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙∙
//   if (y >= 2) {
//     timeRemaining = `${y} years, ${mo} months, ${rDays} days`;
//   } else if (y === 1) {
//     timeRemaining = `1 year, ${mo} months, ${rDays} days`;
//   } else if (mo > 1) {
//     timeRemaining = `${mo} months, ${d} days, ${rHours} hours`;
//   } else if (mo === 1) {
//     timeRemaining = `1 month, ${d} days, ${rHours} hours`;
//   } else if (d > 1) {
//     timeRemaining = `${d} days, ${h} hours, ${rMinutes} minutes`;
//   } else if (d === 1) {
//     timeRemaining = `1 day, ${h} hours, ${rMinutes} minutes`;
//   } else if (h > 1) {
//     timeRemaining = `${h} hours, ${min} minutes, ${s} seconds`;
//   } else if (h === 1) {
//     timeRemaining = `1 hour, ${min} minutes, ${s} seconds`;
//   } else if (min > 1) {
//     timeRemaining = `${min} minutes, ${s} seconds`;
//   } else if (min === 1) {
//     timeRemaining = `1 minute, ${s} seconds`;
//   } else if (s > 1) {
//     timeRemaining = `${s} seconds`;
//   } else if (s === 1) {
//     timeRemaining = `1 second`;
//   }
