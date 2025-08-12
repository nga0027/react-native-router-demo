import { Text, TextInput, View, TouchableOpacity, Button, Platform, ScrollView, FlatList } from "react-native";
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
    const newItem = {'id': tasks.at(-1).id + 1, 'title': addTaskText, 'completed': false}
    setTasks([...tasks, newItem])
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
        <Button style = {styles.addTaskButton} title = 'Add' onPress={addTask} />
      </View>
      <ListContainer>
        <FlatList
          data = {tasks}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle = {styles.contentContainer}
          renderItem={({item}) => (
            <View style = {styles.taskRow}>
              <Text style={[styles.taskDescription, item.completed ? styles.taskCompleted : null]}>{item.title}</Text>
              <TouchableOpacity style={styles.deleteTaskButton} onPress={() => toggleCompleted(item)}>
                <MaterialIcons name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />
      </ListContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  addTaskForm: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8
  },

  addTaskInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    width: '100%'
  },

  addTaskButton: {
    padding: 10,
    borderRadius: 5
  },

  contentContainer: {
  },

  taskRow: {
    borderBottomColor: 'white',
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
