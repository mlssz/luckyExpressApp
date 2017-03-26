import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import Topbar from '../component/TopBar.js'
import App from '../App.js'
export default class ReceiveResult extends React.Component {
	constructor(props) {
		super(props);
		this.getBack = this.getBack.bind(this);
	}

	getBack() {
		this.props.navigator.resetTo({
			component: App,
		})
	}

	render() {
		return (
			<View style={{flex:1}}>
				<Topbar title='抢单结果'/>
				<View style={styles.container}>
					<Text style={styles.text}>恭喜您抢单成功!</Text>
					<Text style={styles.text}>您可以进入订单管理查看订单详情!</Text>
					<View style={{flexDirection:'row',alignItems:'center'}}>
						<TouchableOpacity style={styles.button} onPress={this.getBack}>
							<Text>返回首页</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 20,
	},
	button: {
		backgroundColor: '#43A4E8',
		padding: 5,
	}
})