/* eslint-disable prefer-const */
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {
  AndroidNotificationPriority,
  AndroidNotificationVisibility,
  cancelAllScheduledNotificationsAsync,
  getAllScheduledNotificationsAsync,
} from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

export async function schedulePushNotification(acorda: number, dormi: number) {
  if (!acorda || !dormi) return;
  let arrayNotifications = [];
  const pushExist = await getAllScheduledNotificationsAsync();
  //await cancelAllScheduledNotificationsAsync()
  if (pushExist.length == 0) {
    for (let index = acorda; index < dormi; index++) arrayNotifications.push(index);
    arrayNotifications.forEach(async (value) => {
      await execultTimeIntervalNotification(value);
    });
  } else {
    //console.log(pushExist);
  }
}

async function execultTimeIntervalNotification(value) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hora de se hidratar",
      body: "conclua sua meta!",
      priority: AndroidNotificationPriority.HIGH,
      vibrate: [0, 250, 250, 250],
    },
    trigger: {
      hour: value,
      minute: 0,
      repeats: true,
    },
  });
}

export async function logNextTriggerDate() {
  try {
    const nextTriggerDate = await Notifications.getNextTriggerDateAsync({
      hour: 0,
      minute: 1,
    });
    console.log(nextTriggerDate === null ? "No next trigger date" : new Date(nextTriggerDate));
  } catch (e) {
    console.warn(`Couldn't have calculated next trigger date: ${e}`);
  }
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.warn("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.warn("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      showBadge: true,
    });
  }

  return token;
}
