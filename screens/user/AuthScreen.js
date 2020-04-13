import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const { Navigator, Screen } = createStackNavigator();

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#2193b0', '#6dd5ed']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitialize="none"
              errorMessage="Please enter a valid email address"
              onInputChange={() => {}}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitialize="none"
              errorMessage="Please enter a valid email password"
              onInputChange={() => {}}
              initialValue=""
            />
            <Button
              title="Login"
              buttonStyle={{
                backgroundColor: Colors.primary,
                marginVertical: 10,
              }}
              onPress={() => {}}
            />
            <Button
              title="Swith to signup"
              buttonStyle={{
                backgroundColor: Colors.accent,
              }}
              onPress={() => {}}
            />
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const AuthScreenNavaigator = () => (
  <Navigator
    screenOptions={{
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlignVertical: 'center',
      },
    }}
  >
    <Screen name="Login screen" component={AuthScreen} />
  </Navigator>
);

export default AuthScreenNavaigator;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
  },
  authContainer: {
    width: '80%',
    padding: 20,
    maxWidth: 400,
    // height: '80%',
    maxHeight: 500,
  },
});
