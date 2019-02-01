import { createSwitchNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import Loading from './screens/Loading';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Home from './screens/Home';
import Drawer from './components/Drawer';

const AuthNavigator = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Home
  },
  {
    initialRoute: 'Loading',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Home: AuthNavigator
  },
  {
    contentComponent: Drawer
  }
);

export default createAppContainer(AppNavigator);
