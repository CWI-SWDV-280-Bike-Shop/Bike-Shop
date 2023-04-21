import { Orders } from '@/pages/Profile/orders';
import * as React from 'react';
import {  Text, StyleSheet, View, FlatList } from 'react-native';
import { ItemCard } from '../Cards/ItemCards';
import { OrderItem } from './OrderItem';

export const OrderList = ({orders}) => {

    return (
      <View>
          <FlatList
            data={orders}
            renderItem={({item}) => <OrderItem item={item} />}
          />
      </View>  
    );

};

const styles = StyleSheet.create({
  
});

