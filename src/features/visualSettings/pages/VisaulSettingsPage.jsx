import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { CustomToggle } from '../../common/components/form/CustomToggle'
import { useVisualSettings } from '../hooks/useVisualSettings'


export const VisualSettingsPage = () => {

    const {
        isShowBuses,
        isShowRoutes,
        saveShowBuses,
        saveShowRoutes
    } = useVisualSettings()

    const handleShowBuses = () => {
        saveShowBuses(!isShowBuses)
    }

    const handleShowRoutes = () => {
        saveShowRoutes(!isShowRoutes)
    }
    
    return (
        <PrivateLoyout>
            <div className='min-h-9/10'>
                <div className='w-9/10 max-w-[1200px] mx-auto flex flex-col justify-center items-center gap-4 px-4 py-16 bg-primary border-3 border-secondary rounded-xl'>

                    <CustomToggle 
                        label='colectivos'
                        isChecked={isShowBuses}
                        onChange={handleShowBuses}
                    />

                    <CustomToggle 
                        label='recorridos'
                        isChecked={isShowRoutes}
                        onChange={handleShowRoutes}
                    />

                </div>
            </div>
        </PrivateLoyout>
    )
}
