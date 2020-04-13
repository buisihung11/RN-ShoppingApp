import React, {
  useEffect,
  useCallback,
  useReducer,
  useLayoutEffect,
  useState,
} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import { db } from '../../store/firebase';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';

import { useProduct } from '../../store/reducers/products';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = ({ navigation, route }) => {
  const { productId } = route.params || {};

  const [editedProduct, setEditedProduct] = useState(null);
  const [handling, setHandling] = useState(false);
  useEffect(() => {
    if (productId) {
      // fetch product from firebase
      const fetchProductById = async () => {
        setHandling(true);
        const { data } = await db.ref('products/' + productId).once('value');
        setEditedProduct(data);
        setHandling(false);
      };
      fetchProductById();
    }
  }, [productId]);

  const [{ userProducts }, dispatch] = useProduct();
  const isEditMode = editedProduct ? true : false;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : 'Product title',
      imageUrl: editedProduct
        ? editedProduct.imageUrl
        : 'https://unsplash.com/photos/6cHumpSxTvs',
      description: editedProduct ? editedProduct.description : 'Description',
      price: '20',
    },
    inputValidities: {
      title: isEditMode,
      imageUrl: isEditMode,
      description: isEditMode,
      price: isEditMode,
    },
    formIsValid: !isEditMode,
  });

  const editProductHandler = useCallback(async () => {
    const res = await db.ref('products').child(productId).update({
      title: formState.inputValues.title,
      description: formState.inputValues.description,
      imageUrl: formState.inputValues.imageUrl,
    });

    console.log('res_edit', res);
  }, [productId]);

  const addProductHandler = useCallback(async () => {
    try {
      const product = {
        title: formState.inputValues.title,
        description: formState.inputValues.description,
        imageUrl: formState.inputValues.imageUrl,
        price: +formState.inputValues.price,
      };

      console.log('add_product', product);
      const productsRef = db.ref('products');
      const newProdRef = productsRef.push();

      await newProdRef.set(product);
      console.log('add new product success', newProdRef);
    } catch (err) {
      console.log('err', err);
    }
  }, []);

  const submitHandler = useCallback(async () => {
    if (isEditMode) {
      editProductHandler();
    } else {
      addProductHandler();
    }
    // navigation.goBack();
  }, [dispatch, productId, formState]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Save"
              iconName={
                Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
              }
              onPress={submitHandler}
            />
          </HeaderButtons>
        );
      },
    });
  }, [submitHandler, navigation]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (handling) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Fetching products... 🐱‍🏍</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : 'Product title'}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={
              editedProduct
                ? editedProduct.imageUrl
                : 'https://images.unsplash.com/photo-1520591799316-6b30425429aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            }
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              initialValue="20"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : 'Desc'}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditProductScreen;
