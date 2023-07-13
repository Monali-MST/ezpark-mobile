import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Pressable } from "react-native";
import extStyles from "../styles/extStyles";
// import ImagePicker from "react-native-image-picker";
// import  { BlobServiceClient } from "@azure/storage-blob";
import axios from "axios";

const MyProfile = props =>{
    // const uploadProfilePicture = async () => {
    //     const connectionString = 'DefaultEndpointsProtocol=https;AccountName=ezparkprofilepics;AccountKey=k9Wik4ZNq11gEhTKO51Jg0WFXjiSGh/a04OUGjlY9vay8Rdftm3mm3+OtqLCniv3RkJw/pbssfgY+AStDRnqUA==;EndpointSuffix=core.windows.net';
        
    //     const containerName = 'profilepics';
        
    //     ImagePicker.showImagePicker({}, async (response) => {
    //       if (!response.didCancel && !response.error) {
    //         const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    //         const containerClient = blobServiceClient.getContainerClient(containerName);
    //         const fileName = 'profile_picture.jpg';
    //         const blobClient = containerClient.getBlockBlobClient(fileName);
      
    //         await blobClient.uploadData(response.data, { blobHTTPHeaders: { blobContentType: response.type } });
      
    //         // Display success message or perform further actions
    //         console.log('Profile picture uploaded successfully');
    //       }
    //     });
    //   };

    return(
        <SafeAreaView style={extStyles.body}>
            <View>
                <Text>Profile picture screen</Text>
                <Pressable style={{width: 50, height: 40, backgroundColor: "#F00"}}>
                    <Text>Upload Image</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    );
}

const intStyles = StyleSheet.create({

});

export default MyProfile;