import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import {useNavigation} from '@react-navigation/native';

export default function ScanQRScreen({navigation}) {
  // const navigation =  useNavigation();

  // onLoginPressed = () => {
  // navigation.navigate('Signin');
  //   };
  return (
    <View style={styles.views}>
      <Text
      //   onPress={() => navigation.navigate('main')}
      >
        Peem test this is Scan QR
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  views: {
    alignItems: 'center',
    backgroundColor: '#FAC983',
    padding: 80,
    justifyContent: 'center',
  },
});
