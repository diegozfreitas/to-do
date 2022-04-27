import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { TasksItem } from './TaskItem'
import { TaskProps } from './TaskItem'


interface TasksListProps {
  tasks: TaskProps[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <TasksItem
          index={index}
          data={item}
          toggleTaskDone={toggleTaskDone}
          removeTask={removeTask}
          editTask={editTask}
        />
      )}
      style={{ marginTop: 32 }}
    />
  )
}

