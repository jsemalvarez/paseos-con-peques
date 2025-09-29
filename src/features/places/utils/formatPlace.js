

export const formatPlace = (place) => {
    return {
        id: place.id,
        name: place.name || 'Sin Nombre',
        address: place.address ||  'Sin Dirección',
        isPlaceAvtive: place.isPlaceAvtive || false,
        isShowInMap: place.isShowInMap || false,
        hasCustomIcon: place.hasCustomIcon || false,
        customIconName: place.customIconName || '',
        position: place.position || { lat: 0, lng: 0},
        schedules: place.schedules || '',
        phone: place.phone || '',
        whatsapp: place.whatsapp || '',
        photoUrl: place.photoUrl || '',
        web: place.web || '',
        instagram: place.instagram || '',
        facebook: place.facebook || '',
        videoLink: place.videoLink || '',
        hasFood: place.hasFood || false,
        hasShow: place.hasShow || false,
        hasGames: place.hasGames || false,
        hasSupervision: place.hasSupervision || false,
        categories: place.categories || [],
        ageRanges: place.ageRanges || [],
        description: place.description || 'Sin Descripción',
        iconType: place.iconType || '',
        bgColor: place.bgColor || '',
    }
}