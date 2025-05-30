import { saveNewData, deleteData, updateData, getEventsOrderByTimeStart } from "../../../app/firebase/firestoreProvider";

const collectionName = "events";

// const eventsByDay = {
//   "2025-04-10": [
//     {
//       id: "1101",
//       date: "2025-04-10",
//       timeStart: "15:00",
//       timeEnd: "18:00",
//       title: "titulo",
//       description: "description",
//       location: "lugar",
//       bgColor:"bg-red-500",
//     },
//   ],
// }

//TODO: renombrar esta funcion a groupEventsByDate 
export const formatEvents = (events) => {
    const eventsByDay = {};

    events.forEach(event => {
        if (!eventsByDay[event.date]) {
          eventsByDay[event.date] = [];
        }
        eventsByDay[event.date].push(event);
      });

    return eventsByDay;
}

export const eventService = {
    saveNewEvent: (newEvent)=> saveNewData(collectionName, newEvent),
    getEvents: ()=> getEventsOrderByTimeStart(collectionName),
    updateEvent: (id, updatedData) => updateData(collectionName, id, updatedData),
    deleteEvent: (id) => deleteData(collectionName, id)
}
