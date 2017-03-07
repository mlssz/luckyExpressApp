/*
 * author : yummyLcj
 * email  : luchenjiemail@gmail.com
 * func   : one text and textInput for form
 * props  : {
 * 	containerStyle
 * 	textStyle
 * 	inputStyle
 * 	value
 * 	forminput
 * 	onChangeText
 * 	secureTextEntry
 * 	maxLength
 * 	rigthEle
 * 	underlineColorAndroid
 * }
 */
import React from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet
} from 'react-native';

export default class FormElement extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let column = this.props.column;
		let container = column ? columnStyles.container : styles.container;
		let textStyle = column ? columnStyles.textStyle : styles.textStyle;
		let inputStyle = column ? columnStyles.inputStyle : styles.inputStyle;
		return (
			<View style={[container,this.props.containerStyle]}>
				<Text 
					style={[textStyle,this.props.textStyle]}>
					{this.props.formInput}
				</Text>
				{this.props.noInput?false:
				<TextInput
					style={[inputStyle,this.props.inputStyle]}
					placeholder={this.props.placeholder}
					placeholderTextColor={this.props.placeholderTextColor}
					underlineColorAndroid='#EDEDED'
					value={this.props.value}
					onChangeText={this.props.onChangeText}
					secureTextEntry={this.props.secureTextEntry}
					maxLength={this.props.maxLength}/>}
				{this.props.rightEle?this.props.rightEle:false}
			</View>
		)
	}
}

FormElement.defaultProps = {
	containerStyle: {},
	textStyle: {},
	inputStyle: {},
	placeholder: '',
	value: '',
	onChangeText: () => {},
	secureTextEntry: false,
	maxLength: 999,
	underlineColorAndroid: 'transparent',
}

FormElement.porpTypes = {
	containerStyle: React.PropTypes.object,
	textStyle: React.PropTypes.object,
	inputStyle: React.PropTypes.object,
	placeholder: React.PropTypes.string,
	value: React.PropTypes.string,
	onChangeText: React.PropTypes.func,
	secureTextEntry: React.PropTypes.bool,
	maxLength: React.PropTypes.number,
	rightEle: React.PropTypes.element,
	underlineColorAndroid: React.PropTypes.string,
}

let styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	textStyle: {
		fontSize: 16,
		color: 'black',
		marginRight: 10,
		minWidth: 50,
		textAlign: 'center'
	},
	inputStyle: {
		flex: 1,
		backgroundColor: '#e8e8e8',
		opacity: 1,
	}
});

let columnStyles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	textStyle: {
		fontSize: 14,
		color: 'black',
		textAlign: 'left'
	},
	inputStyle: {
		flex: 1,
		opacity: 1,
		color: 'black',
		padding: 5,
		margin: 0,
	}
})