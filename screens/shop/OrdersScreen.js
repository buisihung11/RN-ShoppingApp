import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db } from '../../store/firebase';
import OrderItem from '../../components/shop/OrderItem';
import { useUser } from '../../store/reducers/user';
import { Title } from 'react-native-paper';

const transformOrder = (orders) => {
  if (!orders) return null;
  const ordersId = Object.keys(orders);

  const transformedOrders = [];

  ordersId.forEach((id) => {
    const order = orders[id];
    transformedOrders.push({ id, ...order });
  });

  return transformedOrders;
};

const OrdersScreen = (props) => {
  // const [{ orders }] = useOrder();
  const [orders, setOrders] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [
    {
      user: { uid },
    },
  ] = useUser();

  const fetchOrders = useCallback(async () => {
    setIsFetching(true);
    const data = await db.ref('orders').child(uid).once('value');
    console.log('orderData', data);
    setOrders(transformOrder(data.val()));
    setIsFetching(false);
  }, [uid]);

  useEffect(() => {
    // fetch order
    fetchOrders();
  }, [fetchOrders]);

  if (isFetching)
    return (
      <View>
        <Text>Fetching data... 🐱‍🏍</Text>
      </View>
    );

  if (!orders || (orders && orders.length === 0)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Title>No orders was created</Title>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      onRefresh={fetchOrders}
      refreshing={isFetching}
      keyExtractor={(item) => item.id}
      renderItem={({ item: { amount, readableDate, items } }) => (
        <OrderItem amount={amount} date={readableDate} items={items} />
      )}
    />
  );
};

export default OrdersScreen;
