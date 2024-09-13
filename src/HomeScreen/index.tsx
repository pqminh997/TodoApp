import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  InputAccessoryView,
} from 'react-native';
import TodoItemView from './TodoItem';
import {
  addTodo,
  deleteTodo,
  editTodo,
  markAsCompleteTodo,
  setRedFlagTodo,
  TodoItem,
} from '../Store';
import {useAppDispatch, useAppSelector} from '../Store/hook';
import AddTodoView from '../Components/AddTodoView';
import {SafeAreaView} from 'react-native-safe-area-context';

const iconAdd = require('../Assets/images/icon_add.png');
const iconRedFlag = require('../Assets/images/icon_red_flag.png');
const iconBlackFlag = require('../Assets/images/icon_black_flag.png');

const HomeScreen = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const [isShowAddTodoView, setIsShowAddTodoView] = useState(false);
  const [currentItem, setCurrentItem] = useState<TodoItem | null>(null);
  const [isRedFlag, setIsRedFlag] = useState(false);
  // const [currentTodos, setCurrentTodos] = useState<TodoItem[]>([]);

  const onMarkAscompleteItem = (selectedItem: TodoItem) => {
    dispatch(markAsCompleteTodo(selectedItem));
  };

  const showAddTodoView = () => {
    setCurrentItem(null);
    setIsShowAddTodoView(true);
  };

  const handleFilterRedFlag = () => {
    setIsRedFlag(!isRedFlag);
  };

  const onCompleteAddTodo = (item: TodoItem) => {
    if (item.title) {
      dispatch(addTodo(item));
    }
    setIsShowAddTodoView(false);
  };

  const onEditItem = (item: TodoItem) => {
    if (item.title) {
      dispatch(editTodo(item));
    }
    setIsShowAddTodoView(false);
  };

  const onDeleteItem = (selectedItem: TodoItem) => {
    dispatch(deleteTodo(selectedItem));
  };

  const onSelectItem = (selectedItem: TodoItem) => {
    setCurrentItem(selectedItem);
    setIsShowAddTodoView(true);
  };

  const onSetRedFlagTodo = (selectedItem: TodoItem) => {
    dispatch(setRedFlagTodo(selectedItem));
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.safeArena}>
        <View style={styles.container}>
          <FlatList
            data={todos}
            renderItem={({item}) => {
              if (isRedFlag && item.isRedFlag) {
                return (
                  <TodoItemView
                    item={item}
                    onMarkAscomplete={onMarkAscompleteItem}
                    onDeleteItem={onDeleteItem}
                    onSelectItem={onSelectItem}
                    onSetRedFlagTodo={onSetRedFlagTodo}
                  />
                );
              } else if (isRedFlag === false) {
                return (
                  <TodoItemView
                    item={item}
                    onMarkAscomplete={onMarkAscompleteItem}
                    onDeleteItem={onDeleteItem}
                    onSelectItem={onSelectItem}
                    onSetRedFlagTodo={onSetRedFlagTodo}
                  />
                );
              } else {
                return <View style={{padding: 0, height: 0}} />;
              }
            }}
            extraData={todos}
            keyExtractor={item => item.id}
            // ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />

          <TouchableOpacity
            style={[styles.addView, styles.redFlagView]}
            onPress={handleFilterRedFlag}>
            <Image
              source={isRedFlag ? iconRedFlag : iconBlackFlag}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.addView} onPress={showAddTodoView}>
            <Image source={iconAdd} style={{width: 24, height: 24}} />
          </TouchableOpacity>

          <InputAccessoryView>
            {isShowAddTodoView && (
              <AddTodoView
                onComplete={onCompleteAddTodo}
                currentItem={currentItem}
                onEditItem={onEditItem}
              />
            )}
          </InputAccessoryView>
        </View>
      </SafeAreaView>
      {isShowAddTodoView && <View style={styles.blackTheme} />}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArena: {
    flex: 1,
    backgroundColor: '#ebedef',
  },
  container: {
    flex: 1,
  },
  addView: {
    width: 50,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  redFlagView: {
    bottom: 70,
    right: 20,
  },
  blackTheme: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.5,
  },
});

export default HomeScreen;
