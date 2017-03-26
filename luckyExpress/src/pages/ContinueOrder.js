import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	Dimensions,
	Image,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import {
	MapView,
	MapTypes,
	MapModule,
	Geolocation
} from 'react-native-baidu-map';
import TopBar from '../component/TopBar.js';

export default class ContinueOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
		this.nextPage = this.nextPage.bind(this);
	}

	componentWillMount() {
		let x = this.state.x;
		let y = this.state.y;
		let name = this.state.name;
		this.setState({
			center: {
				longitude: x,
				latitude: y
			},
			marker: {
				latitude: y,
				longitude: x,
				title: name,
			},
		})
	}

	nextPage() {
		// this.props.navigator.push({
		// 	component: null,
		// 	params: this.state,
		// })
	}

	render() {
		return (
			<View style={{flex:1}}>
				<TopBar title='继续叫车' back navigator={this.props.navigator}/>
				<MapView
					zoom={15}
					mapType={1}
					center={this.state.center}
					marker={this.state.marker}
					style={styles.map}
					onMarkerClick={(e) => {
					}}
					onMapClick={(e) => {
					}}
				>
				</MapView>
				<ScrollView style={styles.container}>
					<View style={styles.rowflex}>
						<View style={{flex:1,alignItems:'center'}}>
							<Image source={require('../img/tx.jpg')} style={styles.head}/>	
						</View>
						<Text style={styles.headText}>{this.state.name}</Text>
						<Text style={[styles.headText,{color:'red'}]}>{this.state.star}星</Text>
					</View>

					<View style={styles.rowflex}>
						<View style={{flex:1}}>
							<Text style={styles.headText}>{this.state.distance}m</Text>
							<Text style={styles.normalText}>距离</Text>
						</View>
						<View style={{flex:1}}>
							<Text style={[styles.headText,{color:'red'}]}>{this.state.price}元</Text>
							<Text style={[styles.normalText,{color:'red'}]}>价格（5公里）</Text>
						</View>
						<View style={{flex:1}}>
							<Text style={styles.headText}>{this.state.dealNum}</Text>
							<Text style={styles.normalText}>接单数</Text>
						</View>
					</View>
	
					<View style={styles.rowflex}>
						<Text style={styles.normalText}>手机</Text>
						<Text style={[styles.normalText,{flex:2}]}>{this.state.account}</Text>
					</View>

					<View style={styles.rowflex}>
						<Text style={styles.normalText}>车型</Text>
						<Text style={[styles.normalText,{flex:2}]}>{this.state.carType}</Text>
					</View>

					<View style={styles.rowflex}>
						<Text style={styles.normalText}>车牌</Text>
						<Text style={[styles.normalText,{flex:2}]}>{this.state.no}</Text>
					</View>

					<View style={styles.rowflex}>
						<Text style={styles.normalText}>位置</Text>
						<Text style={[styles.normalText,{flex:2}]}>{this.state.place}</Text>
					</View>
					<TouchableOpacity
						style={styles.button}
						onPress={this.nextPage}>
						<Text style={{fontSize:25,color:'white',textAlign:'center'}}>继续叫车</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		)
	}
}

let styles = StyleSheet.create({
	map: {
		width: Dimensions.get('window').width,
		height: 230,
	},
	container: {
		flex: 1,
	},
	rowflex: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10,
	},
	head: {
		height: 80,
		width: 80,
	},
	headText: {
		fontSize: 25,
		color: 'black',
		flex: 1,
		textAlign: 'center',
	},
	normalText: {
		fontSize: 15,
		color: 'black',
		flex: 1,
		textAlign: 'center',
	},
	button: {
		backgroundColor: 'red',
		padding: 10,
	}
})