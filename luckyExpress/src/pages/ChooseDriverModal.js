import React from 'react';
import {
	Modal,
	View,
	Text,
	StyleSheet,
	PanResponder,
	ScrollView
} from 'react-native';
import {
	Icon
} from 'react-native-elements'
import TopBar from '../component/TopBar.js'
import DriverBar from '../component/DriverBar.js'

export default class ChooseDriverModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			closeModal: props.closeModal,
		}
		this.handlePanResponderMove = this.handlePanResponderMove.bind(this);
		this.renderDriverBar = this.renderDriverBar.bind(this);
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderMove: this.handlePanResponderMove,
		});
	}

	handlePanResponderMove(evt, gestureState) {
		let dy = gestureState.dy;
		if (dy > 50) {
			this.state.closeModal();
		}
	}

	renderDriverBar() {
		let datas = this.props.datas || [];
		return (
			datas.map(data => {
				return (
					<DriverBar 
						data={data} 
						user={this.props.user}
						key={data.name}
						orderInf={this.props.orderInf}
						navigator={this.props.navigator}
						car={this.props.car}
						orderid={this.props.orderid}
						closeModal={this.state.closeModal}/>
				)
			})
		)
	}

	render() {
		return (
			<Modal
				animationType={"slide"}
				visible={this.props.modalVisible}
				onRequestClose={()=>false}
				closeModal={this.props.closeModal}
				transparent={true}>
				<View style={styles.container}>
					<View style={styles.rowView}
						{...this._panResponder.panHandlers}>
						<Icon name='angle-double-down' type='font-awesome' color='red'/>
						<Text>共有
							<Text style={styles.importentText}>
								{this.props.driverCount}
							</Text>位司机响应您的请求
						</Text>
						<Icon name='angle-double-down' type='font-awesome' color='red'/>
					</View>
				</View>
				<ScrollView>
					{this.renderDriverBar()}
				</ScrollView>
			</Modal>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		paddingTop: 256
	},
	rowView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		backgroundColor: 'white',
	},
})