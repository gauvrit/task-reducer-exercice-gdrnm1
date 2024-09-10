import React, { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visiter le musée Franz-Kafka', done: true },
  { id: 1, text: 'Voir un spectacle de marionnettes', done: false },
  { id: 2, text: 'Prendre une photo du mur John Lennon', done: false },
];

export default function TaskApp() {
  const [state, dispatch] = useReducer(reducer, initialTasks);

  function handleAddTask(text) {
    console.log('add taks', text);
    dispatch({ type: 'handleAddTask', text });
  }

  function handleChangeTask(task) {
    console.log('change task', task);
    dispatch({ type: 'handleChangeTask', task });
  }

  function handleDeleteTask(taskId) {
    console.log('delete task', taskId);
    dispatch({ type: 'handleDeleteTask', id: taskId });
  }

  function reducer(oldState, action) {
    if (action.type == 'handleAddTask') {
      const newTask = [
        ...oldState,
        { id: nextId + 1, text: action.text, done: false },
      ];
      return newTask;
    }
    if (action.type == 'handleDeleteTask') {
      const newTask = oldState.filter((element) => element.id != action.id);
      return newTask;
    }
    if (action.type == 'handleChangeTask') {
      const newTask = oldState.filter((element) => element.id != action.task.id);
      return [...newTask, action.task];
    }
  }

  return (
    <>
      <h1>Guide de Prague</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={state}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
