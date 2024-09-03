import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Alert, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import tw from "twrnc";  // Tailwind CSS for React Native

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState(false);

  const onHandSignup = () => {
    if (email !== "" && password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        Alert.alert("Password Mismatch", "Passwords do not match.");
        return;
      }
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          setLoading(false);
          Alert.alert("Signup Success", "Your account has been created!");
          navigation.navigate("Home"); // Navigate to your home screen
        })
        .catch((err) => {
          setLoading(false);
          setSignupError(true);
          Alert.alert("Signup Error", err.message);
        });
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <SafeAreaView style={tw`h-full bg-gray-900`}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={tw`flex-1 p-5`}>
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-white text-2xl font-medium mb-10`}>
            Create an Account
          </Text>
          <View style={tw`w-full`}>
            {signupError && (
              <Text style={tw`text-lg text-rose-500 mb-4`}>
                Error creating account. Please try again.
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
            <View style={tw`mb-6`}>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#7b7b8b"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry={!showPassword}
                style={tw`border border-gray-300 bg-white h-12 rounded-xl px-4`}
              />
            </View>
            <TouchableOpacity
              style={tw`bg-blue-500 p-3 rounded-xl flex items-center`}
              onPress={onHandSignup}
              disabled={loading}
            >
              <View style={tw`flex-row items-center justify-center`}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={tw`text-white text-lg font-medium`}>
                    Sign Up
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            <View style={tw`flex-row justify-between mt-4`}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={tw`text-sky-300 text-lg`}>
                  Already have an account? Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
