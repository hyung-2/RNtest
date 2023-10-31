import React from "react";
import { View, TouchableOpacity, StyleSheet,Text } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'

function ModalButton({open, setOpen,}){

  const onPress = () => {
    console.log('버튼누름')
    setOpen(!open)
  }

  return(
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.button}
    >
      <View>
        <Text style={styles.buttonText}><AntIcon name='plus' size={22}/></Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E7BFFF',
    borderRadius: 50,
    width: 50,
    height: 50,
    position: 'absolute',
    right: 20,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    textAlign:'center',
    fontSize: 30,
  }
})

export default ModalButton
