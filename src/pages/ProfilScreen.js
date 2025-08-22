import * as React from "react";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { Avatar, Badge, Button, Card, Text, TextInput, useTheme } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';

export default function ProfilScreen() {
    const [text, setText] = React.useState('');
    const theme = useTheme();
    const [image, setImage] = React.useState(null);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    return (


        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <ScrollView>
                <Text variant="titleLarge" style={{ color: theme.colors.onSurface, textAlign: 'center' }}>Profil</Text>
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <Badge onPress={pickImage} size={35} style={{backgroundColor:'transparent', marginTop:-20, marginEnd:120, marginBottom:-30}}>
                        <Avatar.Icon size={35} icon="pencil" style={{zIndex:100}} /> 
                    </Badge>

                    <Avatar.Image
                        size={80}
                        source={{
                            uri: image ? image : "https://cdn-icons-png.flaticon.com/256/5600/5600583.png"
                        }}
                    />

                </View>
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text variant="titleMedium" style={{ color: theme.colors.onSurface, textAlign: 'center' }}>Nama Pengguna</Text>
                    <Text variant="bodyMedium" style={{ color: theme.colors.onSurface, textAlign: 'center' }}>Jabatan</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        label="Nama Lengkap"
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        keyboardType="numeric"
                        label="Nomor HP"
                        // value={text}
                        onChangeText={text => setText(text)}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        label="Password"
                        secureTextEntry
                        right={<TextInput.Icon icon="eye" />}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Button icon="check" mode="contained" onPress={console.log("hi")}>
                        Simpan Perubahan
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    content: {
        padding: 10,
    },
    row: {
        flexDirection: 'row', // Ensure columns are in a row
        justifyContent: 'center', // Space out columns evenly
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        margin: 5
    },
    text: {
        textAlign: 'center',
    },
    icon: {
        marginBottom: 5, // Space between icon and text
        textAlign: 'center',
    },
});