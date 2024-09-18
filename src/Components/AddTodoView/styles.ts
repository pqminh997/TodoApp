import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  filterView: {
    position: 'absolute',
    alignSelf: 'center',
  },
  filterBottomView: {
    position: 'absolute',
    alignSelf: 'center',
  },
  separator: {
    fontSize: 30,
    color: 'gray',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  descTxt: {
    fontSize: 16,
    minHeight: 40,
    marginBottom: 0,
    color: '#787878',
  },
  titleTxt: {fontSize: 16, height: 40},
  contentView: {flex: 1, paddingHorizontal: 20},
  icon: {width: 24, height: 24},
  bottomContainer: {flexDirection: 'row-reverse', marginBottom: 10},
  dueTime: {flexDirection: 'row', alignItems: 'center'},
});

export default styles;
