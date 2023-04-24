import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 3,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
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
  closeBtn: {
    backgroundColor: 'gray',
  },
});
