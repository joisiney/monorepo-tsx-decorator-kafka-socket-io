import { Entypo } from '@expo/vector-icons'
import { styled } from 'nativewind'
import { FC, useRef, useState } from 'react'
import { Alert, TextInput, TouchableOpacity, View } from 'react-native'
const Button = styled(TouchableOpacity)
const Input = styled(TextInput)
export const HomeInput: FC<{ handleAdd: any }> = ({ handleAdd }) => {
  const [value, setValue] = useState('')
  const inputRef = useRef<TextInput>(null)
  const handleSubmit = () => {
    inputRef.current?.blur()
    if (value !== '') {
      setValue('')
      handleAdd(value)
    } else {
      Alert.alert('Atenção', 'Você não pode cadastrar uma item vazia')
    }
  }
  return (
    <View className="mx-6 bg-white border border-slate-200 h-12 rounded-md flex-row">
      <Input
        ref={inputRef}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder="Adicionar novo notícia..."
        className="h-12 flex-1 border-r border-slate-200 px-6"
        placeholderTextColor="#B2B2B2"
        returnKeyType="send"
        selectionColor="#666666"
        onSubmitEditing={handleSubmit}
      />
      <Button
        className="h-12 w-12 items-center justify-center"
        activeOpacity={0.7}
        onPress={handleSubmit}
      >
        <Entypo name="chevron-small-right" size={24} color="black" />
      </Button>
    </View>
  )
}
