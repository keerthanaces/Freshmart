// app/_layout.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </Provider>
  );
}
