import { useEffect } from "react";
import { Layout, Row, Col, Typography, Spin, Empty } from "antd";
import { DataTask, TaskRow } from "../../entities/task/ui/task-row";
import styles from "./styles.module.scss";


const TasksListPage = ()=>{
    const tasks:DataTask[] = [{
        dateCreate:new Date(),
        dateUpd:new Date(),
        done:true,
        id:1,
        title:'Test1'
    },
    {
        dateCreate:new Date(),
        dateUpd:new Date(),
        done:true,
        id:2,
        title:'Test1'
    },
    {
        dateCreate:new Date(),
        dateUpd:new Date(),
        done:true,
        id:3,
        title:'Test1'
    }]
  const isLoading = false
  const isEmpty = false

  /**
   * Запрашиваем данные при загрузке страницы
   * @remark Является плохой практикой в мире effector и представлено здесь - лишь для наглядной демонстрации
   * Лучше фетчить через event.pageMounted или reflect
   */
//   useEffect(() => taskModel.getTasksListFx(), []);

  return (
    <Layout className={styles.root}>
        
      <Layout.Header className={styles.toolbar}>
        <Row justify="center">
          <Typography.Title level={1}>Tasks List</Typography.Title>
        </Row>
        {/* TODO: TasksFilters */}
      </Layout.Header>

      <Layout.Content className={styles.content}>
        <Row gutter={[0, 20]} justify="center">
          {isLoading && <Spin size="large" />}
          {!isLoading && tasks.map((task) => (
            <Col key={task.id} span={24}>
              <TaskRow
                data={task}
                titleHref={`/${task.id}`}
                // TODO: ToggleTaskCheckbox
              />
            </Col>
          ))}
          {!isLoading && isEmpty && <Empty description="No tasks found" />}
        </Row>
      </Layout.Content>
    </Layout>
  );
}

export default TasksListPage