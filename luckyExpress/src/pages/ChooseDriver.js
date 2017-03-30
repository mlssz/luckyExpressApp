import React from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	Text,
	PanResponder,
	Modal,
	AsyncStorage
} from 'react-native';
import {
	MapView,
	MapTypes,
	MapModule,
	Geolocation
} from 'react-native-baidu-map';
import Storage from 'react-native-storage';
import {
	Icon
} from 'react-native-elements'
import TopBar from '../component/TopBar.js'
import ChooseDriverModal from './ChooseDriverModal.js'
import config from '../config.js'

let api = config.api;

export default class ChooseDriver extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			driverCount: 0,
			modalVisible: false,
			center: {
				longitude: 120.348988,
				latitude: 30.323478
			},
			markers: [],
			datas: null,
		};
		this.handlePanResponderMove = this.handlePanResponderMove.bind(this);
		this.setCenter = this.setCenter.bind(this);
		this.getDriver = this.getDriver.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	handlePanResponderMove(evt, gestureState) {
		let dy = gestureState.dy;
		if (!this.state.modalVisible && dy < -50)
			this.setState({
				modalVisible: true
			})
	}

	componentWillMount() {
		this.setCenter();
		this.getDriver();
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderMove: this.handlePanResponderMove,
		});
	}

	componentWillUnmount() {
		clearTimeout(this.getId);
	}

	getDriver() {
		let url = api.rentchoosestatus;
		let uid = 'uid=' + this.props.user.id;
		let token = '&token=' + this.props.user.token;
		let id = '&orderid=' + this.props.orderInf.uid;
		fetch(url, {
				"method": "POST",
				'headers': {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				'body': uid + token + id
			})
			.then(res => res.json())
			.then(res => {
				if (res.status === 1) {
					let datas = res.lessees;
					this.markDriver(datas);
				}
			})
		this.getId = setTimeout(() => this.getDriver(), 1000);
	}

	markDriver(datas) {
		let markers = [];
		if (!datas.length)
			datas = [];
		for (data of datas) {
			let marker = {
				latitude: data.positionY,
				longitude: data.positionX,
				title: data.realName,
			};
			markers.push(marker);
		}
		this.setState({
			markers,
			datas,
			driverCount: datas.length
		})
	}

	setCenter() {
		Geolocation.getCurrentPosition()
			.then(data => {
				this.setState({
					zoom: 15,
					center: {
						latitude: data.latitude,
						longitude: data.longitude,
						rand: Math.random()
					}
				});
			})
			.catch(e => {
				console.warn(e, 'error');
			})
	}

	closeModal() {
		this.setState({
			modalVisible: false
		})
	}

	render() {
		let small = this.state.modalVisible ? {
			height: 200
		} : {};
		return (
			<View style={{flex:1}}>
				<TopBar title='选择司机' navigator={this.props.navigator} back/>
				<MapView
					zoom={15}
					mapType={1}
					center={this.state.center}
					markers={this.state.markers}
					style={[styles.map,small]}
					onMarkerClick={(e) => {
					}}
					onMapClick={(e) => {
					}}
				>
				</MapView>
				<View style={styles.rowView}
					{...this._panResponder.panHandlers}>
					<Icon name='angle-double-up' type='font-awesome' color='red'/>
					<Text>共有<Text style={styles.importentText}>{this.state.driverCount}</Text>位司机响应您的请求</Text>
					<Icon name='angle-double-up' type='font-awesome' color='red'/>
				</View>
				<ChooseDriverModal
					closeModal={this.closeModal}
					modalVisible={this.state.modalVisible}
					datas={this.state.datas}
					car={this.props.car}
					user={this.props.user}
					orderInf={this.props.orderInf}
					driverCount={this.state.driverCount}
					orderid={this.props.orderInf.uid}
					navigator={this.props.navigator}/>
			</View>
		)
	}
}

let number = Math.floor(Math.random() * 5)
ChooseDriver.defaultProps = {
	car: config.cars[number]
}

let styles = StyleSheet.create({
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height - 120,
	},
	rowView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	importentText: {
		color: 'red',
		flex: 1,
	}
});

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
});