# Public Apple API references

Verified against official documentation, 2026-11-09:

- EventKit (calendar/reminders scope): https://developer.apple.com/documentation/eventkit
- Access and purpose strings: https://developer.apple.com/documentation/eventkit/accessing-the-event-store
- Reminder retrieval and stable identifiers: https://developer.apple.com/documentation/eventkit/retrieving-events-and-reminders
- Location alarms: https://developer.apple.com/documentation/eventkit/ekalarm/structuredlocation
- Contacts: https://developer.apple.com/documentation/contacts
- PhotoKit: https://developer.apple.com/documentation/photokit
- remindctl upstream: https://github.com/openclaw/remindctl

Use EKReminder + EKAlarm.structuredLocation + EKAlarm.proximity for a location reminder. The location uses a center and radius, not administrative boundary geometry. Use the actual Apple geocoder/map result; record source and verify the selected branch.

EventKit authorization and device Location Services/notifications are separate. Reminder full access requires system authorization; calendar access does not grant it. Readback of persisted alarm settings does not establish the phone has synchronized or delivered the alert.

Do not adopt upstream advice to use osascript to trigger permissions. Do not adopt private ReminderKit/database implementations merely because a third-party CLI exposes more fields. Check the installed implementation, not only its name or upstream documentation.
