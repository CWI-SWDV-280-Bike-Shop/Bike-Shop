import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Layout
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
  // Texts 
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  header: {
    marginTop: 10,
    fontSize: 45,
    color: "#262626",
    textAlign: 'center',
  },
  bodyText: {
    marginTop: 15,
    fontSize: 24,
    color: "#262626",
    textAlign: "center",
  },
  errorText: {
    marginLeft: 10,
    marginTop: 15,
    fontSize: 24,
    color: "#dc143c",
    textAlign: "center",
  },
  text: {
    flex: 0.5,
  },
  // Styles
  button: {
    flexDirection: "row",
    backgroundColor: "#03312E",
    padding: 10,
    marginTop: -15,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  buttonContent: {
    color: "#FFFFFF",
    textAlign: 'center',
    fontSize: 20,
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
  contentContainer: {
    flex: 1,
    backgroundColor: '#D3D5D4',
    alignItems: "center",
    paddingBottom: 50,
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
  textArea: {
    margin: 10,
    fontSize: 24,
    backgroundColor: "#FFF",
    borderColor: "#03312E",
    borderWidth: 2,
    borderRadius: 10,
    minWidth: 300,
    padding: 8,
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