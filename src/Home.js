import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text, Provider, PaperProvider, useTheme, Appbar, Menu, Button, Divider, Icon } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './pages/Homescreen';
import HistoryScreen from './pages/HistoryScreen';
import IzinScreen from './pages/IzinScreen';
import PatroliScreen from './pages/PatroliScreen';
import ProfilScreen from './pages/ProfilScreen';
import CameraScreen from './pages/CameraScreen';


function SettingsScreen() {
    const theme = useTheme();
    return (
        <View style={{ backgroundColor: theme.colors.surface, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: theme.colors.onSurface }}>Settings!</Text>
        </View>
    );
}

function PengaturanScreen() {
    const theme = useTheme();
    return (
        <View style={{ backgroundColor: theme.colors.surface, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: theme.colors.onSurface }}>Pengaturan</Text>
        </View>
    );
}

export default function MyComponent() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(false);

    const routes = [
        { key: 'home', title: 'Home', icon: 'home' },
        { key: 'history', title: 'History', icon: 'history' },
        { key: 'camera', icon: 'camera' },
        { key: 'izin', title: 'Izin', icon: 'file-document' },
        { key: 'history-patroli', title: 'Patroli', icon: 'car-clock' },
        { key: 'pengaturan', title: 'Settings', icon: 'cog' },
        { key: 'profil', title: 'Profile', icon: 'account-circle' },
    ];

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'home':
                return <HomeScreen />;
            case 'settings':
                return <SettingsScreen />;
            case 'history':
                return <HistoryScreen />;
            case 'patroli':
                return <HistoryScreen />;
            case 'history-patroli':
                return <PatroliScreen />;
            case 'izin':
                return <IzinScreen />;
            case 'camera':
                return <CameraScreen />;
            case 'pengaturan':
                return <PengaturanScreen />;
            case 'profil':
                return <ProfilScreen />;
            default:
                return null;
        }
    };


    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    const theme = useTheme();
    const _handleMenuItemPress = (routeKey) => {
        setIndex(routes.findIndex(r => r.key === routeKey));  // Set the active screen based on menu item
        setVisible(false);  // Close the menu after selection
    };
    return (

        <PaperProvider>
            <StatusBar barStyle="dark-content" />
            <Appbar.Header dark={false}>
                <Appbar.Content title="E-ABSENSI" />
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
                    <Menu.Item leadingIcon="account-circle" onPress={() => _handleMenuItemPress('profil')} title="Profil" />
                    {/* <Menu.Item leadingIcon="cog" onPress={() => _handleMenuItemPress('pengaturan')} title="Pengaturan" /> */}
                    <Divider />
                    <Menu.Item leadingIcon="logout" onPress={() => { }} title="Keluar" />
                </Menu>


            </Appbar.Header>

            {renderScene({ route: routes[index] })}


            <BottomNavigation.Bar
                navigationState={{ index, routes: routes.filter(route => route.key !== 'pengaturan' && route.key !== 'profil') }}  
                onTabPress={({ route }) => {
                    const newIndex = routes.findIndex((r) => r.key === route.key);
                    if (newIndex !== -1) {
                        setIndex(newIndex);
                    }
                }}
                renderIcon={({ route, color }) => (

                    <MaterialCommunityIcons name={route.icon} size={24} color={color} />
                )}
                getLabelText={({ route }) => (index === routes.findIndex(r => r.key === route.key) ? route.title : '')}
            />
        </PaperProvider>
    );
}