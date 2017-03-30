import React from 'react';
import {
	View,
	Text,
	Dimensions,
	StyleSheet
} from 'react-native';
import {
	MapView,
	MapTypes,
	MapModule,
	Geolocation
} from 'react-native-baidu-map';
import TopBar from '../component/TopBar.js'
import config from '../config.js'

export default class OrderResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: null,
			center: {
				longitude: 120.348988,
				latitude: 30.323478
			},
			markers: [],
		}
		this.isRec = this.isRec.bind(this);
		this.renderContent = this.renderContent.bind(this);
	}

	componentWillMount() {
		let order = this.props.orderInf;
		let id = order.id;
		let name = order.startplace;
		let x = order.startplacex;
		let y = order.startplacey;
		// this.setState({
		// 	center: {
		// 		longitude: x,
		// 		latitude: y,
		// 		rand: Math.random()
		// 	},
		// markers: [{
		// 	latitude: y,
		// 	longitude: x,
		// 	title: name.toString(),
		// }]
		// })
		this.isRec();
	}

	isRec() {
		let id = '?id=' + this.props.orderInf.uid;
		let uid = '&uid=' + this.props.user.id;
		let token = '&token=' + this.props.user.token;
		let url = config.api.getOneById + id + uid + token;
		fetch(url, {
				method: 'GET',
			})
			.then(res => res.json())
			.then(res => {
				let status = res.order.status;
				this.setState({
					status
				})
			});
		this.isRecKey = setTimeout(() => this.isRec(), 1000);
	}

	renderContent() {
		if (this.state.status === 3) {
			clearTimeout(this.isRecKey);
			return (
				<Text>叫车成功，司机正在赶来的路上</Text>
			)
		} else {
			return (
				<Text>正在发布订单</Text>
			)
		}
	}

	render() {
		return (
			<View style={{flex:1}}>
				<TopBar title='完成叫车'/>
				<MapView
					zoom={15}
					mapType={1}
					center={this.state.center}
					markers={this.state.markers}
					style={styles.map}
					onMarkerClick={(e) => {
					}}
					onMapClick={(e) => {
					}}
				>
				</MapView>
				<View style={styles.container}>
					{this.renderContent()}
				</View>
			</View>
		)
	}
}

let styles = StyleSheet.create({
	map: {
		width: Dimensions.get('window').width,
		height: 300,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})