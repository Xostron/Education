import Dialog from '@cmp/dialog'
import useBanner from '@cmp/banner/use_banner'
import useInputStore from '@store/input'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import Item from './item'

export default function Banner({ type = 'building' }) {
	let { build, sect } = useParams()
	const { refBanner, open, close } = useBanner()
	const [bannerB, bannerS, alarm] = useInputStore(({ bannerB, bannerS, alarm }) => [bannerB, bannerS, alarm])
	
	useEffect(() => {
		open()
	}, [])


	const b = bannerB(build)
	const s = bannerS(build, sect)

	const ws = s?.length > 1 ? 'b-two' : 'b-one'
	const wb = b?.length > 1 ? 'b-two' : 'b-one'
	// для секции
	if (type === 'section') {
		return (
			<Dialog cls={`banner ${ws}`} href={refBanner}>
				{!!s.length && s.map((el, idx) => <Item key={idx} data={el} />)}
			</Dialog>
		)
	}
	// для склада
	return (
		<Dialog cls={`banner ${wb}`} href={refBanner}>
			{!!b.length && b.map((el, idx) => <Item key={idx} data={el} />)}
		</Dialog>
	)
}
