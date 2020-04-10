import React from "react";
import { FlatList } from "react-native";

import OrderItem from "../../components/shop/OrderItem";

import { useOrder } from "../../store/reducers/orders";

const OrdersScreen = (props) => {
  const [{ orders }] = useOrder();

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;
