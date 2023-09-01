
import { BugBtn } from 'app/providers/error_boundary'
import { useTranslation } from 'react-i18next'
import { Loader } from 'shared/ui/loader'


export default function MainPage(){
    const {t} = useTranslation('main')
    
    return(
        <div> {t('Главная')}
        <BugBtn/>
         </div>
    )
}