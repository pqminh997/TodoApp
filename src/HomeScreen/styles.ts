import {StyleSheet} from 'react-native';

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
  clearDateText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'right',
  },
  iconArrowDown: {width: 18, height: 18, marginLeft: 4},
  rightView: {flexDirection: 'row', position: 'absolute', right: 20},
});

export default styles;
