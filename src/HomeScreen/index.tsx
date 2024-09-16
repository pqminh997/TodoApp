import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  InputAccessoryView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import TodoItemView from './TodoItem';
import {
  addTodo,
  deleteTodo,
  editTodo,
  markAsCompleteTodo,
  TodoItem,
} from '../Store';
import {useAppDispatch, useAppSelector} from '../Store/hook';
import AddTodoView from '../Components/AddTodoView';
import {SafeAreaView} from 'react-native-safe-area-context';
import FilterItemView, {ColorItem} from './FilterItemView';

const iconAdd = require('../Assets/images/icon_add.png');
const iconArrowDown = require('../Assets/images/icon_arrow_down.png');

const HomeScreen = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const [isShowAddTodoView, setIsShowAddTodoView] = useState(false);
  const [currentItem, setCurrentItem] = useState<TodoItem | null>(null);
  const [showFilterView, setShowFilterView] = useState(false);
  const [filterViewY, setFilterViewY] = useState(0);
  const [filter, setFilter] = useState<
    'red' | 'yellow' | 'none' | 'orange' | 'all'
  >('all');

  const onMarkAscompleteItem = (selectedItem: TodoItem) => {
    dispatch(markAsCompleteTodo(selectedItem));
  };

  const showAddTodoView = () => {
    setCurrentItem(null);
    setIsShowAddTodoView(true);
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

  const handleButtonPress = () => {
    setShowFilterView(!showFilterView);
  };

  const handlePressOutside = () => {
    setShowFilterView(false);
  };

  const onPressFilterItem = (item: ColorItem) => {
    setShowFilterView(false);
    setFilter(item.name);
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.safeArena}>
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View style={styles.container}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
              }}>
              <TouchableOpacity
                onLayout={event =>
                  setFilterViewY(
                    event.nativeEvent.layout.y +
                      event.nativeEvent.layout.height,
                  )
                }
                onPress={handleButtonPress}
                style={{flexDirection: 'row'}}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>All</Text>
                <Image
                  source={iconArrowDown}
                  style={{width: 18, height: 18, marginLeft: 4}}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={todos}
              renderItem={({item}) => {
                if (item.icon === filter || filter === 'all') {
                  return (
                    <TodoItemView
                      item={item}
                      onMarkAscomplete={onMarkAscompleteItem}
                      onDeleteItem={onDeleteItem}
                      onSelectItem={onSelectItem}
                    />
                  );
                } else {
                  return <View />;
                }
              }}
              extraData={todos}
              keyExtractor={item => item.id}
              pointerEvents={showFilterView ? 'none' : 'auto'}
            />

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
            {showFilterView && (
              <View style={[styles.filterView, {top: filterViewY}]}>
                <FilterItemView onPressItem={onPressFilterItem} isFilterType={true}/>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
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
  filterView: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default HomeScreen;
