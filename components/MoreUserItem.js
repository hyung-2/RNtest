import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import AntIcon from 'react-native-vector-icons/AntDesign'
import baseprofileImg from '../assets/imgs/profile.png'

function MoreUserItem({navigation, route}){

  // console.log(route.params.profileImg)

  const onPress = () => {
    navigation.navigate('Home')
  }
  return(
    <View style={styles.container}>
      <AntIcon name='left' size={20} onPress={onPress} style={styles.backBtn}/>
      <View style={styles.profileBox}>
        {profileImg && profileImg? 
          <Image source={route.params.profileImg?.assets[0]?.uri} style={styles.profile}/>
          :
          <Image source={baseprofileImg} style={styles.profile}/>
        }
        {/* <Image source={baseprofileImg} style={styles.profile}/> */}
        <View style={styles.textBox}>
          <View style={styles.viewHorizontal}>
            <Text style={styles.titleText}>이름</Text>
            <Text style={styles.userInfoText}>{route.params.name}</Text>
          </View>
          <View style={styles.viewHorizontal}>
            <Text style={styles.titleText}>이메일</Text>
            <Text style={styles.userInfoText}>{route.params.email}</Text>
          </View>
          <View style={styles.viewHorizontal}>
            <Text style={styles.titleText}>거주지</Text>
            <Text style={styles.userInfoText}>{route.params.address}</Text>
          </View>
          <View style={styles.viewHorizontal}>
            <Text style={styles.titleText}>관심사</Text>
            <Text style={styles.userInfoText}>{route.params.like}</Text>
          </View>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  backBtn: {
    margin: 15,
  },
  profileBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  profile: {
    width: 180,
    height: 180,
    borderRadius: 100,
    marginBottom: 40,
  },
  textBox: {
    width: 250,
  },
  viewHorizontal: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 80,
    justifyContent: 'flex-start',
    textAlign: 'left',
    color: '#E7BFFF',
  },
  userInfoText: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginLeft: 10,
  }

})

export default MoreUserItem