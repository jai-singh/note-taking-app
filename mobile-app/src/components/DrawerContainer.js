import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer'
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import profile from '../../assets/user.png'

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  profile: {
    backgroundColor: '#fff'
  }
});

const DrawerContainer = ({ navigation }) => {
  return(
    <View style={{flex: 1}}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image 
                size={50}
                source={profile}   
                style={styles.profile}                           
              />
              <View style={{
                marginLeft: 15,
                flexDirection:'column'
              }}>
                <Title>User Name</Title>
                <Caption>@userid</Caption>
              </View>
            </View>
          </View>
          <View style={styles.row}></View>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              label='Home'
              onPress={() => {navigation.navigate('Home')}}
            />          
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="pencil-outline"
                  color={color}
                  size={size}
                />
              )}
              label='New Note'
              onPress={() => {navigation.navigate('Editor')}}
            />      
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="account-cog"
                  color={color}
                  size={size}
                />
              )}
              label='Change Password'
              onPress={() => {}}
            />      
          </Drawer.Section> 
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label='Sign Out'
          onPress={() => {}}
        />
      </Drawer.Section>
    </View>
  )
}

export default DrawerContainer