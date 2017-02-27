import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	TextInput
} from 'react-native'
import {
	Icon
} from 'react-native-elements';
import ReceivingInf from '../../pages/ReceivingInf.js'
export default class RoadItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			road: this.props.road,
			delete: this.props.canDelete,
			place: this.props.place,
			index: this.props.index,
			changeRoad: this.props.changeRoad,
		}
		this.renderDelete = this.renderDelete.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.changeRoad = this.changeRoad.bind(this);
	}

	renderDelete() {
		return (
			<Icon name='delete' 
				color='blue' 
				onPress={()=>this.props.deleteRoad(this.props.index)}/>
		)
	}

	changeRoad(road) {
		this.setState({
			road
		});
		this.state.changeRoad(road, this.state.index);
	}

	nextPage() {
		let navigator = this.props.navigator;
		navigator.push({
			component: ReceivingInf,
			params: {
				changeRoad: this.changeRoad,
				index: this.state.index,
				road: this.state.road
			}
		})
	}

	render() {
		return (
			<TouchableOpacity 
				style={styles.itemView}
				activeOpacity={0.6}
				onPress={this.nextPage}>
				<Icon name='face'/>
				<TextInput 
					style={styles.itemText}
					value={this.state.road.name}
					editable={false}
					placeholder='请输入目的地'
					placeholderTextColor='gray'/>
				{this.state.delete?this.renderDelete():false}
			</TouchableOpacity>
		)
	}
}

let styles = StyleSheet.create({
	itemView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 20,
		marginRight: 20,
		paddingTop: 2,
		paddingBottom: 2,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderBottomColor: '#EDEDED',
	},
	itemText: {
		flex: 1,
		marginLeft: 10,
		padding: 0,
		color: 'black'
	}
})

RoadItem.defaultProps = {
	canDelete: false,
	place: 'middle'
}

RoadItem.propTypes = {
	road: React.PropTypes.object.isRequired,
	canDelete: React.PropTypes.bool,
	place: React.PropTypes.oneOf(['start', 'middle', 'end']),
}