import { Image } from 'expo-image';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Task, useToDoContext } from '@/context/TaskContext';
import { useState, } from 'react';

export default function TabReminder() {
  const { taskList, onAddTask, onDoneTask } = useToDoContext();
  const [taskTitle, setTaskTitle] = useState<string>('');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">To-Do List</ThemedText>
      </ThemedView>

      <TextInput
        placeholder='Enter new task'
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <Button title="Add" onPress={() => {
        onAddTask(taskTitle);
        setTaskTitle("");
      }} />

      {taskList?.map((item: Task) => (
        <TouchableOpacity
          style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row' }}
          key={item?.id}
          onPress={() => onDoneTask(item?.id)}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#3498db',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              backgroundColor: '#d2d1d1ff',
            }}
          />
          <Text>{item?.title}</Text>
        </TouchableOpacity>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
