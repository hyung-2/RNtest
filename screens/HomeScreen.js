import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Modal, SafeAreaView, StatusBar, Pressable, FlatList, Keyboard, TextInput, Image, Platform } from 'react-native'
import { addData, getCollection, getCurrentTime } from "../apis/firebase";
import { launchImageLibrary } from "react-native-image-picker";

import ModalButton from '../components/ModalButton'
import ModalInput from '../components/ModalInput'
import UserList from "../components/UserList";
import profileImg from '../assets/imgs/profile.png'

import AntIcon from 'react-native-vector-icons/AntDesign'

function HomeScreen({navigation}){

  const [open, setOpen] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userAdress, setUserAdress] = useState('')
  const [userLike, setUserLike] = useState('')
  const [userImg, setUserImg] = useState('')
  const [userInfo, setUserInfo] = useState([])
  const [searchUser, setSearchUser] = useState('')

  const closeModal = () => {
    setOpen(false)
    setUserName('')
    setUserEmail('')
    setUserAdress('')
    setUserLike('')
    setUserImg('')
  }

  //db에 유저정보 등록
  const plusData = async() => {
    console.log('이름:', userName,'-','이메일', userEmail,'-','거주지', userAdress,'-','관심사', userLike)
    try{
      if(userName == '' && userEmail == '' && userAdress == '' && userLike == ''){
        console.log('빈칸을 입력해주세요')
        return
      }else{
        console.log('파이어베이스 데이터 추가')
        const newUser = {
          name: userName,
          email: userEmail,
          address: userAdress,
          like: userLike,
          profileImg: userImg,
          createdAt: getCurrentTime()
        }
        await addData('users', newUser)
        Keyboard.dismiss()
        setUserName('')
        setUserEmail('')
        setUserAdress('')
        setUserLike('')
        setUserImg('')
        setOpen(false)
      }
    }catch(err){
      console.log('err:', err)
    }
  }

  //유저검색
  const searching = (text) => {
    console.log(text)
    setSearchUser(text)
  }

  //키보드숨기기
  const hideKeyboard = () => {
    Keyboard.dismiss()
  }

  //이미지 변경
  const uploadProfileImg = () => {
    launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      includeBase64: Platform.OS === 'android',
    },
    (data) => {
      console.log(data)
      if(data.didCancel) return
      setUserImg(data)
    }
    )
  }

  //유저정보 불러오기
  useEffect(() => {
    function onResult(querySnapshot){
      const list = []
      querySnapshot.forEach(doc => {
        console.log(doc.data())
        list.push({...doc.data(), id: doc.id,})
      })
      setUserInfo(list)
    }
    function onError(err){
      console.log(`!!!!!!!!!! - ${err}`)
    }
    return getCollection('users', onResult, onError, null, {exists: true, condition: ['createdAt', 'asc']}, null)
  },[])

  return(
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor='#E7BFFF'></StatusBar>
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(!open)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.ModalView}>
            <ModalInput title='이름' setUserName={setUserName}/>
            <ModalInput title='이메일' setUserEmail={setUserEmail}/>
            <ModalInput title='거주지' setUserAdress={setUserAdress}/>
            <ModalInput title='관심사' setUserLike={setUserLike}/>
            {userImg && userImg ? 
              <Image source={{uri: userImg?.assets[0]?.uri}} style={styles.img}/>
              :
              <Image source={profileImg} style={styles.img}/>
            }
            <Pressable
              style={[styles.ModalButton, styles.profileBtn]}
              onPress={uploadProfileImg}
            >
              <Text style={styles.ModalButtonText}>프로필 사진 등록</Text>
            </Pressable>
            <View style={styles.alignHorizontal}>
              <Pressable 
                style={[styles.ModalButton, styles.ModalButtonClose]}
                onPress={closeModal}
              >
                <Text style={styles.ModalButtonText}>취소</Text>
              </Pressable>
              <Pressable 
                style={[styles.ModalButton, styles.ModalButtonPlus]}
                onPress={plusData}
              >
                <Text style={styles.ModalButtonText}>등록</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <TextInput
        style={styles.search}
        selectionColor={'#E7BFFF'}
        onChangeText={searching}
        returnKeyType='done'
        autoCorrect={false}
        onSubmitEditing={hideKeyboard}
        blurOnSubmit={false}
      />
      <AntIcon name='search1' size={23} color='#fff' style={styles.icon}/>
      <UserList userInfo={userInfo} userImg={userImg} navigation={navigation} searchUser={searchUser}/>
      <ModalButton open={open} setOpen={setOpen} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block: {
    flex:1,
    backgroundColor: '#fff'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  ModalView: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#E7BFFF',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  alignHorizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  ModalButton: {
    width: 100,
    padding: 8,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 5,
    marginTop: 20,
  },
  ModalButtonClose: {
    backgroundColor: '#ddd'
  },
  ModalButtonPlus:{
    backgroundColor: '#E7BFFF'
  },
  ModalButtonText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  search: {
    borderColor: '#E7BFFF',
    borderWidth: 1,
    margin: 7,
    borderRadius: 15,
    paddingLeft: 60,
    color: '#E7BFFF',
    fontSize: 19,
  },
  icon: {
    position: 'absolute',
    top: 7.5,
    left: 7.5,
    backgroundColor: '#E7BFFF',
    padding: 13.5,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileBtn: {
    backgroundColor: '#E7BFFF',
    width: 150,

  }
})

export default HomeScreen