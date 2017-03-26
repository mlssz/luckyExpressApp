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
			leftValue: props.leftValue,
			rightValue: props.rightValue,
			leftValueStyle: props.leftValueStyle,
			rightValueStyle: props.rightValueStyle,
		}
	}

	render() {
		return (
			<View style={[styles.textView,this.state.textView]}>
				<Text style={[styles.leftValueStyle,this.state.leftValueStyle]}>
					{this.state.leftValue}
				</Text>
				<Text style={[styles.rightValueStyle,this.state.rightValueStyle]}>
					{this.state.rightValue}
				</Text>
			</View>
		)
	}
}

RowTwoText.defaultProps = {
	textViewStyle: {},
	leftValue: false,
	rightValue: false,
	leftValueStyle: {},
	rightValueStyle: {},
}

RowTwoText.PropTypes = {
	textViewStyle: React.PropTypes.object,
	leftValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	rightValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	leftValueStyle: React.PropTypes.object,
	rightValueStyle: React.PropTypes.object,
}

let styles = StyleSheet.create({
	textView: {
		flex: 1,
		flexDirection: 'row',
		marginVertical: 5,
	},
	leftValueStyle: {
		flex: 1,
		fontSize: 15,
		textAlign: 'left',
	},
	rightValueStyle: {
		flex: 3,
		fontSize: 15,
		color: 'black',
		textAlign: 'left',
	},
	leftViewStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rightViewStyle: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
	}
})