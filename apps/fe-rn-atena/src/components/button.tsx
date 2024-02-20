import { FC } from 'react'
import { Text, TouchableOpacity } from 'react-native'

export const Button: FC<{ title: string; onPress?: () => void }> = ({
  title,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-black mt-4 w-full h-12 rounded-xl items-center justify-center"
  >
    <Text className="text-white font-interregular text-base">{title}</Text>
  </TouchableOpacity>
)
