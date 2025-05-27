import dayjs from "dayjs"


export const formatEvent = ( event ) => {
    return {
        id: event.id,
        title: event.title || "Sin titulo",
        description: event.description ||  "",
        artists: event.artists || "",
        date: event.date || dayjs(new Date()).format('YYYY-MM-DD'),
        timeStart: event.timeStart || dayjs(new Date()).format('HH:mm'),
        timeEnd: event.timeEnd || dayjs(new Date()).add(2, 'hour').format('HH:mm'),
        bgColor:event.bgColor || "",
        placeId: event.placeId || null,
        ageRanges: event.ageRanges || []
    }
}