import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'flashcards: notifications';
const CHANNEL_ID = 'DailyReminder';


const createNotification = () => {
    return {
        title: 'Mobile Flashcards App',
        body: '⏰ Hello! It\'s time to study!',
        ios: {
            sound: true,
        },
        android: {
            channelId: CHANNEL_ID,
            sticky: false,
            color: 'red',
        },
    }
}

const createChannel = () => {
    return {
        name: 'Daily reminder',
        description: 'Daily mobile flashcards reminder.',
        sound: true,
        priority: 'high',
    };
}

export const setLocalNotification = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
              .then(() => {
                Notifications.cancelAllScheduledNotificationsAsync();

                const tomorrow = new Date();

                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(20);
                tomorrow.setMinutes(25);

                // to setup notification now uncomment lines below and comment lines for tomorrow above
                // let now = new Date()
                // now.setDate(now.getDate())
                // now.setSeconds(now.getSeconds() + 7)

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    // time: now,
                    repeat: 'day'
                  }
                );

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              })
              .catch(err => {
                console.log('err', err);
              });
          }
        });
      }
    });
}

export const clearLocalNotification = () => {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}