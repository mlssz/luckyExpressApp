import React from 'react';
import {
	View,
	Modal,
	StyleSheet,
	Text,
	TouchableHighlight,
} from 'react-native';
import Rolling from './Rolling.js';

export default class TimePicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animationType: this.props.animationType,
			transparent: this.props.transparent,
			onRequestClose: this.props.onRequestClose,
		}
		this.closeModal = this.closeModal.bind(this);
		this.ensureModal = this.ensureModal.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			visible: props.visible,
		})
	}

	closeModal() {
		this.props.closeTime();
	}

	ensureModal() {
		this.closeModal();
	}

	render() {

		return (
			<Modal
				visible={this.props.visible}
				animationType={this.state.animationType}
          		transparent={this.state.transparent}
          		onRequestClose={this.state.onRequestClose}>
				<View style={styles.modalView}>
					<View style={styles.selectionView}>
						<View style={styles.selectionTop}>
							<TouchableHighlight 
								onPress={this.closeModal}
								underlayColor='gray'
								style={styles.button}>
								<Text>取消</Text>
							</TouchableHighlight>
							<TouchableHighlight
								onPress={this.ensureModal}
								underlayColor='red'
								style={styles.button}>
								<Text>确定</Text>
							</TouchableHighlight>
						</View>
						<View style={styles.rollingView}>
							<Rolling/>
						</View>
					</View>
				</View>
			</Modal>
		)
	}
}

let styles = StyleSheet.create({
	modalView: {
		backgroundColor: 'black',
		flex: 1,
		opacity: 0.8,
		justifyContent: 'flex-end'
	},
	selectionView: {
		backgroundColor: '#FFFFFF',
		height: 250,
	},
	selectionTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 5,
	},
	button: {
		padding: 10
	},
	rollingView: {
		flexDirection: 'row',
		flex: 1,
	}
})

TimePicker.defaultProps = {
	visible: false,
	onRequestClose: () => console.log('model closed!'),
	animationType: 'none',
	transparent: true,
}

TimePicker.propTypes = {
	visible: React.PropTypes.bool,
	onRequestClose: React.PropTypes.func,
	animationType: React.PropTypes.oneOf(['none', 'slide', 'fade']),
	transparent: React.PropTypes.bool
}