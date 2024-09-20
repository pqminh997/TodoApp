import {SortMode, TodoItem} from '../src/Utils/Types';

const getDate = (day: number) => {
  return new Date(Date.now()).setDate(new Date().getDate() + day);
};

const todos: TodoItem[] = [
  {
    id: '1',
    title: 'Test Todo',
    desc: 'Description for test todo',
    expireDate: (Date.now() + 10000).toString(),
    icon: 'orange',
    isDone: false,
    createDate: Date.now(),
  },
  {
    id: '2',
    title: 'Test Todo',
    desc: 'Description for test todo',
    expireDate: (Date.now() + 20000).toString(),
    icon: 'red',
    isDone: false,
    createDate: Date.now(),
  },
  {
    id: '3',
    title: 'Test Todo',
    desc: 'Description for test todo',
    expireDate: (Date.now() + 30000).toString(),
    icon: 'yellow',
    isDone: false,
    createDate: Date.now(),
  },
  {
    id: '4',
    title: 'Test Todo',
    desc: 'Description for test todo',
    expireDate: getDate(3).toString(),
    icon: 'none',
    isDone: false,
    createDate: Date.now(),
  },
  {
    id: '5',
    title: 'Test Todo',
    desc: 'Description for test todo',
    expireDate: getDate(3).toString(),
    icon: 'red',
    isDone: false,
    createDate: Date.now(),
  },
];

test('HomeScreen - Sort by priority', () => {
  const handleSort = (sort: SortMode): TodoItem[] => {
    let tempData: TodoItem[] = [];
    const iconPriority: {[key: string]: number} = {
      red: 1,
      orange: 2,
      yellow: 3,
      none: 4,
      all: 5,
    };
    if (sort === 'highToLow') {
      tempData = [...todos].sort((a, b) => {
        return iconPriority[a.icon] - iconPriority[b.icon];
      });
    } else if (sort === 'lowToHigh') {
      tempData = [...todos].sort((a, b) => {
        return iconPriority[b.icon] - iconPriority[a.icon];
      });
    } else {
      tempData = [...todos];
    }
    return tempData;
  };

  // red > orange > yellow > none
  const highToLowArr = ['red', 'red', 'orange', 'yellow', 'none'];
  expect(handleSort('highToLow').map(item => item.icon)).toEqual(highToLowArr);

  // none > yellow > orange > red
  const lowToHighArr = ['none', 'yellow', 'orange', 'red', 'red'];
  expect(handleSort('lowToHigh').map(item => item.icon)).toEqual(lowToHighArr);
  // default
  expect(handleSort('default')).toEqual(todos);
});

test('HomeScreen - func matchDate', () => {
  const getDateWithoutTime = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const isMatchDate = (item: TodoItem, selectedFilterDate: number) => {
    if (selectedFilterDate && item.expireDate) {
      const expireDate = getDateWithoutTime(new Date(Number(item.expireDate)));
      const selectedDate = getDateWithoutTime(new Date(selectedFilterDate));
      return expireDate.getTime() === selectedDate.getTime();
    } else if (selectedFilterDate && !item.expireDate) {
      return false;
    }
    return true;
  };

  const selectedDate = Date.now();

  expect(isMatchDate(todos[0], selectedDate)).toEqual(true);
  expect(isMatchDate(todos[3], selectedDate)).not.toEqual(true);
  expect(isMatchDate(todos[4], selectedDate)).not.toEqual(true);
});
