import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import icedCoffeeImg from '@/assets/images/iced-coffee.png'
import { Link } from 'expo-router'

const app = () => {
  return (
    <View style={styles.container}>
        <ImageBackground source={icedCoffeeImg} resizeMode='cover' style={styles.image}>
          <Text style={styles.title}>Coffee Shop</Text>
          <Link style={{marginHorizontal: 'auto'}} href='/menu' asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Our Menu</Text>
            </Pressable>
          </Link>
          <Link style={{marginHorizontal: 'auto'}} href='/contact' asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Contact Us</Text>
            </Pressable>
          </Link>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    image: {
      width: '100%',
      height: '100%',
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',

    },
    title: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)s',
        marginBottom: 120
      },
    link: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
        backgroundColor: 'rgba(0,0,0,0.5)s',
        padding: 4
      },
    button: {
      height: 60,
      width: 150,
      borderRadius: 20,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.75)',
      marginBottom: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 4
      }
})

export default app