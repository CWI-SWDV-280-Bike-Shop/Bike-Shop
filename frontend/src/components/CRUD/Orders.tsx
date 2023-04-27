import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import Layout from '@styles/layout/Layout';
import OrderAPI from '@api/order.api';
import ProductAPI from '@/api/product.api';
import UserAPI from '@/api/user.api';
import { Order, OrderItem, User, Product } from '@/types/data.types';
import { formatPrice } from '@/utilities/formatter';

const AddOrder = () => {
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState<OrderItem[]>([]);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    ProductAPI.getAll().then((res) => {
      setProducts(res.data);
    });
    UserAPI.getAll().then((res) => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    const newTotal = items.reduce((previousValue, item) => {
      return previousValue + item?.price;
    }, 0);
    setTotal(newTotal);
  }, [items]);

  const handleAdd = (product: Product) => {
    const newItem = {
      product: product?._id,
      price: product?.price,
      quantity: 1,
    };
    setItems([...items, newItem]);
  };

  const handleSubmit = async () => {
    const newOrder = {
      customer: customerId,
      items,
      total,
    };
    OrderAPI.create(newOrder).then((res) => {
      console.log(res.data);
      setOrder(res.data);
    });
    setSubmitted(true);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>Add Order</Text>

      <Text>Customer</Text>
      <Picker
        style={Layout.input}
        selectedValue={customerId}
        onValueChange={(value) => setCustomerId(value)}
      >
        <Picker.Item label="-Select Customer-" />
        {users &&
          users.map((user: User, index: number) => (
            <Picker.Item
              key={index}
              label={`${user?.name} - ${user?.role}`}
              value={user?._id}
            ></Picker.Item>
          ))}
      </Picker>

      <Text>Items</Text>
      <Picker
        style={[Layout.input]}
        selectedValue={selectedProduct?._id}
        onValueChange={(value) => {
          const product = products.find((product) => product._id === value);
          setSelectedProduct(product);
        }}
      >
        <Picker.Item label="-Select Product-" />
        {products &&
          products.map((product: Product, index: number) => (
            <Picker.Item
              key={index}
              label={`${product?.category} - ${product?.name}`}
              value={product?._id}
            />
          ))}
      </Picker>
      <TouchableOpacity
        style={[Styles.button, Styles.saveBtn]}
        onPress={() => handleAdd(selectedProduct)}
      >
        <Text style={Styles.buttonText}>
          Add <Icon size={15} name="add-outline" />
        </Text>
      </TouchableOpacity>

      <Text>Selected Items</Text>
      {items &&
        items.map((item: OrderItem, index: number) => (
          <View style={Layout.card} key={index}>
            <Text>Product ID: {item?.product as string}</Text>
            <Text>Price: {formatPrice(item?.price)}</Text>
            <Text>Quantity: {item?.quantity}</Text>
          </View>
        ))}

      <Text>Total: {formatPrice(total)}</Text>

      <Button title="Submit" onPress={handleSubmit}></Button>

      {submitted && (
        <View>
          <Text>New Order Added!</Text>
          <Text>OrderId: {order?._id}</Text>
          <Text>CustomerId: {order?.customer as string}</Text>
          <Text>Created: {order?.createdAt}</Text>
        </View>
      )}
    </View>
  );
};

const ListOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editModalVisibile, setEditModalVisible] = useState(false);
  const [deleteModalVisibile, setDeleteModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    OrderAPI.getAll().then((res) => setOrders(res.data));
  }, []);

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setEditModalVisible(true);
  };

  const handleDelete = (order: Order) => {
    setSelectedOrder(order);
    setDeleteModalVisible(true);
  };

  const saveOrder = (editedOrder: Order) => {
    OrderAPI.update(editedOrder._id, editedOrder);
    const updatedOrders = orders.map((order: Order) => {
      return order._id === editedOrder._id ? editedOrder : order;
    });
    setOrders(updatedOrders);
  };

  const deleteOrder = (deletedOrder: Order) => {
    OrderAPI.delete(deletedOrder._id).then((res) =>
      setMessage(res.data.message)
    );
    const updatedOrders = orders.filter((order: Order) => {
      return order._id !== deletedOrder._id;
    });
    setOrders(updatedOrders);
  };

  return (
    <View style={Layout.subsection}>
      <Text style={Layout.subtitle}>List Orders</Text>
      {orders &&
        orders.map((order: Order, index: number) => (
          <View style={Layout.card} key={index}>
            <Text>Order ID: {order?._id}</Text>
            <Text>
              Customer:{' '}
              {typeof order?.customer === 'string'
                ? order?.customer
                : order?.customer?.name}
            </Text>
            <Text>Items:</Text>
            {order?.items.map((item: OrderItem, index: number) => (
              <View style={Layout.card} key={index}>
                <Text>
                  Product:{' '}
                  {typeof item?.product === 'string'
                    ? item?.product
                    : item?.product?.name}
                </Text>
                <Text>
                  Category:{' '}
                  {typeof item?.product === 'string'
                    ? item?.product
                    : item?.product?.category}
                </Text>
                <Text>
                  Price:{' '}
                  {typeof item?.product === 'string'
                    ? 0
                    : formatPrice(item?.product?.price)}
                </Text>
              </View>
            ))}

            <Text>Total: {formatPrice(order?.total)}</Text>

            <View style={Styles.buttonContainer}>
              <TouchableOpacity
                style={[Styles.button, Styles.editBtn]}
                onPress={() => handleEdit(order)}
              >
                <Text style={Styles.buttonText}>
                  Edit <Icon name="create-outline" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[Styles.button, Styles.deleteBtn]}
                onPress={() => handleDelete(order)}
              >
                <Text style={Styles.buttonText}>
                  Delete <Icon name="trash-outline" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      <EditOrder
        order={selectedOrder}
        visible={editModalVisibile}
        onClose={() => setEditModalVisible(false)}
        onSave={saveOrder}
      />
      <DeleteOrder
        order={selectedOrder}
        visible={deleteModalVisibile}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={deleteOrder}
      />
    </View>
  );
};

const EditOrder = ({
  order,
  visible,
  onClose,
  onSave,
}: {
  order: Order;
  visible: boolean;
  onClose: () => void;
  onSave: (order: Order) => void;
}) => {
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState<OrderItem[]>([]);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    ProductAPI.getAll().then((res) => {
      setProducts(res.data);
    });
    UserAPI.getAll().then((res) => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    if (order) {
      setCustomerId(
        typeof order?.customer === 'string'
          ? order?.customer
          : order?.customer?._id
      );
      setItems(order?.items);
      setTotal(order?.total);
    }
  }, [order]);

  const handleAdd = (product: Product) => {
    const newItem = {
      product: product?._id, // if we just have `product` here, ADDing works in the UI but fails at the API
      price: product?.price,
      quantity: 1,
    };
    setItems([...items, newItem]);
    setTotal(total + (product?.price || 0));
  };

  const deleteItem = (deletedItem: OrderItem) => {
    const updatedItems = items.filter((item) => {
      return item._id !== deletedItem._id;
    });
    setItems(updatedItems);
  };

  const handleSave = () => {
    const editedOrder = {
      ...order,
      customer: customerId,
      items,
      total,
    };
    order.items = editedOrder.items;
    onSave(editedOrder);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={Styles.modalContainer}>
        <Text style={Layout.subtitle}>Edit Order {order?._id}</Text>

        <Text>Customer</Text>
        <Picker
          style={Layout.input}
          selectedValue={customerId}
          onValueChange={(value) => setCustomerId(value)}
        >
          <Picker.Item label="-Select Customer-" />
          {users &&
            users.map((user: User, index: number) => (
              <Picker.Item
                key={index}
                label={`${user?.name} - ${user?.role}`}
                value={user?._id}
              ></Picker.Item>
            ))}
        </Picker>

        <Text>Items:</Text>
        {items.map((item: OrderItem, index: number) => (
          <View style={Layout.card} key={index}>
            <Text>
              {typeof item?.product === 'string'
                ? item?.product
                : item?.product?.name}
            </Text>
            <Text>
              {typeof item?.product === 'string'
                ? 0
                : formatPrice(item?.product?.price)}
            </Text>

            <TouchableOpacity
              style={[Styles.button, Styles.deleteBtn]}
              onPress={() => deleteItem(item)}
            >
              <Text style={Styles.buttonText}>
                Remove <Icon size={15} name="trash-outline" />
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text>Add Item</Text>
        <Text style={{ fontWeight: 'bold' }}>
          NOTE:{' '}
          <Text style={{ fontWeight: 'normal' }}>
            There is an issue with adding products here. It's currently only
            passing a productId in `items`, because that's what the API is
            expecting when updating the `items`` on an Order object. If we pass
            the entire Product object, it will populate correctly here in the
            UI, but will fail when we try to update the Order through the API
            because `items` is expecting Product Id's, not entire Product
            objects :/
          </Text>
        </Text>
        <Picker
          style={[Layout.input]}
          selectedValue={selectedProduct?._id}
          onValueChange={(value) => {
            const product = products.find((product) => product._id === value);
            setSelectedProduct(product);
          }}
        >
          <Picker.Item label="-Select Product-" />
          {products &&
            products.map((product: Product, index: number) => (
              <Picker.Item
                key={index}
                label={`${product?.category} - ${product?.name}`}
                value={product?._id}
              />
            ))}
        </Picker>
        <TouchableOpacity
          style={[Styles.button, Styles.saveBtn]}
          onPress={() => handleAdd(selectedProduct)}
        >
          <Text style={Styles.buttonText}>
            Add <Icon size={15} name="add-outline" />
          </Text>
        </TouchableOpacity>

        <Text>Total: {formatPrice(total)}</Text>

        <View style={Styles.buttonContainer}>
          <TouchableOpacity
            style={[Styles.button, Styles.saveBtn]}
            onPress={handleSave}
          >
            <Text style={Styles.buttonText}>
              Save <Icon size={15} name="save-outline" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Styles.button, Styles.closeBtn]}
            onPress={onClose}
          >
            <Text style={Styles.buttonText}>
              Close <Icon size={15} name="close-circle-outline" />
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const DeleteOrder = ({ order, visible, onClose, onDelete }) => {
  const handleDelete = () => {
    const deletedOrder = { ...order };
    onDelete(deletedOrder);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View>
        <Text style={{ fontWeight: 'bold' }}>
          Are you sure you want to delete the following order?
        </Text>
        <View style={Layout.card} key={order?._id}>
          <Text>Order ID: {order?._id}</Text>
          <Text>
            Customer:{' '}
            {typeof order?.customer === 'string'
              ? order?.customer
              : order?.customer?.name}
          </Text>
          <Text>Items:</Text>
          {order?.items.map((item: OrderItem, index: number) => (
            <View style={Layout.card} key={index}>
              <Text>
                Product:{' '}
                {typeof item?.product === 'string'
                  ? item?.product
                  : item?.product?.name}
              </Text>
              <Text>
                Category:{' '}
                {typeof item?.product === 'string'
                  ? item?.product
                  : item?.product?.category}
              </Text>
              <Text>
                Price:{' '}
                {typeof item?.product === 'string'
                  ? 0
                  : formatPrice(item?.product?.price)}
              </Text>
            </View>
          ))}
          <View style={Styles.buttonContainer}>
            <TouchableOpacity
              style={[Styles.button, Styles.deleteBtn]}
              onPress={handleDelete}
            >
              <Text style={Styles.buttonText}>
                Delete <Icon size={15} name="trash-outline" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Styles.button, Styles.closeBtn]}
              onPress={onClose}
            >
              <Text style={Styles.buttonText}>
                Close <Icon size={15} name="close-circle-outline" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Orders = () => {
  return (
    <ScrollView style={Layout.section}>
      <Text style={Layout.title}>Orders</Text>
      <AddOrder />
      <ListOrders />
    </ScrollView>
  );
};

export default Orders;
