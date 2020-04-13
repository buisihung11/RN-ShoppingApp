import React, { useEffect, useCallback, useState } from 'react';
import { FlatList, Button, Platform, View, Text } from 'react-native';
// import axios from 'axios';
import { db } from '../../store/firebase';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';

import { useProduct } from '../../store/reducers/products';
import { useCart } from '../../store/reducers/cart';

const transformProduct = (products) => {
  const productsId = Object.keys(products);

  const transformedProducts = [];

  productsId.forEach((id) => {
    const product = products[id];
    transformedProducts.push({ id, ...product });
  });

  return transformedProducts;
};

const ProductsOverviewScreen = ({ navigation }) => {
  const [{ availableProducts }] = useProduct();
  const [products, setProducts] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [, dispatch] = useCart();

  const fetchProducts = useCallback(async () => {
    setIsFetching(true);
    const data = await db.ref('/products').once('value');

    console.log('data', data);
    setProducts(transformProduct(data.val()).concat(availableProducts));
    setIsFetching(false);
  }, []);

  useEffect(() => {
    // fetch products
    fetchProducts();
  }, [fetchProducts]);

  const selectItemHandler = (id, title) => {
    console.log(id, title);
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  if (isFetching)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Fetching products... 🐱‍🏍</Text>
      </View>
    );

  if (products && products.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>No products was created</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      refreshing={isFetching}
      onRefresh={fetchProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverviewScreen;
