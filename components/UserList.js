import React from 'react'
import { View, Text, StyleSheet,FlatList } from 'react-native'

import UserItem from './UserItem'



function UserList({userInfo, navigation, searchUser}){

  return(
    <View style={styles.block}>
      <FlatList
        data={userInfo}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <UserItem {...item} navigation={navigation} searchUser={searchUser}/>
        )}
      />
      <View style={styles.container}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  container:{
    height: 25,
    opacity: 0,
    zIndex: 1,

  },
})

export default UserList