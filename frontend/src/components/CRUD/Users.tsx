import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import Styles from "./Styles";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import Layout from "@styles/layout/Layout";
import UserAPI from "@api/user.api";
import { User } from "@/types/data.types";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [role, setRole] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState({} as User);

  const onChangeAddress = (fieldName: string, value: string) => {
    setAddress({ ...address, [fieldName]: value });
  };

  const handleSubmit = async () => {
    const newUser: User = {
      name,
      email,
      phone,
      address,
      role,
    };
    UserAPI.create(newUser).then((res) => setUser(res.data));
    setSubmitted(true);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Add User</Text>

      <Text>
        TODO: Imagine you're an admin, manually adding a user. We DO NOT want
        the admin setting the password for the user, this should be done through
        an email service to "Set up your Login" or something. However, being
        that we're short on time, we may just have to allow the admin to set the
        password, and then hijack the Auth route for registering the user.
      </Text>

      <Text>Name</Text>
      <TextInput
        style={Layout.input}
        value={name}
        onChangeText={(value) => setName(value)}
      />

      <Text>Email</Text>
      <TextInput
        style={Layout.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />

      <Text>Phone</Text>
      <TextInput
        style={Layout.input}
        value={phone}
        onChangeText={(value) => setPhone(value)}
      />

      <Text>Address</Text>
      <Text>Street</Text>
      <TextInput
        style={Layout.input}
        value={address.street}
        onChangeText={(value) => onChangeAddress("street", value)}
      />
      <Text>City</Text>
      <TextInput
        style={Layout.input}
        value={address.city}
        onChangeText={(value) => onChangeAddress("city", value)}
      />
      <Text>State</Text>
      <TextInput
        style={Layout.input}
        value={address.state}
        onChangeText={(value) => onChangeAddress("state", value)}
      />
      <Text>Zip</Text>
      <TextInput
        style={Layout.input}
        value={address.zip}
        onChangeText={(value) => onChangeAddress("zip", value)}
      />
      <Text>Country</Text>
      <TextInput
        style={Layout.input}
        value={address.country}
        onChangeText={(value) => onChangeAddress("country", value)}
      />

      <Text>Role</Text>
      <Picker
        style={Layout.input}
        selectedValue={role}
        onValueChange={(value) => setRole(value)}
      >
        <Picker.Item label="Customer" value="Customer"></Picker.Item>
        <Picker.Item label="Admin" value="Admin"></Picker.Item>
      </Picker>

      <Button title="Submit" onPress={handleSubmit}></Button>
    </View>
  );
};

const ListUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editModalVisibile, setEditModalVisible] = useState(false);
  const [deleteModalVisibile, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    UserAPI.getAll().then((res) => setUsers(res.data));
  }, []);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditModalVisible(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteModalVisible(true);
  };

  const saveUser = (editedUser: User) => {
    UserAPI.update(editedUser._id, editedUser);
    const updatedUsers = users.map((user: User) => {
      return user._id === editedUser._id ? editedUser : user;
    });
    setUsers(updatedUsers);
  };

  const deleteUser = (deletedUser: User) => {
    UserAPI.delete(deletedUser._id).then((res) => setMessage(res.data.message));
    const updatedUsers = users.filter((user: User) => {
      return user._id !== deletedUser._id;
    });
    setUsers(updatedUsers);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Users</Text>
      {users &&
        users.map((user, index) => (
          <View style={Layout.card} key={index}>
            <Text>ID: {user?._id}</Text>
            <Text>Name: {user?.name}</Text>
            <Text>Email: {user?.email}</Text>
            <Text>Role: {user?.role}</Text>
            <Text>Phone: {user?.phone}</Text>
            <Text>Address</Text>
            <Text> Street: {user?.address?.street}</Text>
            <Text> City: {user?.address?.city}</Text>
            <Text> State: {user?.address?.state}</Text>
            <Text> Zip: {user?.address?.zip}</Text>
            <Text> Country: {user?.address?.country}</Text>
            <View style={Styles.buttonContainer}>
              <TouchableOpacity
                style={[Styles.button, Styles.editBtn]}
                onPress={() => handleEdit(user)}
              >
                <Text style={Styles.buttonText}>
                  Edit <Icon name="create-outline"></Icon>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[Styles.button, Styles.deleteBtn]}
                onPress={() => handleDelete(user)}
              >
                <Text style={Styles.buttonText}>
                  Delete <Icon name="trash-outline"></Icon>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      <EditUser
        user={selectedUser}
        visible={editModalVisibile}
        onClose={() => setEditModalVisible(false)}
        onSave={saveUser}
      />
      <DeleteUser
        user={selectedUser}
        visible={deleteModalVisibile}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={deleteUser}
      />
    </View>
  );
};

const EditUser = ({ user, visible, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [role, setRole] = useState("");

  const onChangeAddress = (fieldName: string, value: string) => {
    setAddress({ ...address, [fieldName]: value });
  };

  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setEmail(user?.email || "");
      setPhone(user?.phone || "");
      setAddress(
        user?.address || {
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        }
      );
      setRole(user?.role || "");
    }
  }, [user]);

  const handleSave = () => {
    const editedUser = {
      ...user,
      name,
      email,
      phone,
      address,
      role,
    };
    onSave(editedUser);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={Styles.modalContainer}>
        <Text style={Layout.subtitle}>Edit {name}</Text>

        <Text>Name</Text>
        <TextInput
          style={Layout.input}
          value={name}
          onChangeText={(value) => setName(value)}
        ></TextInput>

        <Text>Email</Text>
        <TextInput
          style={Layout.input}
          value={email}
          onChangeText={(value) => setEmail(value)}
        ></TextInput>

        <Text>Phone</Text>
        <TextInput
          style={Layout.input}
          value={phone}
          onChangeText={(value) => setPhone(value)}
        ></TextInput>

        <Text>Address</Text>
        <Text>Street</Text>
        <TextInput
          style={Layout.input}
          value={address.street}
          onChangeText={(value) => onChangeAddress("street", value)}
        />
        <Text>City</Text>
        <TextInput
          style={Layout.input}
          value={address.city}
          onChangeText={(value) => onChangeAddress("city", value)}
        />
        <Text>State</Text>
        <TextInput
          style={Layout.input}
          value={address.state}
          onChangeText={(value) => onChangeAddress("state", value)}
        />
        <Text>Zip</Text>
        <TextInput
          style={Layout.input}
          value={address.zip}
          onChangeText={(value) => onChangeAddress("zip", value)}
        />
        <Text>Country</Text>
        <TextInput
          style={Layout.input}
          value={address.country}
          onChangeText={(value) => onChangeAddress("country", value)}
        />

        <Text>Role</Text>
        <Picker
          style={Layout.input}
          selectedValue={role}
          onValueChange={(value) => setRole(value)}
        >
          <Picker.Item label="Customer" value="Customer"></Picker.Item>
          <Picker.Item label="Admin" value="Admin"></Picker.Item>
        </Picker>

        <View style={Styles.buttonContainer}>
          <TouchableOpacity
            style={[Styles.button, Styles.saveBtn]}
            onPress={handleSave}
          >
            <Text style={Styles.buttonText}>
              Save <Icon size={15} name="save-outline"></Icon>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Styles.button, Styles.closeBtn]}
            onPress={onClose}
          >
            <Text style={Styles.buttonText}>
              Close <Icon size={15} name="close-circle-outline"></Icon>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const DeleteUser = ({ user, visible, onClose, onDelete }) => {
  const handleDelete = () => {
    const deletedUser = { ...user };
    onDelete(deletedUser);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View>
        <Text style={{ fontWeight: "bold" }}>
          Are you sure you want to delete the following user?
        </Text>
        <View style={Layout.card} key={user?._id}>
          <Text>ID: {user?._id}</Text>
          <Text>Name: {user?.name}</Text>
          <Text>Email: {user?.email}</Text>
          <Text>Role: {user?.role}</Text>
          <Text>Phone: {user?.phone}</Text>
          <Text>Address</Text>
          <Text> Street: {user?.address?.street}</Text>
          <Text> City: {user?.address?.city}</Text>
          <Text> State: {user?.address?.state}</Text>
          <Text> Zip: {user?.address?.zip}</Text>
          <Text> Country: {user?.address?.country}</Text>
          <View style={Styles.buttonContainer}>
            <TouchableOpacity
              style={[Styles.button, Styles.deleteBtn]}
              onPress={handleDelete}
            >
              <Text style={Styles.buttonText}>
                Delete <Icon size={15} name="trash-outline"></Icon>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Styles.button, Styles.closeBtn]}
              onPress={onClose}
            >
              <Text style={Styles.buttonText}>
                Close <Icon size={15} name="close-circle-outline"></Icon>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Users = () => {
  return (
    <ScrollView style={Layout.section}>
      <Text style={Layout.title}>Users</Text>
      <AddUser />

      <ListUsers />
    </ScrollView>
  );
};

export default Users;
