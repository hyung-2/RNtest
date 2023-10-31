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
    height: 30,
    backgroundColor: '(0, 0, 0, 0.1)',
    opacity: 0
  }
})

export default UserList