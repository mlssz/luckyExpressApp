import React from 'react';
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import {
	Icon
} from 'react-native-elements'
import TopBar from '../component/TopBar.js'
import RowTwoText from '../component/RowTwoText.js'
import RowTwoEle from '../component/RowTwoEle.js'
import ReceiveResult from './ReceiveResult.js'
import config from '../config.js'

export default class EnsureRec extends React.Component {
	constructor(props) {
		super(props);
		this.getOrder = this.getOrder.bind(this);
	}

	controlOrder(data) {
		let status = data.status;
		if (status === 0) {
			alert('error:' + data.msg);
		} else {
			this.props.navigator.push({
				component: ReceiveResult
			})
		}
	}

	getOrder() {
		let order = this.props.order;
		let user = this.props.user;
		let status = order.status;
		let uid = 'uid=' + user.id;
		let token = '&token=' + user.token;
		let orderid = '&orderid=' + order.id;
		let url = !status ? config.api.lesseeChoose : config.api.rentChoose;
		fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: uid + token + orderid
			})
			.then(res => res.json())
			.then(res => this.controlOrder(res));
	}

	render() {
		let order = this.props.order;
		let type = order.status === 6 ? '预约订单' : '实时订单';
		let color = {
			backgroundColor: order.status === 6 ? '#00CEAC' : '#DF5C62'
		};
		let roads = JSON.parse(order.endplace) || [];
		roads.unshift({
			name: order.startplace
		})
		let date = new Date(order.starttime);
		date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
		return (
			<ScrollView style={{flex:1,backgroundColor:'#EAEAEA'}}>
				<TopBar navigator={this.props.navigator} back title='接单详情'/>
				<View style={[styles.top,color]}>
					<Text style={styles.topText}>{type}</Text>
				</View>
				<View>
					<View style={styles.container}>
						<RowTwoText leftValue='用车时间' rightValue={date}/>
						<RowTwoText leftValue='货车类型' rightValue={order.trucktype}/>
						<RowTwoText leftValue='预估价格' rightValue={order.fee+'元'} rightValueStyle={{color:'red'}}/>
					</View>
					<View style={styles.container}>
						<RowTwoText leftValue='路线'/>
						{roads.map((ele,i)=>
								<RowTwoEle key={ele.name}>
									<Icon name='subject'/>
									<Text>{ele.name}</Text>
								</RowTwoEle>
						)}
					</View>
					<View style={styles.container}>
						<RowTwoText leftValue='备注'/>
						<Text style={{paddingLeft:30,paddingTop:7}}>{order.remark}</Text>
					</View>
				</View>

				<View style={{flexDirection:'row',justifyContent:'center'}}>
					<TouchableOpacity style={styles.button} onPress={this.getOrder}>
						<Text style={styles.topText}>立刻抢单</Text>
					</TouchableOpacity>
				</View>
				

			</ScrollView>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 10,
		marginBottom: 5,
	},
	top: {
		padding: 13,
	},
	topText: {
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
	},
	button: {
		marginTop: 20,
		backgroundColor: '#FF0045',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
	}
})