import { Row } from 'antd'
import {Link} from 'react-router-dom'
import style from './styles.module.scss'

export type DataTask = {
    title:string,
    id:number,
    done:boolean,
    dateCreate:Date,
    dateUpd:Date
}
export type TaskRowProps = {
    data:DataTask,
    titleHref:string
}



export const TaskRow = ({data,titleHref}:TaskRowProps)=>{
    return(
        <Row className={style.root}>
            {titleHref ? <Link to={titleHref}>{data.title}</Link> : data.title}
        </Row>
    )
}