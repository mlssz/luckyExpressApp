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
import RowTwoText from '../component/EnsureOrder/RowTwoText.js';
import RowTwoEle from '../component/EnsureOrder/RowTwoEle.js';
import ChooseDriver from './ChooseDriver';
import config from '../config.js'
export default class EnsureOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			payTime: 0,
			payType: 0,
		}
		this.nextPage = this.nextPage.bind(this);
		this.ensureOrder = this.ensureOrder.bind(this);
	}

	nextPage(data) {
		if (data.status === 1) {
			let car = this.props.car;
			let orderInf = this.props.orderInf;
			orderInf.payTime = this.state.payTime;
			orderInf.payType = this.state.payType;
			this.props.navigator.push({
				component: ChooseDriver,
				params: {
					car: car,
					orderInf: orderInf
				}
			})
		} else {
			alert('下单失败！' + data.msg);
		}
	}

	ensureOrder() {
		let car = this.props.car;
		let orderInf = this.props.orderInf;
		let statusNum = orderInf.isReturn ? 1 : 0;
		let user = this.props.user;
		let uid = '?uid=' + user.id;
		let token = '&token=' + user.token;
		let road = orderInf.roads.shift();
		let startplace = '&startplace=' + road.name;
		let [startplacex, startplacey] = road.position.split(',');
		startplacex = '&startplacex=' + startplacex;
		startplacey = '&startplacey=' + startplacey;
		let endplace = '&endplace=' + JSON.stringify(orderInf.roads);
		let starttime = '&starttime=' + (new Date(orderInf.times).getTime() - 28800000);
		let status = '&status=' + statusNum;
		let fee = '&fee=' + orderInf.price;
		let trucktype = '&trucktype=' + car.carType;
		let url = config.api.ensureOrder + uid + token + startplace + startplacex + startplacey + endplace + starttime + status + fee + trucktype;
		fetch(encodeURI(url), {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			})
			.then(res => res.json())
			.then(res => this.nextPage(res));
	}

	render() {
		let roads = this.props.orderInf.roads.filter((ele) => ele.name !== '');
		return (
			<ScrollView style={styles.totalView}>
				<TopBar title='确认订单' navigator={this.props.navigator} back light/>

				<View style={styles.blockView}>
					<RowTwoText leftValue='用车时间' rightValue={this.props.orderInf.times}/>
					<RowTwoText leftValue='货车类型' rightValue={this.props.car.name}/>
					<RowTwoText leftValue='需要装卸' rightValue={this.props.orderInf.isUnload?'是':'否'}/>
					<RowTwoText leftValue='需要回单' rightValue={this.props.orderInf.isReturn?'是':'否'}/>
					<RowTwoText leftValue='预估价格' 
						rightValue={this.props.orderInf.price+'元'} rightValueStyle={{color:'red'}}/>
				</View>

				<View style={styles.blockView}>
					<Text>路线</Text>
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
					<Text>请选择付款时间</Text>
					<RowTwoEle>
						<CheckBox
	  						title=''
	  						checked={this.state.payTime===1}
	  						onPress={()=>this.setState({payTime:1})}
	  						containerStyle={{borderColor:'white'}}/>
	  					<View>
	  						<Text style={{color:'black'}}>发货时付款</Text>
	  						<Text style={{fontSize:10}}>发车前根据预估历程，预估等候时间计算</Text>
	  					</View>
					</RowTwoEle>
					<RowTwoEle>
						<CheckBox
	  						title=''
	  						checked={this.state.payTime===2}
	  						onPress={()=>this.setState({payTime:2})}
	  						containerStyle={{borderColor:'white'}}/>
	  					<View>
	  						<Text style={{color:'black'}}>收货时付款</Text>
	  						<Text style={{fontSize:10}}>到达最后目的地时，按照实际里程等候时间来计费</Text>
	  					</View>
					</RowTwoEle>
				</View>

				<View style={styles.blockView}>
					<Text>请选择付款方式</Text>
					<RowTwoEle>
						<CheckBox
	  						title=''
	  						checked={this.state.payType===1}
	  						onPress={()=>this.setState({payType:1})}
	  						containerStyle={{borderColor:'white'}}/>
	  					<View>
	  						<Text style={{color:'black'}}>支付宝</Text>
	  					</View>
					</RowTwoEle>
					<RowTwoEle>
						<CheckBox
	  						title=''
	  						checked={this.state.payType===2}
	  						onPress={()=>this.setState({payType:2})}
	  						containerStyle={{borderColor:'white'}}/>
	  					<View>
	  						<Text style={{color:'black'}}>现金</Text>
	  					</View>
					</RowTwoEle>
				</View>

				<TouchableOpacity 
					style={styles.nextButton}
					activeOpacity={0.6}
					onPress={this.ensureOrder}>
					<Text style={{fontSize:16,color:'white'}}>下单</Text>
				</TouchableOpacity>

			</ScrollView>
		)
	}
}

let styles = StyleSheet.create({
	totalView: {
		flex: 1,
		backgroundColor: '#EDEDED',
	},
	blockView: {
		flex: 1,
		marginBottom: 10,
		backgroundColor: 'white',
		padding: 10
	},
	nextButton: {
		backgroundColor: 'red',
		height: 40,
		paddingVertical: 5,
		justifyContent: 'center',
		alignItems: 'center',
	}
})