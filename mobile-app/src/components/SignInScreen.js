import React, {useState} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'
import { Button } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#36D1DC'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18,
      marginBottom: 10
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: -5,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
})

const SignInScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  
  const handleUsernameChange = (value) => {
    setUserDetails({...userDetails, username: value})
  }

  const handlePasswordChange = (value) => {
    setUserDetails({...userDetails, password: value})
  }

  return (
    <View style={styles.container}>
      <Animatable.View 
        style={styles.header}
        animation='fadeInDownBig'
        duration={500}
      >
        <Text style={styles.text_header}>Welcome!</Text>
      </Animatable.View>
      <Animatable.View 
        style={styles.footer}
        animation='fadeInUpBig'
        duration={500}
      >
        <Text style={styles.text_footer}>User Name</Text>
        <View style={styles.action}>
          <FontAwesome
            name='user-o'
            color='#05375a' 
            size={20}
          />
          <TextInput
            placeholder='User Name'
            style={styles.textInput} 
            autoCapitalize='none'
            onChangeText={(val) => handleUsernameChange(val)}
          />
        </View>
        <Text style={{...styles.text_footer, marginTop:35}}>Password</Text>
        <View style={styles.action}>          
          <FontAwesome
            name='lock'
            color='#05375a' 
            size={20}
          />
          <TextInput
            placeholder='Password'
            secureTextEntry={!showPassword}
            style={styles.textInput} 
            autoCapitalize='none'
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Feather 
              name={showPassword ? 'eye' : 'eye-off'}
              color='grey'
              size={20}
            />
          </TouchableOpacity>
        </View>
        <Button 
          style={{marginTop: 35}}
          icon="login" 
          mode="contained" 
          onPress={() => console.log(userDetails)}
        >
          Sign In
        </Button>
        <Button 
          style={{marginTop: 10}}
          icon="account-plus"
          mode="contained" 
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          Sign Up
        </Button>
      </Animatable.View>      
    </View>
  )
}

export default SignInScreen