import L from 'leaflet';
import { CUSTOM_ICONS } from '../../common/components/map/custom_icons/customIcons';

export const getCustomIcon = (customIconName) => {

  const svg = CUSTOM_ICONS[customIconName]

    return L.divIcon({
      html: svg,
      className: '',
      iconSize: [60,60],
      iconAnchor: [55, 60],
    })
  }