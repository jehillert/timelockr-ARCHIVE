AFTER BASIC IMPLEMENTATION
- MULTIPLE VIEWS
  • “react-router-dom”: “^4.3.1”,

https://react-bootstrap.github.io/components/forms/
look at choose file option
can you populate your database with files as will?

# Keep-Away/Nuh-uh/fuggeddaboutit

STUFF
  • https://www.npmjs.com/package/classnames#usage-with-reactjs
  • DEBUGGING https://blog.risingstack.com/node-js-logging-tutorial/
ANSWERS
  MYSQL ==> CONTEXT MENU QUERIES...
  POSTMAN ==> CODE FOR REQUEST...
BACK END
  • Create User route
  • Verify User route
FRONT END
  • NewUserForm
  • LogInForm
  • EntryForm
  • DatePicker
  • TimePicker
  • TimeBarChart
  • ExtensionButtonBar
  • ReleaseDatesTable
  • HelpButton
REQUIRED FUNCTIONALITY
  • checkReleaseDates();
THOUGHTS/CONSTRAINTS
  • User should not be bugged with calendar if they just want later today. 
  • User does not query. They login and all items for which time has last are displayed
  • Probably can use set-time out to check once a minute, for dynamic refresh
  • Time lines above,lapses secrets in table below? Or it could be a countdown sort of thing (probably not, that breeds anxiety). Think on it.)
  • When user clicks secret, automatically gets pasted, and took tip says ‘copied’
  • Help button will have modal or tooltip that should all instructions for the page
LATER
  • encryption



moment.defaultFormat = "YYYY-DD-MM HH:mm";

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creation_date: new moment(),
      release_date: new moment(),
      secret_label: '',
      secret_body: ''
    };
  }

  render() {
    return (
      <div className='EntryForm'>
        <TimeInput value={'12:00'} onChange={render}/>
      </div>
    )
  }
}
// this.state.release_date.format('HH:mm')
export default EntryForm;
PERMISSIONS RE ACCESS TO TIME SERVERS
  pool.ntp.org: https://www.pool.ntp.org/en/use.html
  Network Time Protocol Best Current Practices: https://tools.ietf.org/html/draft-ietf-ntp-bcp-02
  NTP Pool News: https://news.ntppool.org/post/
  https://timetoolsltd.com/information/public-ntp-server/

TO DO
- need a warning when to much text entered.
- Feature put request - extend deadline before it comes up

A table of usernames and passwords (maybe use hash?)

NEW THINGS
debug module
Async module/bluebird module/es6 async await
Return done(end)
Other coding suggestions

COMPONENT
SStandardEntryForm
- login/new user (if not logged in)
  + username
  + password
  + submit button
- description
- secret
- date/time selector
   radio button or drop down (sometime today/date/date&time
- submit button
AnonymousEntryForm (darker theme)
TimeRemainingChart


ROUTES
getEntries
postEntry
updateEntry
deleteEntry
deleteAllEntries

getAnonymousEntry
postAnonymousEntry
deleteEntry
- always has a delete option on retrieval.

A username
A password
A description
No username

Tooltips to explain

Use cookies...so user can get any information they’ve locked out auto magically when they open the page.

An option to set security (don’t call it that). As in, cookie-friendly (always shows your answer) or always requires the password, or has a special use password (maybe not this last one). Or password always required.

Simplest encryption scheme you can find.

A table or timeline that shows how far your values are from being accessible.

