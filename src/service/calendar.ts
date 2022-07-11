import * as Calendar from "expo-calendar";
import { Platform } from "react-native";
import { useAutenticacaoContext } from "../contexts/autenticacao";

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

export async function deleteAllAgenda() {
  let agendaEscolhida: any = [];
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  calendars.filter((e) => e.title === "copodagua");
  agendaEscolhida = calendars.filter((e) => e.title === "copodagua");
  agendaEscolhida.forEach(async (e) => await Calendar.deleteCalendarAsync(e.id + ""));
}

export async function createCalendar(acorda, dormi) {
  let agendaEscolhida: any = [];
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status === "granted") {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    agendaEscolhida = calendars.filter((e) => e.title === "copodagua");
  }

  if (agendaEscolhida.length === 0) {
    const defaultCalendarSource: any =
      Platform.OS === "ios" ? await getDefaultCalendarSource() : { isLocalAccount: true, name: "copodagua" };
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
    await addEvent(newCalendarID, acorda, dormi);
    return false;
  }
}

const addEvent = async (id, acorda, dormi) => {
  const arrayNotifications = [];
  const cont = 0;
  for (let index = new Date().getHours(); index < dormi; index++) arrayNotifications.push(index);
  await arrayNotifications.forEach(async (value, index) => {
    const startDate = new Date(Date.now() + 60 * 60 * (1000 * index));
    await Calendar.createEventAsync(id + "", {
      startDate: startDate,
      endDate: startDate,
      title: "Mantenha-se hidratado",
      alarms: [{ relativeOffset: 0, method: Calendar.AlarmMethod.ALARM }],
    })
      .then((event) => {
        console.log("success", event);
      })
      .catch((error) => {
        console.log("failure", error);
      });
  });
  await Calendar.createEventAsync(id + "", {
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    title: "Agenda ativada",
    alarms: [{ relativeOffset: 0, method: Calendar.AlarmMethod.ALERT }],
  })
    .then((event) => {
      console.log("success", event);
    })
    .catch((error) => {
      console.log("failure", error);
    });
};
