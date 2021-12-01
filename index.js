const express = require("express");
const path = require("path");
const app = express();

const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");

/**
 * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
 * this library will automatically choose the right client based on the environment.
 */
async function generateMeeting() {
  try {
    const auth = new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/calendar.events",
    });
    const email = {
      end: {
        dateTime: "2021-01-01T04:00:00+08:00",
      },
      start: {
        dateTime: "2021-01-01T03:00:00+08:00",
      },
      attendees: [
        {
          email: "lopez.braian@wipit.net",
        },
        {
          email: "development@wipit.net",
        },
      ],
      summary: "Sample Meeting",
    };
    const calendar = google.calendar({ version: "v3", auth: auth });

    calendar.events.insert(
      {
        calendarId: "primary",
        resource: email,
        sendNotifications: true,
      },
      function (err, event) {
        if (err) {
          console.log(
            "There was an error contacting the Calendar service: " + err
          );
          return;
        }
        console.log("Event created: %s", event);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

const PORT = 3000 || process.env.PORT;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/generate-meeting", (req, res) => {
  const {emailR , emailC} = req.body
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Listen on port: ${PORT}`);
});
