// SafeAreaView позволяет вам создавать компоненты, которые автоматически
// учитывают safe areas в своем макете. Это особенно важно, когда речь идет
// о размещении компонентов в верхней или нижней части экрана, где могут
// находиться панели навигации, верхние панели состояния или панели жестов.
import { SafeAreaView } from 'react-native-safe-area-context'
import { RefreshControl, ScrollView } from 'react-native'

import Orders from '../orders'
import useHome from 'src/shared/hook/home';

export const Home = ({ navigation }) => {
	const [refresh, setRefresh] = useHome()
	return (
		<SafeAreaView style={{ flex: 1, flexGrow: 1 }}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}
				refreshControl={
					<RefreshControl
						refreshing={refresh}
						onRefresh={_ => setRefresh(true)}
					/>
				}
			>
				{/* компоненты */}
				<Orders {...{refresh}}/>

				

			</ScrollView>
		</SafeAreaView>
	)
}


