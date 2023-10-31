import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

function ModalInput({title, setUserName, setUserEmail, setUserAdress, setUserLike}){

  const handleChange = (text) => {
    console.log(text)
    if(title === '이름'){
      setUserName(text)
    }else if(title === '이메일'){
      setUserEmail(text)
    }else if(title === '거주지'){
      setUserAdress(text)
    }else if(title === '관심사'){
      setUserLike(text)
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.name}>{title}</Text>
      <TextInput
        placeholder={`${title} 을(를) 입력해주세요`}
        autoCorrect={false}
        style={styles.input}
        selectionColor={'#E7BFFF'}
        onChangeText={handleChange}
        blurOnSubmit={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  name: {
    textAlign: 'left',
    width: 50,
  },
  input: {
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#E7BFFF',
    borderRadius: 10,
    padding: 5,
    paddingLeft: 10,
    width : 250,
    
  }
})

export default ModalInput