import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Slot } from 'expo-router';

export default function App() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
