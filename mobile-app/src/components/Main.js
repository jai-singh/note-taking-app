import React from 'react';
import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import Editor from './Editor'
import HomeScreen from './Home'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DrawerContainer from './DrawerContainer'
import RootStackScreen from './RootStackScreen'

const Drawer = createDrawerNavigator();

const EditorStack = createStackNavigator()
const HomeStack = createStackNavigator()

const HomeStackScreen = ({navigation}) => {
  return(
    <HomeStack.Navigator>   
      <HomeStack.Screen 
        name='Home' 
        component={HomeScreen} 
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#36D1DC',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon.Button
              name="menu" 
              size={25} 
              backgroundColor='#36D1DC'
              onPress={
                () => navigation.openDrawer()
              }
            />
          ),
          headerRight: () => (
            <Icon.Button
              name="plus"
              size={25} 
              backgroundColor='#36D1DC'
              onPress={
                () => {navigation.navigate('Editor')} 
              }
            />
          )
        }} 
      />
  </HomeStack.Navigator>
  )
}

const EditorStackScreen = ({navigation}) => (
  <EditorStack.Navigator>
    <EditorStack.Screen name='Note Editor' component={Editor} options={{
      title: 'Note Editor',
      headerStyle: {
        backgroundColor: '#36D1DC',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center'
      },
      headerTitleAlign: 'center',
      headerLeft: () => (
            <Icon.Button
              name="menu" 
              size={25} 
              backgroundColor='#36D1DC'
              onPress={
                () => navigation.openDrawer()
              }
            />
          )
    }}/>
  </EditorStack.Navigator>
)

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    backgroundColor: 'white', 
  }
});

const Main = () => {  
  return (
    <RootStackScreen />
    // <Drawer.Navigator 
    //   initialRouteName="Home" 
    //   drawerContent={props => <DrawerContainer {...props} />}
    // >
    //     <Drawer.Screen name="Home" component={HomeStackScreen} />
    //     <Drawer.Screen name="Editor" component={EditorStackScreen} />
    // </Drawer.Navigator>
  )
}

export default Main