import React, {useState} from 'react';
import {  Text, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '@context/auth.context';
import { useContext } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export const Account = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [editType, setEditType] = useState("");
    const { isLoggedIn, authUser } = useContext(AuthContext);
    const username = isLoggedIn && authUser.name;
    const email = isLoggedIn && authUser.email;

    const [form, setForm] = useState({
      "username" : username,
      "email" : email
      });

    const fields = [
      {"name": "username", "label": "Username"},
      {"name": "email", "label": "Email"},
      {"name": "password", "label": "Password"},
      {"name": "phone", "label": "Phone"},
      {"name": "address", "label": "Address"},
      {"name": "state", "label": "State"},
      {"name": "zipcode", "label": "Zip Code"},
    ]

    return (
      <View style={[styles.container]}>
        <ScrollView>
        <View style={styles.profileDetails}>
          <View style={styles.profileImage}><Icon name="person-circle-outline" size={100} color="#FFF" /></View>
          <Text style={styles.profileName}>{username}</Text>
        </View>
        <View style={styles.accountDetails}>
          {
            fields.map((item, i) => (
              <View style={styles.row}>
                <Text style={styles.label}>{item.label}</Text>
                <TextInput value={form[item.name]} style={styles.editBox} />
              </View>
            ))
          }
          <View style={styles.rowBottom}>
            <TouchableOpacity style={styles.buttonPrimary} >
              <Text style={styles.btnFont}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor: '#444',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  accountDetails: {
    marginHorizontal: 40,
    flexDirection: 'column',
    columnGap: 15,
    paddingBottom: 60,
    padding: 5,
  },
  row: {
    justifyContent: 'space-around',
    paddingHorizontal: 'auto'
  },
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#33333370',
    fontWeight: 'bold',
    position: 'relative',
    bottom: -30,
    left: 20
  }, 
  editBox: {
    paddingTop: 32,
    padding: 16,
    marginBottom: 20,
    margin: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.42,
    shadowRadius: 2.22,
    elevation: 1,
  },
  profileDetails: {
    gap: 15,
    marginVertical: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  buttonPrimary: {
    width: 'fit-content',
    backgroundColor: '#477B61',
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnFont: {
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D3D5D4',
  }, 
  bodyText: {
    margin: 10,
    fontSize: 30,
    color: "#262626",
  },
});