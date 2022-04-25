import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data: Task = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false
    }
    setTasks([...tasks, data])

    return 'success'
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
    const data = tasks.filter((task: Task) => task.id !== id)

    setTasks(data)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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