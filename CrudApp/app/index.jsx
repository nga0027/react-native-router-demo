import { Text, TextInput, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style = {styles.addTaskForm}>
        <TextInput style = {styles.addTaskInput}></TextInput>
        <Button style = {styles.addTaskButton} title = 'Add'/>
      </View>
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
    paddingHorizontal: 10
  },

  addTaskInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    width: '100%'
  },

  addTaskButton: {
    padding: 10
  }
})
