import { StatusBar } from 'expo-status-bar';
import Navigation from './navigations';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  return (
    <UserProvider>
      <StatusBar style={'dark'} />
      <Navigation />
    </UserProvider>
  );
};

export default App;
