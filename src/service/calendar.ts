import * as Calendar from "expo-calendar";
import { Platform } from "react-native";

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === "ios" ? await getDefaultCalendarSource() : { isLocalAccount: true, name: "Expo Calendar" };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: "copodagua",
    color: "blue",
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: "internalCalendarName",
    ownerAccount: "personal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

const addEvent = async () => {
  const startDate = new Date();
  const eventi = await Calendar.createEventAsync("1", {
    startDate: startDate,
    endDate: startDate,
    title: "ola",
    alarms: [{ relativeOffset: 0, method: Calendar.AlarmMethod.ALARM }],
  })
    .then((event) => {
      console.log("success", event);
    })
    .catch((error) => {
      console.log("failure", error);
    });
};
