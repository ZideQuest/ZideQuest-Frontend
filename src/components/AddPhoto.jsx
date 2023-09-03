import React from 'react'
import {
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import photo_icon from "../../assets/images/photo.png";
import picture_icon from "../../assets/images/picture.png";
import * as ImagePicker from "expo-image-picker";

function AddPhoto({ image, setImage }) {
    const onPressImage = async () => {
        try {
            const results = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (results.granted) {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 0,
                    base64: true,
                });

                if (!result.canceled) {
                    setImage(result.assets[0])
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onPressCamera = async () => {
        const results = await ImagePicker.requestCameraPermissionsAsync();
        if (results.granted) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
            });
            if (!result.canceled) {
                this.setState({
                    image: result,
                    token:
                        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTMxMjg3Y2YyNDQzYmY0NmJmMzAwNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkzMDU4MzM1LCJleHAiOjE2OTMwNjE5MzV9.cFkk39NtyXqpNSzy-ZegzQzVbMhEJTBjb9wjiohwLe5CmfTKxTyswWfjVy2zLy3m6cBAThYYPI-PPUzXJz6TctiJS7dqL7EovLM6CAC6nFpGety0su8GAjGZN5h5cQGmxKsV9CtIGD0e-b8FjV5QEX00xa79ud237BVKdAOGToJ7AHl9Dm9jyxD82prt3CPEK6R05h8ffsp0fgne8fbxnniNoy3LwfrstfPegUsgGX3SoRBPNZMVXl-4uNYKXGdQtVIXvlDEmt289m66_DIjur6p5tYGTm0TYKFG1iJiUQldOb0l2icEInCjrdfPZx9TQiAjMO-yeCxOWcpAwJ8fPw",
                });
            }
        }
    }

    return (
        <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={onPressCamera}>
                <Image source={photo_icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressImage}>
                <Image source={picture_icon} />
            </TouchableOpacity>
        </View>
    )
}

export default AddPhoto