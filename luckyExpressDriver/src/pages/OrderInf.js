import React from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native';
import {
	Icon,
	CheckBox
} from 'react-native-elements'
import TopBar from '../component/TopBar.js';
import RowTwoText from '../component/RowTwoText.js';
import RowTwoEle from '../component/RowTwoEle.js';
import App from '../App.js'
import config from '../config.js'
let orderType = ['系统订单', '自主订单', '长期订单', '已接受订单', '已完成订单', '已取消订单', '预约订单'];

export default class OrderInf extends React.Component {
	constructor(props) {
		super(props);
		this.completeOrder = this.completeOrder.bind(this);
	}

	completeOrder() {
		let user = this.props.user;
		let order = this.props.order;
		let uid = '?uid=' + user.id;
		let token = '&token=' + user.token;
		let orderid = '&orderid=' + order.id;
		let score = '&score=3';
		let remark = '&remark=嘿嘿嘿';
		let url = config.api.confirmOne + uid + token + orderid + score + remark;
		alert('hahaha....T-T');
		// fetch(url).then(res => res.json()).then(res => {
		// 	if (res.status === 1) {
		// 		alert('完成订单!');
		// 		this.props.navigator.resetTo({
		// 			component: App
		// 		})
		// 	}
		// });
	}

	render() {
		let order = this.props.order;
		let ordertype = orderType[order.status];
		let date = new Date(order.starttime);
		date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
		let carType = config.cars[order.trucktype].name;
		let fee = order.fee;
		let lessee = order.lessee;
		let startPlace = {
			name: order.startplace
		};
		let roads = JSON.parse(order.endplace);
		roads.unshift(startPlace);
		roads = roads.filter(road => !!road.name);
		let remark = order.remark;
		return (
			<View style={{flex:1,backgroundColor:'#EAEAEA'}}>
				<TopBar title='订单详情' back/>
				<ScrollView styl={{flex:1}}>
					<View style={styles.topbar}>
						<Text style={{color:'white',fontSize:20}}>{ordertype}</Text>
					</View>

						{order.status===3?
						<View style={styles.rowView}>
							<TouchableOpacity style={[styles.button,{borderColor:'blue'}]}>
								<Icon name='navigation' color='blue'/>
								<Text style={{color:'blue'}}>开启导航</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.button,{borderColor:'orange'}]} onPress={this.completeOrder}>
								<Icon name='check' color='orange'/>
								<Text style={{color:'orange'}}>确认到达</Text>
							</TouchableOpacity>
						</View>
						:false}

					<View style={styles.blockView}>
						<RowTwoText leftValue='用车时间' rightValue={date} textStyle={{marginBottom:5}}/>
						<RowTwoText leftValue='货车类型' rightValue={carType} textStyle={{marginBottom:5}}/>
						<RowTwoText leftValue='预估价格' rightValue={fee+'元'} rightValueStyle={{color:'red'}} textStyle={{marginBottom:5}}/>
					</View>

					<View style={styles.blockView}>
						<Text style={{marginLeft:20}}>路 线</Text>
						{roads.map((ele,i)=>{
							return (
								<RowTwoEle key={ele+i}>
									<Icon name='face'/>
									<Text>{ele.name}</Text>
								</RowTwoEle>
								)
						})}
					</View>

					<View style={styles.blockView}>
						<Text style={{marginLeft:20}}>备 注</Text>
						<Text style={{marginLeft:30}}>{remark}</Text>
					</View>
				</ScrollView>
			</View>
		)
	}
}

let styles = StyleSheet.create({
	topbar: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00CEAC',
		padding: 10,
	},
	rowView: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 20,
		marginBottom: 5,
		backgroundColor: 'white'
	},
	button: {
		flexDirection: 'row',
		paddingVertical: 7,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 5,
		alignItems: 'center',
	},
	blockView: {
		padding: 10,
		marginBottom: 5,
		backgroundColor: 'white',
	}
})