import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    minHeight: 60,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 10,
  },
  contentView: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  expiryType: {
    backgroundColor: '#fadbd8',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
  },
  checkDone: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {width: 14, height: 14},
  iconDelete: {width: 20, height: 20},
  textContainer: {
    justifyContent: 'center',
    maxWidth: '90%',
    marginRight: 20,
  },
  textTitleDone: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  textDescDone: {
    color: '#7f8c8d',
  },
  textTitle: {
    fontSize: 17,
  },
  textDesc: {
    fontSize: 12,
    color: '#787878',
  },
  textDueTime: {
    marginTop: 6,
    fontSize: 12,
    color: '#787878',
  },
  rightViewContainer: {
    justifyContent: 'center',
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
