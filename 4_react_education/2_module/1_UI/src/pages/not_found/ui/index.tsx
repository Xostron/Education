import { classname } from "shared/lib/classname/classname"
import cls from "./style.module.scss"
import { useTranslation } from 'react-i18next'

interface NotFoundProps {
	className?: string
}

export const NotFound = ({ className }: NotFoundProps) => {
    const {t}=useTranslation()
	return <div className={classname(cls.main, {}, [className])}>
        {t('Страница не найдена')}
    </div>
}
