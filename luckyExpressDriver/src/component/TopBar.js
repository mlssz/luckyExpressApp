import React from 'react';
import {
	View,
	StyleSheet,
	Text
} from 'react-native';
import {
	Icon
} from 'react-native-elements'

let NAV_HEIGHT = 56;

export default class TopBar extends React.Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		back: React.PropTypes.bool,
		title: React.PropTypes.string.isRequired,
		leftItem: React.PropTypes.element,
		rightItem: React.PropTypes.element,
		light: React.PropTypes.bool,
	}

	backPage() {
		let nav = this.props.navigator;
		if (nav)
			nav.pop();
	}

	backIcon() {
		return (
			<Icon
		name = 'arrow-back'
				color='gray'
				size={26}
				onPress={()=>this.backPage()}
			/>
		)
	}

	customLeftItem() {
		if (!this.props.leftItem)
			return false;
		else
			return this.props.leftItem;
	}

	customRightItem() {
		if (!this.props.rightItem)
			return false;
		else
			return this.props.rightItem;
	}

	render() {
		let style = {};
		if (this.props.dark) {
			style = {
				backgroundColor: '#EDEDED',
			}
		}
		return (
			<View style={[styles.topbar,style]}>
				<View style={[styles.containerView,styles.leftContainer]}>
					{this.props.back?this.backIcon():this.customLeftItem()}
				</View>
				<View style={styles.containerView}>
					<Text style={styles.middleFont}>{this.props.title}</Text>
				</View>
				<View style={[styles.containerView,styles.rightContainer]}>
					{this.customRightItem()}
				</View>
			</View>
		)
	}

}

let styles = StyleSheet.create({
	topbar: {
		height: NAV_HEIGHT,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
	},
	containerView: {
		flex: 1,
	},
	leftContainer: {
		alignItems: 'flex-start',
		paddingLeft: 20,
	},
	middleFont: {
		alignSelf: 'center',
		fontSize: 16,
		color: 'black'
	},
	rightContainer: {
		alignItems: 'flex-end',
		paddingRight: 20,
	}
})