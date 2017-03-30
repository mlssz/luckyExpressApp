import React from 'react';
import {
	ScrollView,
	View,
	Text,
	AsyncStorage,
	StyleSheet
} from 'react-native';
import TopBar from '../component/TopBar.js';
import Storage from 'react-native-storage';
import OrderItem from '../component/OrderItem.js'
import config from '../config.js'

export default class OrderManage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			order: [],
		}
		this.setOrder = this.setOrder.bind(this);
		this.renderOrder = this.renderOrder.bind(this);
	}

	componentWillMount() {
		storage.load({
				key: 'loginState'
			})
			.then(user => {
				this.setOrder(user);
			})
			.catch(err => {
				console.log(err)
				Alert.alert(
					'请先登录',
					null, [{
						text: 'OK',
						onPress: () => {
							this.props.navigator.push({
								component: Login
							})
						}
					}, ]
				)
			})
	}

	setOrder(user) {
		let uid = '?uid=' + user.id;
		let token = '&token=' + user.token;
		let url = config.api.getRentalAll + uid + token;
		fetch(url, {
				method: 'GET'
			})
			.then(res => res.json())
			.then(res => {
				if (res.status === 1) {
					this.setState({
						user,
						order: res.order
					})
				}
			});
	}

	renderOrder() {
		let order = this.state.order;
		let user = this.state.user;
		return (
			order.map(data =>
				<OrderItem 
					order={data}
					user={user}
					key={data.id} 
					navigator={this.props.navigator}/>)
		)
	}

	render() {
		return (
			<View style={{flex:1}}>
				<TopBar title='订单管理' />
				<ScrollView style={{flex:1}}>
					{this.renderOrder()}
				</ScrollView>
			</View>
		)
	}
};

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
});