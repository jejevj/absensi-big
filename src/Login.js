import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet, Alert } from 'react-native';
// import * as SplashScreen from 'expo-splash-screen';

import { useTheme, Text, TextInput, Button, Card, Avatar } from 'react-native-paper';

export default function Login() {

    const theme = useTheme();
    // State to store username and password input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


    // Handle login
    const handleLogin = () => {
        if (username === '' || password === '') {
            Alert.alert('Error', 'Please enter both username and password.');
        } else {
            // For now, just show an alert. You can replace this with authentication logic.
            Alert.alert('Login Success', `Welcome, ${username}!`);
        }
    };

    return (
        <>
            <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
                <Card style={{ backgroundColor: 'transparent', borderWidth: 0, shadowColor: 'transparent' }}>
                    <Card.Cover style={{ backgroundColor: 'transparent' }} resizeMode='center' resizeMethod='scale' source={{ uri: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhx7ZrWg6dJL76oG61l3WvGfEvsvYaFN5g4TkKFIyfQ_l-N1TW3wOW8tW4k__t-yTLX3ttZ8nyr8B1a3apPpe51pyTgJObkTdUZsMI-Myd_Y4kKlq2cFsvsxBCMdXqZZaYSVg6B6r26CkSsBhWWPz1c6jIZzu9vga9bRU9nQAEkFqmx1_Sxg5BYVGetjno/s1051/Logo%20Bima%20Indo%20Garda%20Jan%202021%20PNG.png' }} />
                </Card>
                <Text variant="headlineMedium" theme={theme.colors.onSurface} style={{ textAlign: 'center' }}>E-ABSEN</Text>
                <Text variant="labelLarge" theme={theme.colors.onSurface} style={{ textAlign: 'center' }}>Silahkan Login</Text>

                {/* Username Input */}
                <TextInput
                    style={styles.input}
                    label="NIK"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    label="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                />
                {/* Login Button */}

                <Button icon="login" mode="contained" onPress={handleLogin} style={{ marginTop: 10 }}>
                    Login
                </Button>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#f8f8f8',
        padding: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        // padding: 10,
        marginVertical: 10,
        // borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});
