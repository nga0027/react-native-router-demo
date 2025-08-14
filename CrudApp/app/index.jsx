import { Text, TextInput, View, TouchableOpacity, Button, Platform, ScrollView, FlatList, Appearance } from "react-native";
import React, { useState, useContext } from 'react';
import { ThemeContext } from "@/context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import {data as TASKS} from '@/data/todos'
import {ColorThemes} from '@/constants/ColorThemes'

import {Inter_500Medium, useFonts} from '@expo-google-fonts/inter'
import Octicons from '@expo/vector-icons/Octicons'


export default function Index() {
  const ListContainer = Platform.OS === 'web' ? ScrollView : SafeAreaView

  const [tasks, setTasks] = useState(TASKS.sort((a, b) => b.id - a.id))
  const [addTaskText, setAddTaskText] = useState('')
  const {colorScheme, setColorScheme, theme} = useContext(ThemeContext)
  const styles = createStyles(theme)
  
  const [loaded, error] = useFonts({
    Inter_500Medium
  })

  if (!loaded && !error) {
    return null
  }

  const addTask = () => {
    if (addTaskText.trim()) {
      const newItem = {'id': tasks[0].id + 1, 'title': addTaskText.trim(), 'completed': false}
      setTasks([newItem, ...tasks])
      setAddTaskText('')
    }
  }

  const toggleCompleted = (item) => {
    const newTasks = tasks.map((iterItem) => {
      return iterItem.id === item.id ? {...iterItem, completed: !iterItem.completed} : iterItem
    })
    setTasks(newTasks)
  }

  const deleteItem = (item) => {
    const newTasks = tasks.filter(iterItem => iterItem.id !== item.id)
    setTasks(newTasks)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.addTaskForm}>
        <TextInput 
          style = {styles.addTaskInput} 
          onChangeText={setAddTaskText} 
          value={addTaskText} 
          placeholder="Add a task"
          placeholderTextColor='grey'/>
        <TouchableOpacity style = {styles.addTaskButton} onPress={addTask}>
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
          style={{marginLeft: 10}}>
          {colorScheme === 'dark'
            ? <Octicons name='moon' size = {36} color = {theme.textColor} style={{width: 36}}/>
            : <Octicons name='sun' size = {36} color = {theme.textColor} style={{width: 36}}/>}
        </TouchableOpacity>
      </View>
      <ListContainer>
        <FlatList
          data = {tasks}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle = {styles.contentContainer}
          renderItem={({item}) => (
            <View style = {styles.taskRow}>
              <Text 
                style={[
                  styles.taskDescription, 
                  item.completed ? styles.taskCompleted : styles.taskUncompleted
                ]}
                onPress={() => toggleCompleted(item)}>
                {item.title}
              </Text>
              <TouchableOpacity style={styles.deleteTaskButton} onPress={() => deleteItem(item)}>
                <MaterialIcons name="delete" size={24} color={theme.iconColor} />
              </TouchableOpacity>
            </View>
          )}
        />
      </ListContainer>
    </SafeAreaView>
  );
}

// const colorScheme = Appearance.getColorScheme()
// const theme = colorScheme === 'light' ? ColorThemes.light : ColorThemes.dark

const createStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor
    },

    addTaskForm: {
      flexDirection: 'row',
      paddingVertical: 5,
      paddingHorizontal: 8,
      marginBottom: 10,
      width: '100%',
      maxWidth: 1024,
      marginHorizontal: 'auto'
    },

    addTaskInput: {
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderRadius: 5,
      marginRight: 5,
      // width: '100%',
      flex: 1,
      color: theme.textColor,
      fontSize: 15,
      fontFamily: 'Inter_500Medium',
      padding: 10
    },

    addTaskButton: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: theme.buttonColor
    },

    contentContainer: {
    },

    taskRow: {
      borderBottomColor: theme.borderColor,
      borderBottomWidth: 1,
      paddingVertical: 5,
      flexDirection: 'row',
      maxWidth: 1024,
      width: '100%',
      marginHorizontal: 'auto',
      paddingHorizontal: 8,
      alignItems: 'center'
    },

    taskDescription: {
      flex: 1,
      fontSize: 15,
      fontFamily: 'Inter_500Medium'
    },

    taskCompleted: {
      textDecorationLine: 'line-through',
      color: 'grey'
    },

    taskUncompleted: {
      color: theme.textColor
    },

    deleteTaskButton: {
      backgroundColor: 'red',
      padding: 5,
      height: 36,
      width: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
}
