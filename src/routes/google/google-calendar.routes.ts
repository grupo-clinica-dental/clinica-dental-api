// 1er paso importar express router

import dayjs from "dayjs";
import { Router, Request, Response, NextFunction } from "express";
import { google } from "googleapis";

// 2do paso crear un nuevo router

const router = Router();

const calendar = google.calendar({
  version: "v3",
  auth: "AIzaSyAdGww6LpBg-pM1gI4zdxf-uFISvQLOhT0", // API KEY
});

const auth2Client = new google.auth.OAuth2(
  /// client ID, CLIENT SECRET, REDIRECTURL
  // ENV VARIALBES
  "2790401802-39c3m188lv8frhkjopi8qt7699elects.apps.googleusercontent.com",
  "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",
  "http://localhost:4500/api/v1/google/redirect"
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = ["https://www.googleapis.com/auth/calendar"];

// declaramos rutas

router.get(
  "/google",
  async (req: Request, res: Response, next: NextFunction) => {
    const url = auth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });

    res.redirect(url);
  }
);

router.get("/google/redirect", async (req: Request, res: Response) => {
  const code = req.query.code as string;

  const { tokens } = await auth2Client.getToken(code);

  auth2Client.setCredentials(tokens);

  res.send({
    message: "You have succesfully logged in",
  });
});

router.get("/schedule_event", async (req: Request, res: Response) => {
  const result = await calendar.events.insert({
    calendarId: "primary",
    auth: auth2Client,
    requestBody: {
      summary: "This is a test event for api",
      description: "Some event from the api important",
      start: {
        dateTime: dayjs(new Date()).add(1, "day").toISOString(),
        timeZone: "America/El_Salvador",
      },
      end: {
        dateTime: dayjs(new Date()).add(2, "day").toISOString(),
        timeZone: "America/El_Salvador",
      },
    },
  });

  res.send({
    message: "Done",
  });
});

router.get("/calendars", async (req: Request, res: Response) => {
  const params = {
    calendarId: "primary",
    auth: auth2Client,
  };

  const events = await calendar.events.list(params);
  console.log(events);

  const result = await calendar.calendars.get(params);
  console.log(`The blog url is ${result.data.description}`);

  res.send({
    message: "Getting calendars and EVENTS",
    result,
    events,
  });
});

// exportamos el router

export default router;

// este router lo usamos enn app.use() en el index
