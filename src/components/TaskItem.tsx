import React, { useState, useRef, useEffect } from 'react'
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard
} from 'react-native'

import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import closeIcon from '../assets/icons/close/close.png'


export interface TaskProps {
  id: number;
  title: string;
  done: boolean;
}

export interface TasksItemProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => string;
  index: number;
  data: TaskProps
}

export function TasksItem({ data, index, toggleTaskDone, removeTask, editTask }: TasksItemProps) {
  const [isEdit, setIsEdit] = useState(0)
  const [newTitle, setNewTitle] = useState('')
  const textInputRef = useRef<TextInput>(null);

  function handleEditNewTask() {
    if(newTitle === data.title || newTitle === '') {
      Keyboard.dismiss
      setIsEdit(0)
      setNewTitle('')
      return
    }

    const result = editTask(isEdit, newTitle)

    if (result === 'success') {
      Keyboard.dismiss
      setIsEdit(0)
      setNewTitle('')
    }
  }

  useEffect(()=>{
    if(textInputRef.current){
      if(isEdit !== 0){
        textInputRef.current.focus()
      }else{
      }
    }

  },[isEdit])

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(data.id)}
        >
          <View
            testID={`marker-${index}`}
            style={data?.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {data.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          {isEdit === data.id ? (
            <TextInput
              ref={textInputRef}
              value={isEdit !== 0 ? newTitle : data.title}
              onChangeText={setNewTitle}
              style={{ padding: 0 }}
              returnKeyType="send"
              onBlur={handleEditNewTask}
            />
          ) : (
            <Text
              style={data?.done ? styles.taskTextDone : styles.taskText}
            >
              {data.title}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 24, flexDirection: 'row' }}>
        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => {
            setIsEdit(data.id)
            setNewTitle(data.title)
          }}
        >
          {isEdit === data.id ? (
            <TouchableOpacity
              onPress={() => {
                setIsEdit(0)
                setNewTitle(data.title)
              }}
              style={{ padding: 4 }}>
              <Image source={closeIcon} />
            </TouchableOpacity>
          ) : (
            <Image source={editIcon} />
          )}
        </TouchableOpacity>

        <View style={styles.pipe} />

        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => removeTask(data.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#888',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  pipe: {
    borderColor: '#d5d5d5',
    borderLeftWidth: 1,
    borderStyle: 'solid',
    marginHorizontal: 4
  },
})