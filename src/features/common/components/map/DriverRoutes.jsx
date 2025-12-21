import { Polyline } from 'react-leaflet'
import { useVisualSettings } from '../../../visualSettings/hooks/useVisualSettings'

const polyline = [
  [-38.02852262232492, -57.57258666301147],
  [-38.022971383849395, -57.565883890108324],
  [-38.01461536182581, -57.55912772486166],
  [-38.015630470727075, -57.55713468692097],
  [-38.00448413049247, -57.54817606313085],
  [-38.00548253748707, -57.54613622045856],
  [-38.0060133063344, -57.54518060831704],
  [-38.007497072037765, -57.5421639236831],
  [-38.0067144384993, -57.541518885003725],
]

export const DriverRoutes = () => {

    const limeOptions = { color: '#ff637e', weight: 6 }

    const { isShowRoutes } = useVisualSettings()

    return (      
      (isShowRoutes)
        ? <Polyline pathOptions={limeOptions} positions={polyline} />
        : null        
    )
}
