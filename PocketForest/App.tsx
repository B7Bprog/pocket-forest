import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { UserContext } from './contexts/User';
import { useState } from 'react';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [loggedInUser, setLoggedInUser] = useState('');
  const isLoggedIn = Object.keys(loggedInUser).length > 0;

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <UserContext.Provider value = {{loggedInUser, setLoggedInUser, isLoggedIn}}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
      </UserContext.Provider>
    );
  }
}
