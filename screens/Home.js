import React, { useEffect } from "react";
import { Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc"; // Importing Tailwind for React Native

const logoImage = "icon.png";

const Home = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Text style={tw`text-lg text-gray-500 ml-4`}>Search</Text> // Using Tailwind for styling
            ),
            headerRight: () => (
                <Image
                    source={require(`../assets/${logoImage}`)}
                    style={tw`w-6 h-6 mr-4`} // Using Tailwind for styling
                />
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView style={tw`flex-1 justify-center items-center bg-gray-100`}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={tw`bg-blue-500 p-4 rounded`} // Example styling
            >
                <Text style={tw`text-white text-lg`}>Go to Chat</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Home;
