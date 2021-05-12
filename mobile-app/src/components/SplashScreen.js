import React from 'react'
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet
} from 'react-native'
import { Button } from 'react-native-paper'
import logo from '../../assets/logo.png'
import * as Animatable from 'react-native-animatable'

const { height } = Dimensions.get('screen')
const logoHeight = height * 0.28

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#36D1DC'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logoStyle: {
      width: logoHeight,
      height: logoHeight
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'black',
      marginTop: 10,
      fontSize: 15
  }
});


const SplashScreen = ({ navigation }) => {
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation='bounceInDown'
          duration={1200}
          source={logo} 
          styl={styles.logoStyle}
          resizeMode='stretch'
        />
      </View>
      <Animatable.View 
        animation='fadeInUpBig'
        duration={500}
        style={styles.footer}
      >
        <Text style={styles.title}>Note Taking App</Text>
        <Text style={styles.text}>Whatever you have in your mind just type it in this elegant app.</Text>
        <Button 
          style={{marginTop: 30}}
          icon="login" 
          mode="contained" 
          onPress={() => navigation.navigate('SignInScreen')}
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

export default SplashScreen