import React from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	Image,
	Text,
	TouchableOpacity
} from 'react-native';
import CompleteOrder from '../pages/CompleteOrder.js'

let ITEMHEIGHT = 100;
export default class CarItem extends React.Component {
	constructor(props) {
		super(props);
		this.selected = this.selected.bind(this);
	}

	selected(car) {
		let navigator = this.props.navigator;
		navigator.push({
			component: CompleteOrder,
			params: {
				car: car
			}
		})
	}

	render() {
		let car = {
			img: this.props.img,
			name: this.props.name,
			load: this.props.load,
			length: this.props.length,
			width: this.props.width,
			height: this.props.height,
			price: this.props.price,
			beyondPrice: this.props.beyondPrice,
			cornerColor: this.props.cornerColor,
		}
		return (
			<TouchableOpacity style={styles.item} activeOpacity={0.6} onPress={()=>this.selected(car)}>
				<View style={styles.leftItem}>
					<View style={[styles.cornerColor,{backgroundColor:car.cornerColor}]}></View>
					<View style={styles.imgView}>
						<Image source={car.img} style={styles.img} />
					</View>
				</View>
				<View style={styles.middleItem}>
					<View style={styles.topTextView}>
						<Text style={styles.toptext}>{car.name}</Text>
						<Text style={[styles.toptext,{color:'red'}]}>
						{car.price}
						<Text style={styles.text}>元 (5公里)</Text>
					</Text>
					</View>
					<Text style={styles.text}>载重：{car.load}吨</Text>
					<Text style={styles.text}>长*宽*高：{car.length}*{car.width}*{car.height}m</Text>
					<Text style={styles.text}>超公里费：{car.beyondPrice}元/1公里</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

let width = Dimensions.get('window').width;
let styles = StyleSheet.create({
	item: {
		height: ITEMHEIGHT,
		flexDirection: 'row',
		width: width - 30,
		alignSelf: 'center',
		borderRadius: 15,
		backgroundColor: '#ffffff',
		marginTop: 7,
		borderColor: 'black',
		borderWidth: 1,
		borderStyle: 'solid',
	},
	leftItem: {
		flex: 2,
	},
	middleItem: {
		flex: 3,
	},
	cornerColor: {
		width: width / 12,
		flex: 1,
		borderTopLeftRadius: 15,
		borderBottomRightRadius: 15,
	},
	imgView: {
		flex: 2,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	img: {
		width: width / 5,
		height: 200 / 3
	},
	toptext: {
		fontSize: 16,
		color: 'black',
		marginTop: 5
	},
	topTextView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingRight: 20,
	},
	text: {
		color: '#646464',
		fontSize: 12,
		marginTop: 5,
	},
})