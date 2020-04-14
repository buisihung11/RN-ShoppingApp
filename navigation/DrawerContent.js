import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Button,
  Drawer,
  Avatar,
  Title,
  Caption,
  Paragraph,
} from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useUser } from '../store/reducers/user';
import { auth } from '../store/firebase';

const logout = async () => {
  await auth.signOut();
};

function DrawerContent(props) {
  const [
    {
      user,
      user: { email, displayName = 'HungHCC' },
    },
  ] = useUser();

  console.log('user_drawerContent', user);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        >
          <Avatar.Image
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            size={50}
          />
        </TouchableOpacity>
        <Title style={styles.title}>{displayName ?? 'HungHCC'}</Title>
        <Caption style={styles.caption}>{email}</Caption>
        <View style={styles.row}>
          <View style={styles.section}>
            <Paragraph style={[styles.paragraph, styles.caption]}>10</Paragraph>
            <Caption style={styles.caption}>Products</Caption>
          </View>
          <View style={styles.section}>
            <Paragraph style={[styles.paragraph, styles.caption]}>02</Paragraph>
            <Caption style={styles.caption}>Order</Caption>
          </View>
        </View>
      </View>
      <Drawer.Section style={{}} title="Routes">
        <DrawerItemList {...props} itemStyle={{ marginLeft: 30 }} />
      </Drawer.Section>
      <Button
        mode="contained"
        icon="logout"
        style={{ marginHorizontal: 20, marginVertical: 10 }}
        onPress={logout}
      >
        Logout
      </Button>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
