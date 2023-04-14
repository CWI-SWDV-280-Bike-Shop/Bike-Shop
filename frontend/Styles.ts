import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  section: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#6A7B76',
    borderRadius: 10,
  },
  subsection: {
    margin: 5,
    padding: 5,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    fontWeight: 'bold',
  },
});
