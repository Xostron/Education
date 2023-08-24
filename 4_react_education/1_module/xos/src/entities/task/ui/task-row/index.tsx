import { Row } from 'antd'
import {Link} from 'react-router-dom'
import style from './styles.module.scss'
import { Task } from 'shared/api/typicode/models'


export type TaskRowProps = {
    data:Task,
    titleHref:string
}



export const TaskRow = ({data,titleHref}:TaskRowProps)=>{
    return(
        <Row className={style.root}>
            {titleHref ? <Link to={titleHref}>{data.title}</Link> : data.title}
        </Row>
    )
}