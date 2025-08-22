import * as React from 'react';
import { AppRegistry, StatusBar, useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './src/Home';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import Login from './src/Login'; // Assuming you have a Login screen component
import Home from './src/Home';

export default function Main() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  // Manage the login state (change it based on real authentication logic)
  const [isLoggedIn, setIsLoggedIn] = React.useState(true); // Default is false

  // You can update `isLoggedIn` based on actual authentication logic like token validation
  const handleLogin = () => {
    setIsLoggedIn(true); // Change this when the user successfully logs in
  };

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar barStyle="dark-content" />

      {isLoggedIn ? <Home /> : <Login onLogin={handleLogin} />} 
      
      </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
