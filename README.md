# Keep-Away

PERMISSIONS RE ACCESS TO TIME SERVERS
  pool.ntp.org: https://www.pool.ntp.org/en/use.html
  Network Time Protocol Best Current Practices: https://tools.ietf.org/html/draft-ietf-ntp-bcp-02
  NTP Pool News: https://news.ntppool.org/post/

TO DO
- need a warning when to much text entered.


A table of usernames and passwords (maybe use hash?)

NEW THINGS
debug module
Async module/bluebird module/es6 async await
Return done(end)
Other coding suggestions

COMPONENTS
StandardEntryForm
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
deleteEntry
deleteAllEntries

getAnonymousEntry
postAnonymousEntry
deleteEntry
- always has a delete option on retrieval.

A username
A password
A description
A security level
No username

Tooltips to explain

Use cookies...so user can get any information they’ve locked out auto magically when they open the page.

An option to set security (don’t call it that). As in, cookie-friendly (always shows your answer) or always requires the password, or has a special use password (maybe not this last one). Or password always required.

Simplest encryption scheme you can find.

A table or timeline that shows how far your values are from being accessible.

