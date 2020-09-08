import { AsyncStorage } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'flashcards: notifications'


const createNotification = () => {
    return {
        title: 'Mobile Flashcards App',
        body: '⏰ Hello! It\'s time to study!',
    }
}

export const setLocalNotification = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
        if(data === null){
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
                if(status === 'granted'){
                    Notifications.cancelAllScheduledNotificationsAsync()
                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(18)
                    tomorrow.setMinutes(16)

                    Notifications.scheduleNotificationAsync(
                        createNotification(),
                        {
                            time: tomorrow,
                            repeat: 'day',
                        }
                    )

                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
            })
        }
    })
}

export const clearLocalNotification = () => {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}