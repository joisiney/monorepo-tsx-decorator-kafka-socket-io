import { AppNewsEntity } from '@/@core/domain/entities/news.entity'
import { Ionicons } from '@expo/vector-icons'
import classNames from 'classnames'
import { styled } from 'nativewind'
import { FC, useEffect, useRef, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
const Button = styled(TouchableOpacity)
const Input = styled(TextInput)
const Icon = styled(Ionicons)
export const HomeItem: FC<{
  item: AppNewsEntity
  handleRemove: () => void
  handleUpdateTitle: (title: string, id: string) => void
}> = ({ item, handleRemove, handleUpdateTitle }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(item.title)
  const textInputRef = useRef<TextInput>(null)
  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setNewTitle(item.title)
    setIsEditing(false)
  }

  function handleSubmitEditing() {
    handleUpdateTitle(newTitle, item.id)
    setIsEditing(false)
  }
  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus()
    }
  }, [isEditing])

  return (
    <View className="flex-row items-center justify-between px-6 py-4 border-b border-slate-300">
      {isEditing ? (
        <Input
          focusable
          selection={{ start: newTitle.length, end: newTitle.length }}
          className={classNames(
            'text-base font-interregular text-slate-900 flex flex-1 pl-2 min-h-[38px]',
            { 'border border-slate-100 rounded-sm': isEditing },
          )}
          value={newTitle}
          ref={textInputRef}
          onChangeText={setNewTitle}
          onBlur={handleCancelEditing}
          onSubmitEditing={handleSubmitEditing}
        />
      ) : (
        <Text
          numberOfLines={1}
          className="text-base font-interregular text-slate-900 flex flex-1"
        >
          {newTitle}
          {newTitle.length > 35 ? '...' : ''}
        </Text>
      )}
      <Button
        className="w-9 h-9 items-center justify-center"
        onPress={isEditing ? handleCancelEditing : handleStartEditing}
      >
        <Icon
          name={isEditing ? 'send-sharp' : 'pencil'}
          className={classNames('text-lg', {
            'text-blue-700': isEditing,
            'text-slate-700': !isEditing,
          })}
        />
      </Button>

      <Button
        className="w-9 h-9 items-center justify-center"
        onPress={isEditing ? handleSubmitEditing : handleRemove}
      >
        <Icon
          name={isEditing ? 'close-circle-sharp' : 'trash'}
          className={classNames('text-lg', {
            'text-red-500': isEditing,
            'text-slate-700': !isEditing,
          })}
        />
      </Button>
    </View>
  )
}
