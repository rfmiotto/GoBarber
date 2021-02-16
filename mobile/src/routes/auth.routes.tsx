import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateAccount from '../pages/CreateAccount';
import SignIn from '../pages/SignIn';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
    initialRouteName="SignIn"
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="CreateAccount" component={CreateAccount} />
  </Auth.Navigator>
);

export default AuthRoutes;
