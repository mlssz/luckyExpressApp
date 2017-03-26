import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native';
import {
	Icon
} from 'react-native-elements';
import EnsureRec from '../pages/EnsureRec.js'

export default class OrderItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			order: props.order
		}
		this.nextPage = this.nextPage.bind(this);
	}

	nextPage() {
		this.props.navigator.push({
			component: EnsureRec,
			params: {
				order: this.state.order
			}
		})
	}

	render() {
		let order = this.state.order;
		let type = null;
		if (order.status === 6)
			type = '预约';
		if (order.status === 0)
			type = '系统';
		if (order.status === 1)
			type = '自主';
		let color = {
			backgroundColor: order.status === 6 ? '#00CEAC' : '#DF5C62'
		};
		let borderColor = {
			borderColor: order.status === 6 ? '#00CEAC' : '#DF5C62'
		}
		let endPlace = JSON.parse(order.endplace) || [{
			name: ''
		}];
		endPlace = endPlace[endPlace.length - 1].name;
		let date = new Date(order.starttime);
		date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
		return (
			<TouchableOpacity 
				style={[styles.container,borderColor]} 
				activeOpacity={0.6}
				onPress={this.nextPage}>
				<View style={{flex:1,flexDirection:'row'}}>
					<View style ={styles.rowFlex}>
						<Text style={[styles.leftTopText,color]}>{type}</Text>	
					</View>
					<View style ={[styles.rowFlex,{flex:2}]}>
						<Text>{date}</Text>
					</View>
					<View style ={styles.rowFlex}>
						<Icon name='delete' color='#3385ff'/>
					</View>
				</View>
				
				<View style={{flex:2,flexDirection:'row'}}>
					<View style={{flex:2}}>
						<View style={styles.leftRow}>
							<Icon name='subject'/>
							<Text>{order.startplace}</Text>	
						</View>
						<View style={styles.leftRow}>
							<Icon name='subject'/>
							<Text>{endPlace}</Text>	
						</View>
					</View>
					<View style={styles.rowFlex}>
						<Text>{order.fee}元</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		height: 120,
		marginTop: 5,
		borderLeftWidth: 8,
		borderRightWidth: 8,
		borderStyle: 'solid',
		backgroundColor: 'white',
	},
	leftTopText: {
		fontSize: 15,
		textAlign: 'center',
		textAlignVertical: 'center',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderTopLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	rowFlex: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	leftRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		justifyContent: 'flex-start',
		paddingLeft: 20,
	}
})