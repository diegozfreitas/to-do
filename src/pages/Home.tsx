import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { TaskProps } from '../components/TaskItem';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const checkTaskName = tasks.findIndex((task) => {
      return task.title == newTaskTitle.trim();
    });

    if (checkTaskName === 0) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return 'fail'
    } else {
      const data: TaskProps = {
        id: Number(new Date().getTime()),
        title: newTaskTitle.trim(),
        done: false
      }
      setTasks([...tasks, data])

      return 'success'
    }
  }

  function handleEditTask(id: number, newTaskTitle: string) {
    const checkTaskName = tasks.findIndex((task) => {
      return task.title == newTaskTitle.trim();
    });

    if (checkTaskName === 0) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return 'fail'
    } else {
      const target = tasks.findIndex((task) => {
        return task.id == id;
      });

      const mirror = [...tasks];

      mirror[target].title = newTaskTitle.trim();

      setTasks(mirror);

      return 'success'
    }
  }

  function handleToggleTaskDone(id: number) {
    const target = tasks.findIndex((task) => {
      return task.id == id;
    });

    const mirror = [...tasks];

    mirror[target].done = !mirror[target].done;

    setTasks(mirror);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'SIM', onPress: () => {
            const data = tasks.filter((task: TaskProps) => task.id !== id)

            setTasks(data)
          }
        },
        { text: 'NÃO', onPress: () => { return } },
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})