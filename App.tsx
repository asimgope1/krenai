import React from 'react';
import { SafeAreaView, StatusBar, View,Text } from 'react-native';
import HomeScreen from './src/screens/Homescreen';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <StatusBar barStyle="dark-content" backgroundColor={'white'} />


      <View
      style={{
        height: 40,
        width: '100%',
        backgroundColor: '#e2e2e2',
      }}
      >
        {/* Implement your header here */}
      <Text
      style={{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        color:'black'
      }}
      
      >
        products

      </Text>

      </View>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
