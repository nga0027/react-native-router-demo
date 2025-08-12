import { Text, TextInput, View, TouchableOpacity, Button, Platform, ScrollView, FlatList, Appearance } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import {data as TASKS} from '@/data/todos'

export default function Index() {
  const ListContainer = Platform.OS === 'web' ? ScrollView : SafeAreaView

  const [tasks, setTasks] = useState(TASKS)
  const [addTaskText, setAddTaskText] = useState('')

  const addTask = () => {
    if (addTaskText) {
      const newItem = {'id': tasks.at(-1).id + 1, 'title': addTaskText, 'completed': false}
      setTasks([...tasks, newItem])
    }
  }

  const toggleCompleted = (item) => {
    const newTasks = tasks.map((iterItem) => {
      if (iterItem.id === item.id) {
        const newItem = {...iterItem}
        newItem.completed = !iterItem.completed
        return newItem
      } else {
        return iterItem
      }
    })
    setTasks(newTasks)
  }

  return (
    <View style={styles.container}>
      <View style = {styles.addTaskForm}>
        <TextInput style = {styles.addTaskInput} onChangeText={setAddTaskText} />
        <TouchableOpacity style = {styles.addTaskButton} onPress={addTask}>
          <Text>Add</Text>
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
              <Text style={[styles.taskDescription, item.completed ? styles.taskCompleted : styles.taskUncompleted]}>{item.title}</Text>
              <TouchableOpacity style={styles.deleteTaskButton} onPress={() => toggleCompleted(item)}>
                <MaterialIcons name="delete" size={24} color={theme.iconColor} />
              </TouchableOpacity>
            </View>
          )}
        />
      </ListContainer>
    </View>
  );
}

const ColorThemes = {
  light: {
    borderColor: 'black',
    backgroundColor: 'white',
    textColor: 'black',
    buttonColor: 'lightblue',
    iconColor: 'white'
  },
  dark: {
    borderColor: 'white',
    backgroundColor: 'black',
    textColor: 'white',
    buttonColor: 'white',
    iconColor: 'black'
  }
}
const colorScheme = Appearance.getColorScheme()
const theme = colorScheme === 'light' ? ColorThemes.light : ColorThemes.dark

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor
  },

  addTaskForm: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8
  },

  addTaskInput: {
    borderColor: theme.borderColor,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    width: '100%',
    color: theme.textColor,
    fontSize: 15,
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
    paddingHorizontal: 8,
    alignItems: 'center'
  },

  taskDescription: {
    flex: 1,
    fontSize: 15
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
