import { FlatList } from 'react-native'

import useOrders from 'src/shared/hook/order/list'
import Item from './item'
import { stl } from './style'

export default function Line({refresh}) { 
	const {data, fetching, load} = useOrders(refresh)
	if (!data) return null
	const ri = ({item, index}) => <Item item={item} key={index}/>
	return (
		<FlatList 
			data={data} renderItem={ri} keyExtractor={item => item._id}
			numColumns={1} showsHorizontalScrollIndicator={false}
			contentContainerStyle={{flexGrow: 1}} horizontal
			refreshing={fetching} onRefresh={load} style={stl.component}/>
	)
}