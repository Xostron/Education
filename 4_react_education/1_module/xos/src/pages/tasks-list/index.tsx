import { useEffect } from "react";
import { Layout, Row, Col, Typography, Spin, Empty } from "antd";
import { TaskRow } from "../../entities/task/ui/task-row";
import styles from "./styles.module.scss";
import { Task } from "../../shared/api";
import { typicodeApi } from "../../shared/api";
import { getTasksList } from "../../shared/api/typicode/tasks";
import { API_URL } from "../../shared/config";

const TasksListPage = () => {
	const tasks: Task[] = [
		{
			completed: false,
			userId: 10,
			id: 1,
			title: "Test1",
		},
		{
			completed: false,
			userId: 20,
			id: 2,
			title: "Test1",
		},
		{
			completed: false,
			userId: 30,
			id: 3,
			title: "Test1",
		},
	];
	const isLoading = false;
	const isEmpty = false;

	/**
	 * Запрашиваем данные при загрузке страницы
	 * @remark Является плохой практикой в мире effector и представлено здесь - лишь для наглядной демонстрации
	 * Лучше фетчить через event.pageMounted или reflect
	 */
	useEffect(() => {
		console.log("@@@1 =", API_URL);
		// getTasksList().then(res=>console.log('data = ', res))
	}, []);
	console.log("@@@1 =", API_URL);
	return (
		<Layout className={styles.root}>
			<Layout.Header className={styles.toolbar}>
				<Row justify='center'>
					<Typography.Title level={1}>Tasks List</Typography.Title>
				</Row>
				{/* TODO: TasksFilters */}
			</Layout.Header>

			<Layout.Content className={styles.content}>
				<Row gutter={[0, 20]} justify='center'>
					{isLoading && <Spin size='large' />}
					{!isLoading &&
						tasks.map((task) => (
							<Col key={task.id} span={24}>
								<TaskRow
									data={task}
									titleHref={`/${task.id}`}
									// TODO: ToggleTaskCheckbox
								/>
							</Col>
						))}
					{!isLoading && isEmpty && (
						<Empty description='No tasks found' />
					)}
				</Row>
			</Layout.Content>
		</Layout>
	);
};

export default TasksListPage;
