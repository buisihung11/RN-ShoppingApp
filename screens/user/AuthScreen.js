import React, { useState, useCallback, useReducer } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import { auth } from '../../store/firebase';

const { Navigator, Screen } = createStackNavigator();

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [{ inputValues }, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: 'tester@gmail.com',
      password: 'tester',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const handleSubmit = useCallback(async () => {
    const submitFunc = isLogin ? handleLogin : handleSignUp;
    setIsProcessing(true);
    await submitFunc();
    setIsProcessing(false);
  }, [isLogin, handleLogin, handleSignUp]);

  const handleLogin = useCallback(async () => {
    const res = await auth.signInWithEmailAndPassword(
      inputValues.email,
      inputValues.password
    );

    console.log('userRes', res);
    return res;
  }, []);

  const handleSignUp = useCallback(async () => {
    try {
      console.log('sign_up', inputValues.email, inputValues.password);
      const res = await auth.createUserWithEmailAndPassword(
        inputValues.email,
        inputValues.password
      );

      return res;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
    }
  }, []);
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

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
              onInputChange={inputChangeHandler}
              initialValue={inputValues.email}
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
              onInputChange={inputChangeHandler}
              initialValue={inputValues.password}
            />
            <Button
              title={isLogin ? 'Login' : 'Sign up'}
              loading={isProcessing}
              buttonStyle={{
                backgroundColor: Colors.primary,
                marginTop: 10,
              }}
              onPress={handleSubmit}
            />
            <Button
              title={`Swith to ${isLogin ? 'Signup' : 'Login'}`}
              buttonStyle={{
                backgroundColor: Colors.accent,
                marginVertical: 10,
              }}
              onPress={() => setIsLogin((prev) => !prev)}
            />
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

// TODO: Add Startup Screen to check whether user is logged in

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
