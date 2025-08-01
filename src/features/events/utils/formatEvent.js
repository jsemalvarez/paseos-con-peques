import dayjs from "dayjs"
import { PRICE_EVENTS } from "../../common/utils/constants"


const date = dayjs(new Date()).format('YYYY-MM-DD');
const timeStart = dayjs(new Date()).format('HH:mm');
const timeEnd = dayjs(new Date()).add(2, 'hour').format('HH:mm');

export const formatEvent = ( event ) => {
    return {
        id: event.id,
        title: event.title || "Sin titulo",
        description: event.description ||  "",
        artists: event.artists || "",
        date: event.date || date,
        timeStart: event.timeStart || timeStart,
        timeEnd: event.timeEnd || timeEnd,
        bgColor:event.bgColor || "",
        placeId: event.placeId || null,
        ageRanges: event.ageRanges || [],
        priceType: event.priceType || PRICE_EVENTS[0].id || '',
        tempPlaceName: event.tempPlaceName || null,
        tempPlaceAddress: event.tempPlaceAddress || null,
        tempPlacePhone: event.tempPlacePhone || null,
        tempPlaceWhatsapp: event.tempPlaceWhatsapp || null,
        tempPlacePosition: event.tempPlacePosition || null,    
    }
}