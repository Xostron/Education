import { Button } from "shared/ui/btn"
import cls from "./style.module.scss"
import { classname } from "shared/lib/classname/classname"
import { useTranslation } from "react-i18next"

interface PageErrorProps {
	className?: string
}

export const PageError = ({ className }: PageErrorProps) => {
	const { t } = useTranslation()
	const hndlReload = () => {
		location.reload()
	}
	return (
		<div className={classname(cls.main, {}, [className])}>
			<p>{t("Что-то пошло не так...")}</p>
			<Button onClick={hndlReload} className={cls.btn}>{t('Перезагрузить')}</Button>
		</div>
	)
}
