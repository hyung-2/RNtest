import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import AntIcon from 'react-native-vector-icons/AntDesign'
import profileImg from '../assets/imgs/profile.png'

function UserItem({name, email, address, like, navigation, searchUser}){

  // console.log(navigation)

  const onPress = () => {
    console.log('다음!!!!!!!')
    navigation.navigate('MoreInfo', {name, email, address, like})
  }
  if(searchUser){
    if(name.includes(searchUser) || email.includes(searchUser)){
      return(
        <View style={styles.container}>
          <View style={styles.ViewHorizontal}>
            <Image source={profileImg} style={styles.profile}></Image>
            <View style={styles.userInfos}>
              <Text style={[styles.userInfoTexts, styles.name]}>{name}</Text>
              <Text style={styles.userInfoTexts}>{email}</Text>
            </View>
            <Text style={styles.moreInfoBtn} onPress={onPress}><AntIcon name='right' size={20}/></Text>
          </View>
        </View>
      )
    }
  }else if(!searchUser){
    return(
      <View style={styles.container}>
        <View style={styles.ViewHorizontal}>
          <Image source={profileImg} style={styles.profile}></Image>
          <View style={styles.userInfos}>
            <Text style={[styles.userInfoTexts, styles.name]}>{name}</Text>
            <Text style={styles.userInfoTexts}>{email}</Text>
          </View>
          <Text style={styles.moreInfoBtn} onPress={onPress}><AntIcon name='right' size={20}/></Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    borderBottomColor: '#E7BFFF',
    borderBottomWidth: 1,
    padding: 15,
  },
  ViewHorizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  profile: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  userInfos: {
    marginLeft: 25,
  },
  userInfoTexts: {
    fontSize: 15,
    marginVertical: 3,
  },
  moreInfoBtn: {
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
  }
})

export default UserItem