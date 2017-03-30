import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native';
import config from '../config.js'
import ContinueOrder from '../pages/ContinueOrder.js';
let api = config.api;

export default class DriverBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			place: '',
			user: this.props.user,
			orderInf: this.props.orderInf,
		}
		this.continueOrder = this.continueOrder.bind(this);
		this.getPlace = this.getPlace.bind(this);
	}

	//设置单个司机信息
	componentWillMount() {
		this.getPlace();
		let name = this.props.data.name;
		let star = this.props.data.score;
		let carType = this.props.car.name;
		let price = this.props.car.price;
		let dealNum = this.props.data.order_count;
		let no = this.props.data.no || 'null';
		let account = this.props.data.account;
		let orderid = this.props.orderid;
		let lessee = this.props.data.id;
		this.setState({
			name,
			star,
			carType,
			dealNum,
			price,
			no,
			account,
			orderid,
			lessee
		})
	}

	//获得司机地址信息
	getPlace() {
		let x = this.props.user.x;
		let y = this.props.user.y;
		let driverX = this.props.data.positionX;
		let driverY = this.props.data.positionY;
		let distance = Math.floor(6370 * 1000 * Math.acos(Math.cos(driverY) * Math.cos(y) * Math.cos(driverX - x) + Math.sin(driverY) * Math.sin(y)));
		let location = '?location=' + driverX + ',' + driverY;
		let ak = '&ak=' + api.baiduAK;
		let url = api.getPlaceName + location + '&output=json' + ak;
		fetch(url)
			.then(res => res.json())
			.then(res => {
				this.setState({
					driverX,
					driverY,
					distance,
					place: res.result.formatted_address
				})
			})
	}

	continueOrder() {
		console.log('props_db', this.props)
		this.props.closeModal();
		this.props.navigator.push({
			params: this.state,
			component: ContinueOrder
		})
	}

	render() {
		return (
			<TouchableOpacity 
				style={styles.container}
				onPress={this.continueOrder}>
				<Image source={require('../img/tx.jpg')} style={styles.head}/>
				<View style={styles.middle}>
					<View 
						style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
						<Text style={[styles.normalText,styles.headText]}>
							{this.state.name}
						</Text>
						<Text>
							{this.state.star}星
						</Text>
					</View>
					<Text style={styles.normalText}>{this.state.carType}</Text>
					<Text style={styles.normalText}>{this.state.place}</Text>
				</View>
				<View>
					<Text style={styles.normalText}>接单数:{this.state.dealNum}</Text>
					<Text style={styles.normalText}><Text style={{color:'red',fontSize:18}}>{this.state.price}</Text>元(5公里)</Text>
					<Text style={styles.normalText}>距您{this.state.distance}米</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 100,
		padding: 10,
	},
	head: {
		height: 80,
		width: 80,
	},
	middle: {
		padding: 5,
		flex: 2
	},
	right: {
		flex: 1,
		padding: 5,
	},
	normalText: {
		margin: 2,
		fontSize: 14,
		color: 'gray',
	},
	headText: {
		fontSize: 18,
		color: 'black'
	}
})