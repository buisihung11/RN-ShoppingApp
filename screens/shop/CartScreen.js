import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/cart';

import { useCart } from '../../store/reducers/cart';
import { db } from '../../store/firebase';
import { useUser } from '../../store/reducers/user';
import moment from 'moment';

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
  const [
    {
      user: { uid },
    },
  ] = useUser();
  const cartItems = transformCart(items);

  const orderSubmitHandler = async () => {
    try {
      const res = await (await db.ref('orders').child(uid).push()).set({
        items: cartItems,
        amount: cartTotalAmount,
        readableDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
      });

      console.log('res_Order', res);
      Alert.alert('Order success', 'Your order was made', [{ text: 'Okay' }]);
      cartDispatcher({ type: 'CLEAR_CART' });
    } catch (err) {
      console.log('err', err);
      Alert.alert('Order failed', err.message, [{ text: 'Okay' }]);
    }
  };

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
          onPress={orderSubmitHandler}
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
