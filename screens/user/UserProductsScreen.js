import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, Button, Alert, View } from 'react-native';
import { ActivityIndicator, Title } from 'react-native-paper';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';
import { db } from '../../store/firebase';
import { useUser } from '../../store/reducers/user';

const transformProduct = (products) => {
  const productsId = Object.keys(products);

  const transformedProducts = [];

  productsId.forEach((id) => {
    const product = products[id];
    transformedProducts.push({ id, ...product });
  });

  return transformedProducts;
};

const UserProductsScreen = (props) => {
  const [
    {
      user: { uid },
    },
  ] = useUser();

  const [products, setProducts] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const fetchProducts = useCallback(async () => {
    setIsFetching(true);
    const data = await db
      .ref('/products')
      .orderByChild('ownerId')
      .equalTo(uid)
      .once('value');

    console.log('data', data);
    setProducts(transformProduct(data.val()));
    setIsFetching(false);
  }, [uid]);

  useEffect(() => {
    // fetch products
    fetchProducts();
  }, [fetchProducts]);

  const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  if (isFetching)
    return (
      <View>
        <ActivityIndicator animating={true} color={Colors.primary} />
        <Title>Fetching your products</Title>
      </View>
    );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
