import React, {useState} from 'react';
import {  Text, StyleSheet, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Account = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [editType, setEditType] = useState("");

    return (
      <View style={[styles.container]}>

        <Modal
          visible = {modalVisible}
          transparent= {true}
          animationType='slide'
        >
          <View style={[styles.modalView]}>
            <Text style={[styles.modalText]}>New {editType}:</Text>
            <TextInput 
              style={[styles.textInput]}
              editable
              maxLength={20}
            />
            <Text style={[styles.modalText]}>Confirm {editType}:</Text>
            <TextInput 
              style={[styles.textInput]}
              editable
              maxLength={20}
            />
            <TouchableOpacity style={[styles.submitButton]}>
              <Text style={[styles.submitText]}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => 
                {
                  setModalVisible(!modalVisible);
                  setEditType("");
                }
            }>
              <Text style={[styles.cancelText]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={[styles.contentContainer]}>
          <Text style={[styles.bodyText]}>
            Account Information:
          </Text>

          <View style={[styles.infoRow]}>

            <View style={[styles.infoCol]}>
              <Text style={[styles.rowTitle]}>Username:</Text>
            </View>

            <View style={[styles.infoCol]}>
              <Text style={[styles.rowDescription]}>user_name</Text>
            </View>

            <View style={[styles.infoCol]}>
              <TouchableOpacity 
                style={[styles.editButton]}
                onPress={() => {setModalVisible(true); setEditType("Username");}}
              >
                <Icon name="create-outline" size={30} style={[styles.icon]}></Icon>
              </TouchableOpacity>
            </View>

          </View>
          <View style={[styles.infoRow]}>

            <View style={[styles.infoCol]}>
              <Text style={[styles.rowTitle]}>Password:</Text>
            </View>

            <View style={[styles.infoCol]}>
              <Text style={[styles.rowDescription]}>********</Text>
            </View>

            <View style={[styles.infoCol]}>
              <TouchableOpacity 
                style={[styles.editButton]}
                onPress={() => {setModalVisible(true); setEditType("Password");}}
              >
                <Icon name="create-outline" size={30} style={[styles.icon]}></Icon>
              </TouchableOpacity>
            </View>

          </View>
          <View style={[styles.infoRow]}>

            <View style={[styles.infoCol]}>
              <Text style={[styles.rowTitle]}>Email:</Text>
            </View>

            <View style={[styles.infoCol]}>
              <Text style={[styles.rowDescription]}>test@user.com</Text>
            </View>

            <View style={[styles.infoCol]}>
              <TouchableOpacity 
                style={[styles.editButton]}
                onPress={() => {setModalVisible(true); setEditType("Email");}}
              >
                <Icon name="create-outline" size={30} style={[styles.icon]}></Icon>
              </TouchableOpacity>
            </View>

          </View>
          <View style={[styles.infoRow]}></View>
          <View style={[styles.infoRow]}></View>
          <View style={[styles.infoRow]}></View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
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
  infoRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCol: {
    flex: 1,
    alignItems: 'center'
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  rowDescription: {
    fontSize: 24,
  },
  editButton: {
    backgroundColor: "#3E6259",
    padding: 8,
    borderRadius: 8
  },
  icon: {
    color: "#FFF"
  }, 
  modalView: {
    margin: 20,
    backgroundColor: "#3E6259",
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: '#FFF',
    fontSize: 20
  },
  cancelText: {
    color: '#FFF',
    textDecorationLine: 'underline',
    fontSize: 20
  },
  textInput: {
    backgroundColor: "#FFF",
    width: '50%'
  },
  submitButton: {
    marginVertical: 10,
    backgroundColor: "#6A7B76",
    padding: 10,
    borderRadius: 10
  },
  submitText: {
    color: "#FFF",
    fontSize: 20
  }
});