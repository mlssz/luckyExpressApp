import React from 'react';
import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';
import {
	Icon
} from 'react-native-elements';
import OrderItem from '../component/OrderItem.js'
import websocket from '../component/websocket.js'

export default class ReceiveOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonValue: '开始接单',
			isRec: false,
			position: [],
			orders: [],
		}
		this.renderContent = this.renderContent.bind(this);
		this.changeOrderState = this.changeOrderState.bind(this);
		this.sendPosition = this.sendPosition.bind(this);
		this.getPlace = this.getPlace.bind(this);
		this.startRec = this.startRec.bind(this);
		this.stopRec = this.stopRec.bind(this);
	}

	componentWillMount() {
		storage.load({
			key: 'loginState'
		}).then(res => {
			let token = res.token;
			let uid = res.id;
			let position = JSON.parse(res.position);
			this.setState({
				token,
				uid,
				position
			})
		})
	}

	getPlace() {
		this.watchId = navigator.geolocation.watchPosition((position) => {
			let x = position.coords.latitude;
			let y = position.coords.longitude;
			this.setState({
				position: [x, y]
			})
		})
	}

	sendPosition() {
		let position = this.state.position;
		let data = {
			'action': 99,
			'positionx': position[0],
			'positiony': position[1],
		}
		this.ws.send(data);
		this.sendId = setTimeout(() => {
			this.sendPosition()
		}, 1000);
	}

	startRec() {
		let uid = this.state.uid;
		let token = this.state.token;
		this.getPlace();
		this.ws = new websocket('ws://115.159.155.229:8123/' + uid + '/' + token + '/');
		this.ws.init(this.sendPosition, (orders) => {
			this.setState({
				orders
			})
		});
	}

	stopRec() {
		clearTimeout(this.sendId);
		navigator.geolocation.clearWatch(this.watchID);
		this.ws.close();
	}

	changeOrderState() {
		let isRec = !this.state.isRec;
		let buttonValue = isRec ? '停止接单' : '开始接单';
		isRec ? this.startRec() : this.stopRec();
		this.setState({
			isRec,
			buttonValue
		});
	}

	renderTips() {
		return (
			<View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#EAEAEA'}}>
				<Text style={{fontSize:16}}>如需接单，请点击上方</Text>
				<Text style={{fontSize:16}}>“开始接单”按钮</Text>
			</View>
		)
	}

	renderContent() {
		let orders = this.state.orders;
		return (
			<ScrollView style={{backgroundColor:'#EAEAEA'}}>
				{
					orders.map(
						order=>
							<OrderItem 
								order={order} 
								key={order.id} 
								navigator={this.props.navigator}/>
					)
				}
			</ScrollView>
		)
	}

	render() {
		let buttonColor = this.state.isRec ? {
			backgroundColor: 'red'
		} : {
			backgroundColor: '#5B88EA'
		};
		return (
			<View style={styles.container}>
				<View style={styles.topbar}>
					<View style={styles.threePart}></View>
					<View style={styles.threePart}>
						<TouchableOpacity style={[styles.button,buttonColor]} onPress={this.changeOrderState}>
							<Text style={{fontSize:20,color:'white'}}>
								{this.state.buttonValue}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.threePart}>
						<Icon name='refresh' style={styles.refresh} size={30} color='#5F5B6B'></Icon>
					</View>
				</View>

				{this.state.isRec?this.renderContent():this.renderTips()}

			</View>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	topbar: {
		height: 64,
		flexDirection: 'row',
		alignItems: 'center',
	},
	button: {
		paddingVertical: 5,
		paddingHorizontal: 15,
		borderRadius: 5,
	},
	refresh: {
		flex: 1
	},
	threePart: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	}
})

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
});