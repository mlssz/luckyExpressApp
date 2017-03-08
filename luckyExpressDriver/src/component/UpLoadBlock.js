import React from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class UpLoadBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			uri: false
		}
		this.chooseImg = this.chooseImg.bind(this);
	}

	chooseImg() {
		let options = {
			title: '选择图片',
			cancelButtonTitle: '取消',
			takePhotoButtonTitle: '拍照',
			chooseFromLibraryButtonTitle: '相册',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		ImagePicker.showImagePicker(options, (response) => {
			// console.log('Response = ', response);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				console.log(response)
				this.setState({
					uri: response.uri
				})
				let path = 'file://' + response.path;
				let formData = new FormData();
				let file = {
					uri: path,
					type: 'multipart/form-data',
					name: 'a.jpg'
				};
				formData.append("file", file);
				formData.append('uid', this.props.id);
				formData.append('token', this.props.token);
				formData.append('type', this.props.type);
				this.props.addPic(formData, this.props.index);
			}
		});
	}

	render() {
		console.log(this.state.uri)
		return (
			<TouchableOpacity style={[styles.button,this.props.buttonStyle]} onPress={this.chooseImg}>
				<Text>{this.props.name}</Text>
				{
					this.state.uri?
						<Image source={{uri:this.state.uri}} style={{width:300,height:300}}/>
					:
						<Icon name="upload" size={30}/>
				}	
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