import React from 'react'
import {
	View,
	Image,
	TextInput,
	StyleSheet
} from 'react-native'

export default class SearchBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.searchBar}>
				<Image 
					source={require('../img/search.png')}
					style={styles.img}/>
					<TextInput
						value={this.props.value}
						onChangeText={this.props.onChangeText}
						placeholder={this.props.placeholder}
						style={styles.textInput}
						/>
			</View>
		)
	}
}

SearchBar.defaultProps = {
	value: '',
	placeholder: '',
}

SearchBar.propTypes = {
	value: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	onChangeText: React.PropTypes.func,
}
let styles = StyleSheet.create({
	searchBar: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#EDEDED',
		borderStyle: 'solid',
		paddingBottom: 5,
	},
	img: {
		height: 16,
		width: 16,
	},
	textInput: {
		flex: 1,
		padding: 0,
		paddingLeft: 3,
	}
})