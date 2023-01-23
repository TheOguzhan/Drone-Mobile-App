import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useReducer } from 'react'
import { Link } from "expo-router";
import { register } from '../../firebase/functions';
interface FormState {
    email: string;
    password: string;
    confirm_password: string;
}

interface Action {
    type: 'update_email' | 'update_password' | 'update_confirm';
    value: string;
}

const initialState: FormState = {
    email: '',
    password: '',
    confirm_password: ''
}

const reducer = (state: FormState, action: Action) => {
    switch (action.type) {
        case 'update_password':
            return { ...state, password: action.value }
        case 'update_email':
            return { ...state, email: action.value }
        case 'update_confirm':
            return { ...state, confirm_password: action.value }
        default:
            return state
    }
}

const index = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SafeAreaView
            className="flex-1 justify-center bg-slate-200 px-10 gap-3">
            <Text className="text-gray-800 text-2xl text-center">
                IEL AERIAL Drone System
            </Text>
            <Text className="text-gray-800 text-l text-center">
                Register
            </Text>
            <TextInput
                className="border-2 border-gray-800  px-5 py-2 m-1 rounded-xl"
                placeholder='Email'
                autoComplete='email'
                keyboardType='email-address'
                value={state.email}
                onChangeText={(email) => {
                    dispatch({ type: 'update_email', value: email })
                }}
            />
            <TextInput
                className="border-2 border-gray-800  px-5 py-2 m-1 rounded-xl"
                placeholder='Password'
                secureTextEntry={true}
                value={state.password}
                onChangeText={(password) => {
                    dispatch({ type: 'update_password', value: password })
                }}
            />
            <TextInput className="border-2 border-gray-800  px-5 py-2 m-1 rounded-xl"
                placeholder='Password Confirm'
                secureTextEntry={true}
                value={state.confirm_password}
                onChangeText={(password) => {
                    dispatch({ type: 'update_confirm', value: password })
                }}

            />
            <TouchableOpacity className="border-2 bg-slate-100 border-gray-800 px-5 py-2 my-1 rounded-xl"
                activeOpacity={0.8}

                onPress={() => {
                    if (state.password === state.confirm_password) {
                        register(state.email, state.password)
                    } else {
                        Alert.alert("Passwords don't match")
                    }
                }}
            >
                <Text className='text-center text-l'>Register</Text>
            </TouchableOpacity>
            <Link href="/" className='text-center text-cyan-900'>Has account? Login</Link>

        </SafeAreaView>
    )
}

export default index
