import NoPage from './pages/NoPage.js'
export default config = {
	cars: [{
		img: require('./img/car-small.png'),
		name: '小型货车',
		load: '1.5',
		length: '2',
		width: '1.6',
		height: '1.5',
		price: '58',
		beyondPrice: '4.0',
		cornerColor: '#0092c7',
	}, {
		img: require('./img/car-big.png'),
		name: '大型货车',
		load: '1.8',
		length: '4.2',
		width: '2',
		height: '1.8',
		price: '88',
		beyondPrice: '5.0',
		cornerColor: '#9fe0f6',
	}, {
		img: require('./img/flat-small.png'),
		name: '小型平板',
		load: '1',
		length: '2',
		width: '1.6',
		height: '1.9',
		price: '60',
		beyondPrice: '4.0',
		cornerColor: '#f3e59a',
	}, {
		img: require('./img/flat-middle.png'),
		name: '中型平板',
		load: '1.5',
		length: '2',
		width: '1.6',
		height: '1.5',
		price: '58',
		beyondPrice: '4.0',
		cornerColor: '#f3b59b',
	}, {
		img: require('./img/flat-big.png'),
		name: '大型平板',
		load: '1.5',
		length: '2',
		width: '1.6',
		height: '1.5',
		price: '58',
		beyondPrice: '4.0',
		cornerColor: '#f29c9c',
	}],
	selfLists: [
		[{
			icon: 'list',
			title: '常用路线',
			page: NoPage,
		}, {
			icon: 'rate-review',
			title: '浏览记录',
			page: NoPage,
		}],
		[{
			icon: 'store',
			title: '积分兑换',
			page: NoPage,
		}, {
			icon: 'people',
			title: '关于我们',
			page: NoPage,
		}],
		[{
			icon: 'star-half',
			title: '每日签到',
			page: NoPage,
		}, {
			icon: 'payment',
			title: '费用明细',
			page: NoPage,
		}, {
			icon: 'work',
			title: '任务管理',
			page: NoPage,
		}, {
			icon: 'content-paste',
			title: '客服反馈',
			page: NoPage,
		}]
	],
	api: {
		baiduAK: 'jRsRZ7IjzEeYRiw1LeRNkM3YU140tsY0',
		searchSuggestionPlace: 'http://api.map.baidu.com/place/v2/suggestion',
		login: 'http://www.oeli.pub:80/haoyun/s/rent/login.json',
	}
}