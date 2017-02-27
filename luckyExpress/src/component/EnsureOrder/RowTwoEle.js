import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native'

export default class RowTwoText extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			textViewStyle: props.textViewStyle,
			leftViewStyle: props.leftViewStyle,
			rightViewStyle: props.rightViewStyle,
		}
	}

	render() {
		return (
			<View style={[styles.textView,this.state.textView]}>
				<View style={[styles.leftViewStyle,this.state.leftViewStyle]}>
					{this.props.children[0]}
				</View>
				<View style={[styles.rightViewStyle,this.state.rightViewStyle]}>
					{this.props.children[1]}
				</View>
			</View>
		)
	}
}

RowTwoText.defaultProps = {
	textViewStyle: {},
	leftViewStyle: {},
	rightViewStyle: {},
}

RowTwoText.PropTypes = {
	textViewStyle: React.PropTypes.object,
	leftViewStyle: React.PropTypes.object,
	rightViewStyle: React.PropTypes.object,
}

let styles = StyleSheet.create({
	textView: {
		flex: 1,
		flexDirection: 'row',
		marginVertical: 3,
	},
	leftViewStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rightViewStyle: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'flex-start',
	}
})