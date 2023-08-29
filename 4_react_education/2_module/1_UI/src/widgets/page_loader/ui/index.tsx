import { classname } from "shared/lib/classname/classname"
import cls from "./style.module.scss"
import { Loader } from 'shared/ui/loader'

interface PageLoaderProps {
	className?: string
}
export const PageLoader = ({ className }: PageLoaderProps) => {
	return <div className={classname(cls.main, {}, [className])}>
        <Loader/>
    </div>
}
