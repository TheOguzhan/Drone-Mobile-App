import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useReducer } from "react";
import { Link } from "expo-router";
import { login } from "../../firebase/functions";

interface FormState {
  email: string;
  password: string;
}

interface Action {
  type: 'update_email' | 'update_password';
  value: string;
}

const initialState: FormState = {
  email: '',
  password: ''
}

const reducer = (state: FormState, action: Action) => {
  switch (action.type) {
    case 'update_password':
      return { ...state, password: action.value }
    case 'update_email':
      return { ...state, email: action.value }
    default:
      return state
  }
}

const Login: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SafeAreaView className="flex-1 justify-center bg-slate-200 px-10 gap-3">
      <Text className="text-gray-800 text-2xl text-center">
        IEL AERIAL Drone System
      </Text>
      <Text className="text-gray-800 text-l text-center">Login</Text>
      <TextInput
        className="border-2 border-gray-800  px-5 py-2 m-1 rounded-xl"
        placeholder="Email"
        autoComplete="email"
        keyboardType="email-address"
        value={state.email}
        onChangeText={(email) => {
          dispatch({ type: 'update_email', value: email })
        }}
      />
      <TextInput
        className="border-2 border-gray-800  px-5 py-2 m-1 rounded-xl"
        placeholder="Password"
        secureTextEntry={true}
        value={state.password}
        onChangeText={(password) => {
          dispatch({ type: 'update_password', value: password })
        }}
      />
      <TouchableOpacity
        className="border-2 bg-slate-100 border-gray-800 px-5 py-2 my-1 rounded-xl"
        activeOpacity={0.8}
        onPress={() => {
          login(state.email, state.password);
        }}
      >
        <Text className="text-center text-l ">Login</Text>
      </TouchableOpacity>
      <Link href="/register" className="text-center text-cyan-900">
        No account? Register
      </Link>
    </SafeAreaView>
  );
};

export default Login;
