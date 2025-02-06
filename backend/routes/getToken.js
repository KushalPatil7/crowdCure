import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import express from 'express';

// Define the scopes required for the Google Calendar API
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const CREDENTIALS_PATH = path.resolve('../credentials.json');
const TOKEN_PATH = path.resolve('../token.json');

const router = express.Router();

// Load client secrets
fs.readFile(CREDENTIALS_PATH, (err, content) => {
  if (err) return console.error('Error loading client secret file:', err);
  const credentials = JSON.parse(content);
  authorize(credentials);
});

/**
 * Create an OAuth2 client with the given credentials.
 */
function authorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.web; // Ensure this matches your credentials.json structure
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Generate the URL for authorization
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url:', authUrl);

  // Set up the OAuth callback route
  router.get('/oauth2callback', async (req, res) => { // Use a specific route for the callback
    const code = req.query.code; // Extract the code from the query string
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(tokens), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      res.send('Authorization successful! You can close this tab now.');
      createGoogleMeet(oAuth2Client); // Call createGoogleMeet after authorization
    } catch (error) {
      console.error('Error retrieving access token', error);
      res.status(500).send('Error retrieving access token');
    }
  });
}

router.post('/:projectId/schedule-meeting',async(req,res)=>{
  const {startDateTime,endDateTime,attendees,summary,description}=req.body;
  // Use the OAuth2 client to create a Google Meet Event
  try{
   const oAuth2Client=await authorize(credentials);
   await createGoogleMeet(oAuth2Client,{startDateTime,endDateTime, attendees, summary,description});
   res.status(200).json({message:"Meeting Scheduled Successfully"})
  }catch(error){
      console.error('Error scheduling meeting',error);
      res.status(500).json({error:'Failed to schedule meeting'})
  }
})
// Creates a new Google Meet event using the Calendar API.
async function createGoogleMeet(auth,{startDateTime,endDateTime, attendees, summary,description}) {
  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary: summary || 'Project Collaboration Meeting',
    location: 'Google Meet',
    description: description ||'Discuss project status and tasks',
    start: {
      dateTime: startDateTime, // Use appropriate date and time
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime:endDateTime,
      timeZone: 'America/Los_Angeles',
    },
    attendees: [
      { email: attendees.map(email=>({email})) },
      { email: 'attendee2@example.com' },
    ],
    conferenceData: {
      createRequest: {
        requestId: 'sample123',
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };
try{
const eventResponse=await  calendar.events.insert(
    {
      auth: auth,
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1, // Required for creating Google Meet link
    }
  )
  console.log('Event created: %s', event.data.htmlLink);
  return eventResponse.data.htmlLink;
}catch(err){
  console.error('There was an error contacting the Calendar service:', err);
  throw new Error('Error creating Google Meet event');
      
}
  
}

export default router;
