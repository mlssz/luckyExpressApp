import React from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class UpLoadBlock extends React.Component {
	constructor(props) {
		super(props);
		this.upLoad = this.upLoad.bind(this);
	}

	upLoad() {

	}

	render() {
		return (
			<TouchableOpacity style={[styles.button,this.props.buttonStyle]} onPress={this.upLoad}>
				<Text>{this.props.name}</Text>
				<Icon name="upload" size={30} />
			</TouchableOpacity>
		)
	}
}

let styles = StyleSheet.create({
	button: {
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20,
		marginBottom: 10,
	}
})