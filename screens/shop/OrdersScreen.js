import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db } from '../../store/firebase';
import OrderItem from '../../components/shop/OrderItem';

import { useOrder } from '../../store/reducers/orders';

const transformOrder = (orders) => {
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

  const fetchOrders = useCallback(async () => {
    setIsFetching(true);
    const data = await db.ref('/orders').once('value');
    // const orderRef = db.ref('/orders');
    // const unsubcribe = orderRef.on('value', (snapshot) => {
    //   console.log('snapshot', snapshot.key, snapshot.val());
    // });

    setOrders(transformOrder(data.val()));
    setIsFetching(false);

    return () => {
      unsubcribe();
    };
  }, []);

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

  if (orders && orders.length === 0) {
    return (
      <View>
        <Text>No orders was created</Text>
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
