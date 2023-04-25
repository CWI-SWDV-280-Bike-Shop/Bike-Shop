import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
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
  card: {
    margin: 10,
    flexDirection: 'column',
    gap: 8,
    flex: 1,
    padding: 15
  },
  cardContainer: {
    flex: 15,
    backgroundColor: '#D3D5D4',
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
  text: {
    flex: 0.5,
  },
  searchbar: {
    flex: 0.5,
  },
  by: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.75,
  },
});