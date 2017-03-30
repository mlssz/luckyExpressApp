import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
	Dimensions,
	ScrollView,
	TouchableHighlight,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import {
	Icon
} from 'react-native-elements'
import TopBar from '../component/TopBar.js'
import Times from '../component/Times.js'
import Road from '../component/Road/Road.js'
import Ensureorder from './EnsureOrder.js'
import config from '../config.js'

let api = config.api;

export default class CompleteOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roads: [{
				name: '',
				position: ''
			}, {
				name: '',
				position: ''
			}],
			isUnload: false,
			isReturn: false,
			message: '',
			price: 0,
			times: new Date().toString(),
		}
		this.changeRoads = this.changeRoads.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.setStart = this.setStart.bind(this);
	}

	setStart() {
		navigator.geolocation.getCurrentPosition(
			(res) => {
				let position = res.coords.latitude + ',' + res.coords.longitude;
				let url = api.getPlaceName + '?location=' + position + '&output=json&ak=' + api.baiduAK;
				fetch(url)
					.then(res => res.json())
					.then(res => {
						let location = res.result.formatted_address + '(当前地址)';
						let roads = [{
							name: location,
							position: position
						}, {
							name: '',
							position: ''
						}];
						this.setState({
							roads
						})
					});
			},
			(error) => alert(error.message), {
				enableHighAccuracy: false,
				timeout: 20000,
				maximumAge: 1000
			}
		);
	}

	componentWillMount() {
		this.setStart();
	}

	changeRoads(roads) {
		this.setState({
			roads: roads,
		})
		this.calcultePrice(roads);
	}

	calcultePrice(roads) {
		let price = Number.parseInt(this.props.car.price);
		let beyondPrice = Number.parseInt(this.props.car.beyondPrice);
		let origins = '?origins=' + roads[0].position;
		let destinations = '&destinations=' + roads[roads.length - 1].position;
		let output = '&output=json'
		let ak = '&ak=' + config.api.baiduAK;
		let url = config.api.calculteRoute + origins + destinations + output + ak;
		console.log(url)
		fetch(url)
			.then(res => res.json())
			.then(res => {
				if (!res.status) {
					let distance = res.result[0].distance.value;
					console.warn(distance)
					let maybePrice = Math.floor(price + (distance - 5000) / 1000 * beyondPrice);
					price = maybePrice >= price ? maybePrice : price;
					this.setState({
						price
					})
				}
			});
	}

	nextPage() {
		let state = this.state;
		let car = this.props.car;
		let navigator = this.props.navigator;
		let user = this.props.user;
		let orderInf = {
			isUnload: state.isUnload,
			isReturn: state.isReturn,
			price: state.price,
			roads: state.roads,
			times: state.times,
			message: state.message
		};
		navigator.push({
			component: Ensureorder,
			params: {
				car: car,
				orderInf: orderInf,
				user: user,
			}
		})
	}

	render() {
		let car = this.props.car;
		let unLoadColor = this.state.isUnload ? 'red' : 'white';
		let returnColor = this.state.isReturn ? 'red' : 'white';
		return (
			<ScrollView 
				style={{flex:1,backgroundColor:'#EDEDED'}}
				showsVerticalScrollIndicator={false}>

				<View style={styles.blockView}>
					<TopBar title='完善订单' navigator={this.props.navigator} back light/>
					<View style={styles.topbarInf}>
						<View style={styles.imgView}>
							<Image source={car.img} style={styles.img} />
						</View>
						<View style={styles.imgText}>
							<Text style={[styles.normalText,styles.topText]}>{car.name}</Text>
							<Text style={styles.normalText}>载重：{car.load}吨</Text>
							<Text style={styles.normalText}>长*宽*高：{car.length}*{car.width}*{car.height}m</Text>
						</View>
					</View>
				</View>

				<Times/>

				<Road 
					roads={this.state.roads} 
					changeRoads = {this.changeRoads}
					navigator={this.props.navigator}/>

				<View style={[styles.chooseView,styles.rowBlock]}>
					<Icon name='thumb-up'/>
					<View style={[styles.rowBlock,styles.rowChoose]}>
						<TouchableHighlight
							activeOpacity={0.8}
							underlayColor='gray'
							style={styles.buttonView}
							onPress={()=>{
							let isUnload=!this.state.isUnload;
							this.setState({isUnload});
							}}>
							<View style={{	
								alignItems:'center',
								backgroundColor:unLoadColor,
								paddingHorizontal:20}}>
								<Text>需要装卸</Text>
								<Text>(低价)</Text>
							</View>
						</TouchableHighlight>
						<TouchableHighlight
							activeOpacity={0.8}
							underlayColor='gray'
							style={styles.buttonView}
							onPress={()=>{
								let isReturn=!this.state.isReturn;
								this.setState({isReturn});
							}}>
							<View style={{
								alignItems:'center',
								backgroundColor:returnColor,
								paddingHorizontal:20}}>
								<Text>自主选车</Text>
								<Text>(低价)</Text>
							</View>
						</TouchableHighlight>
					</View>
				</View>

				<View style={[styles.rowBlock,{padding:10}]}>
					<Icon name='message'/>
					<TextInput
						value={this.state.message}
						onChangeText={(message)=>this.setState({message})}
						numberOfLines={2}
						underlineColorAndroid='transparent'
						placeHolder='留言给司机:'
						multiline={true}
						style={styles.message}/>
				</View>

				<View style={[styles.blockView,{alignItems:'center'}]}>
					<View style={{flexDirection:'row',alignItems:'flex-end'}}>
						<Text style={{fontSize:15}}>约</Text>
						<Text style={{fontSize:30,color:'red'}}>{this.state.price}</Text>
						<Text style={{fontSize:15}}>元</Text>
					</View>
					<Text style={{fontSize:10}}>根据路途实际情况费用可能变化</Text>
				</View>

				<TouchableOpacity 
					style={styles.nextButton}
					activeOpacity={0.6}
					onPress={this.nextPage}>
					<Icon name='trending-flat' color='white'/>
				</TouchableOpacity>

			</ScrollView>
		)
	}
}

let width = Dimensions.get('window').width;
let styles = StyleSheet.create({
	blockView: {
		backgroundColor: '#FFFFFF',
		marginBottom: 10,
	},
	rowBlock: {
		backgroundColor: '#FFFFFF',
		marginBottom: 10,
		flexDirection: 'row',
		flex: 1,
	},
	topbarInf: {
		flexDirection: 'row',
	},
	imgView: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	img: {
		width: width / 5,
		height: 200 / 3,
	},
	imgText: {
		flex: 1,
	},
	normalText: {
		fontSize: 14,
		marginBottom: 3,
	},
	topText: {
		fontSize: 18,
		color: 'black',
	},
	chooseView: {
		height: 70,
		alignItems: 'center',
	},
	rowChoose: {
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: 0,
	},
	buttonView: {
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'gray',
		borderRadius: 5,
	},
	message: {
		flex: 1,
		backgroundColor: '#EDEDED'
	},
	nextButton: {
		backgroundColor: 'red',
		height: 40,
		paddingVertical: 5,
		justifyContent: 'center',
		alignItems: 'center',
	}
})