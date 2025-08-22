import { registerRootComponent } from 'expo';
import App from './App';

// This is important for splash screen setup in bare workflow
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();  // Ensure splash screen stays until the app is ready

registerRootComponent(App);
