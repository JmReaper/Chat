import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    const onSignOut = () => {
        signOut(auth).catch(error => console.log(error));
    };

    // Configure header options
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={onSignOut}>
                    <AntDesign name="logout" size={24} color="black" />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    // Fetch messages from Firestore
    useEffect(() => {
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, snapshot => {
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const onSend = useCallback(async (newMessages = []) => {
        const message = newMessages[0];
        const { text, createdAt, user } = message;
        await addDoc(collection(database, 'chats'), {
            text,
            createdAt,
            user
        });
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth.currentUser?.email,
                avatar: 'https://i.pravatar.cc/300'
            }}
        />
    );
}
