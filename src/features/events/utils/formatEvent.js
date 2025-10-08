import dayjs from "dayjs"
import { EVENT_PRICES } from "../../common/utils/constants"


const date = dayjs(new Date()).format('YYYY-MM-DD');
const timeStart = dayjs(new Date()).format('HH:mm');
const timeEnd = dayjs(new Date()).add(2, 'hour').format('HH:mm');
const PAID_TICKET = EVENT_PRICES[0].id;

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
        priceType: event.priceType || PAID_TICKET || '',
        activityTypes: event.activityTypes || [],
        tempPlaceName: event.tempPlaceName || null,
        tempPlaceAddress: event.tempPlaceAddress || null,
        tempPlacePhone: event.tempPlacePhone || null,
        tempPlaceWhatsapp: event.tempPlaceWhatsapp || null,
        tempPlacePosition: event.tempPlacePosition || null,    
        isFeatured: event.isFeatured || false,
        photoId: event.photoId || '',
    }
}