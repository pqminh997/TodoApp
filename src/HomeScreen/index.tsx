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
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import FilterItemView, {ColorItem} from './FilterItemView';
import {IconType} from '../Utils/Types';
import {Calendar} from 'react-native-calendars';
import {convertText} from '../Utils/Util';
import {
  pushLocalNoti,
  pushLocalNotificationSchedule,
  sendLocalNotification,
} from '../Utils/NotiServices';

const iconAdd = require('../Assets/images/icon_add.png');
const iconArrowDown = require('../Assets/images/icon_arrow_down.png');
const iconCalendar = require('../Assets/images/icon_calendar.png');
const iconSort = require('../Assets/images/icon_sort.png');

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const [isShowAddTodoView, setIsShowAddTodoView] = useState(false);
  const [currentItem, setCurrentItem] = useState<TodoItem | null>(null);
  const [showFilterView, setShowFilterView] = useState(false);
  const [filterViewY, setFilterViewY] = useState(0);
  const [filter, setFilter] = useState<IconType>('all');
  const [selectedFilterDate, setSelectedFilterDate] = useState<number | null>(
    null,
  );
  const [isShowFilterDate, setIsShowFilterDate] = useState(false);
  const [dateMarker, setDateMarker] = useState('');
  const [todoData, setTodoData] = useState<TodoItem[]>(todos);
  const [sortMode, setSortMode] = useState<
    'default' | 'highToLow' | 'lowToHigh'
  >('default');

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
    setIsShowAddTodoView(false);
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

  const formatDate = (formatDateTime: number) => {
    const newDate = new Date(formatDateTime);

    const formattedDate = newDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return `${formattedDate}`;
  };

  const getDateWithoutTime = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const isMatchDate = (item: TodoItem) => {
    if (selectedFilterDate) {
      const createDate = getDateWithoutTime(new Date(item.expireDate));
      const selectedDate = getDateWithoutTime(new Date(selectedFilterDate));
      return createDate.getTime() === selectedDate.getTime();
    }
    return true;
  };

  const cycleSortMode = () => {
    if (sortMode === 'default') {
      setSortMode('highToLow');
    } else if (sortMode === 'highToLow') {
      setSortMode('lowToHigh');
    } else {
      setSortMode('default');
    }
  };

  const handleSort = () => {
    let tempData: TodoItem[] = [];
    const iconPriority = {
      red: 1,
      orange: 2,
      yellow: 3,
      none: 4,
      all: 5,
    };
    if (sortMode === 'highToLow') {
      tempData = [...todoData].sort((a, b) => {
        return iconPriority[a.icon] - iconPriority[b.icon];
      });
    } else if (sortMode === 'lowToHigh') {
      tempData = [...todoData].sort((a, b) => {
        return iconPriority[b.icon] - iconPriority[a.icon];
      });
    } else {
      tempData = [...todos];
    }
    setTodoData(tempData);
  };

  useEffect(() => {
    setTodoData(todos);
  }, [todos]);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.safeArena}>
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View style={styles.container}>
            <View style={styles.topView}>
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
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  {convertText(filter)}
                </Text>
                <Image
                  source={iconArrowDown}
                  style={{width: 18, height: 18, marginLeft: 4}}
                />
              </TouchableOpacity>
              <View
                style={{flexDirection: 'row', position: 'absolute', right: 20}}>
                <TouchableOpacity
                  hitSlop={{top: 5, bottom: 5, right: 20, left: 20}}
                  onPress={() => {
                    cycleSortMode();
                    handleSort();
                  }}
                  style={{marginRight: 20}}>
                  <Image source={iconSort} style={{width: 28, height: 28}} />
                </TouchableOpacity>

                <TouchableOpacity
                  hitSlop={{top: 5, bottom: 5, right: 20, left: 20}}
                  onPress={() => setIsShowFilterDate(!isShowFilterDate)}>
                  {selectedFilterDate ? (
                    <Text style={{color: '#3498db'}}>
                      {formatDate(selectedFilterDate)}
                    </Text>
                  ) : (
                    <Image
                      source={iconCalendar}
                      style={{width: 28, height: 28}}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              data={todoData}
              renderItem={({item}) => {
                if (
                  (item.icon === filter || filter === 'all') &&
                  isMatchDate(item)
                ) {
                  return (
                    <TodoItemView item={item} onSelectItem={onSelectItem} />
                  );
                } else {
                  return <View />;
                }
              }}
              extraData={todoData}
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
                  onDeleteItem={onDeleteItem}
                  onMarkAscomplete={onMarkAscompleteItem}
                />
              )}
            </InputAccessoryView>
            {showFilterView && (
              <View style={[styles.filterView, {top: filterViewY}]}>
                <FilterItemView
                  onPressItem={onPressFilterItem}
                  isFilterType={true}
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
      {(isShowAddTodoView || isShowFilterDate) && (
        <View style={styles.blackTheme}>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsShowAddTodoView(false);
              setIsShowFilterDate(false);
            }}>
            <View style={{flex: 1}} />
          </TouchableWithoutFeedback>
        </View>
      )}

      {/* // MARK:  calendar*/}
      {isShowFilterDate && (
        <View style={[styles.calendarView, {top: insets.top + 40}]}>
          <Calendar
            onDayPress={day => {
              setIsShowFilterDate(false);
              setSelectedFilterDate(day.timestamp);
              setDateMarker(day.dateString);
            }}
            markedDates={{
              [dateMarker]: {
                selected: true,
                disableTouchEvent: true,
              },
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setIsShowFilterDate(false);
              setSelectedFilterDate(null);
              setDateMarker('');
            }}
            style={styles.clearBtn}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '500',
                textAlign: 'right',
              }}>
              Clear date
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
  topView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
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
  calendarView: {
    position: 'absolute',
    left: 0,
    right: 0,
    marginHorizontal: 20,
    zIndex: 3,
  },
  clearBtn: {
    position: 'absolute',
    bottom: -60,
    height: 60,
    right: -15,
    paddingLeft: 30,
    paddingRight: 20,
    justifyContent: 'center',
  },
});

export default HomeScreen;
