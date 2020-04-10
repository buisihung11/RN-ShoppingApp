import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

import { useCart } from '../../store/reducers/cart';
import { useOrder } from '../../store/reducers/orders';

const transformCart = (items) => {
  const transformedCartItems = [];
  for (const key in items) {
    transformedCartItems.push({
      productId: key,
      productTitle: items[key].productTitle,
      productPrice: items[key].productPrice,
      quantity: items[key].quantity,
      sum: items[key].sum,
    });
  }
  return transformedCartItems.sort((a, b) =>
    a.productId > b.productId ? 1 : -1
  );
};

const CartScreen = (props) => {
  const [{ totalAmount: cartTotalAmount, items }, cartDispatcher] = useCart();
  const [, orderDispatcher] = useOrder();

  const cartItems = transformCart(items);

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            orderDispatcher(ordersActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              cartDispatcher(
                cartActions.removeFromCart(itemData.item.productId)
              );
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
