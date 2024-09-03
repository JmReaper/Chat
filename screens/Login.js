import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Alert, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import tw from "twrnc";  // Tailwind CSS for React Native

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const onHandLogin = () => {
    if (email !== "" && password !== "") {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setLoading(false);
          Alert.alert("Login Success", "You are logged in!");
          navigation.navigate("Home"); // Navigate to your home screen
        })
        .catch((err) => {
          setLoading(false);
          setLoginError(true);
          Alert.alert("Login Error", err.message);
        });
    }
  };

  return (
    <SafeAreaView style={tw`h-full bg-gray-900`}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={tw`flex-1 p-5`}>
        <View style={tw`flex-1 justify-center items-center`}>
          {/* Removed Image Component */}
          <Text style={tw`text-white text-2xl font-medium mb-10`}>
            Welcome Back!
          </Text>
          <View style={tw`w-full`}>
            {loginError && (
              <Text style={tw`text-lg text-rose-500 mb-4`}>
                Incorrect Email / Password
              </Text>
            )}
            <View style={tw`mb-6`}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#7b7b8b"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                style={tw`border border-gray-300 bg-white h-12 rounded-xl px-4`}
              />
            </View>
            <View style={tw`mb-6`}>
              <View style={tw`flex-row items-center border border-gray-300 bg-white h-12 rounded-xl px-4`}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#7b7b8b"
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry={!showPassword}
                  style={tw`flex-1`}
                />
                <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                  {/* Placeholder for visibility toggle */}
                  <Text style={tw`w-6 h-6`}>{showPassword ? '🙈' : '👁️'}</Text>
                </Pressable>
              </View>
            </View>
            <TouchableOpacity
              style={tw`bg-blue-500 p-3 rounded-xl flex items-center`}
              onPress={onHandLogin}
              disabled={loading}
            >
              <View style={tw`flex-row items-center justify-center`}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={tw`text-white text-lg font-medium`}>
                    Login
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            <View style={tw`flex-row justify-between mt-4`}>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={tw`text-white text-lg`}>
                  Create an Account
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={tw`text-sky-300 text-lg`}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
