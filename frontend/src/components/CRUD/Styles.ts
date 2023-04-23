import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  table: {
    flexDirection: 'row',
  },
  modalContainer: {
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editBtn: {
    backgroundColor: '#f6aa1c',
  },
  deleteBtn: {
    backgroundColor: '#941b0c',
  },
  saveBtn: {
    backgroundColor: '#2b9348',
  },
});
