const express = require('express');
const { google } = require('googleapis');

const app = express();

const spreadsheetId = '11ZDGfiJXTX0jI-8KIjFoSf2aUJpHQgciKFhbchk-pEc';

app.get('/', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  // Create cleint instance for authorization
  const client = await auth.getClient();

  // Instance for Google Sheets API
  const googleSheets = google.sheets({ version: 'v4', auth: client });

  // get metadata from the spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'September 2021 FFL List!A:Q',
  });

  // Write rows to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: 'September 2021 FFL List!A:Q',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [['Add', 'A', 'New', 'Column', 'To', 'The', 'List']],
    },
  });

  res.send(getRows.data);
});

app.listen(2255, (req, res) => console.log('running on localhost 2255'));
