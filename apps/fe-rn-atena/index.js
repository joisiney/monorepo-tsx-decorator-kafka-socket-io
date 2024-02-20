import { registerRootComponent } from 'expo'
import 'react-native-gesture-handler'
import 'react-native-random-uuid'
import { App } from './src/navigation/root-stack.navigator'
registerRootComponent(App)
