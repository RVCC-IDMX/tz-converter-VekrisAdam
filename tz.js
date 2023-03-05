const moment = require('moment-timezone');
const yargs = require('yargs');

moment.tz.setDefault('America/New_York');

const command = yargs.argv._;
const params = yargs.argv;
// eslint-disable-next-line prefer-destructuring
const targetTimezone = command[0];
const formattedTimezone = moment.tz(targetTimezone).format('dddd, MMMM Do YYYY, h:mm:ss a');

if (params.all) {
  console.table(moment.tz.names());
  process.exit(0);
} else if (params.country) {
  console.table(moment.tz.zonesForCountry(params.country, true));
  process.exit(0);
} else if (command.length !== 1) {
  console.error('Usage: node tz <timezone> [--format]');
  process.exit(1);
} else if (!(moment.tz.names().some((timezone) => timezone === command[0]))) {
  console.error('The timezone you have entered is either spelled or formatted incorrectly, or is not recorded in the database. Please try again.');
  process.exit(2);
}

if (params.format) {
  console.log(`The time here is ${moment.tz('America/New_York').format('dddd, MMMM Do YYYY, h:mm:ss a')}`);
  console.log(`The time at the ${targetTimezone} timezone is ${formattedTimezone}`);
} else {
  console.log(`The time here is ${moment().tz('America/New_York').format()}`);
  console.log(`The time at the ${targetTimezone} timezone is ${moment().tz(targetTimezone).format()}`);
}
