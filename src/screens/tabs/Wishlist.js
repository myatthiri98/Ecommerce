import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../../common/Header';
import { useNavigation } from '@react-navigation/native';

const Wishlist = () => {
  const wishlistItems = useSelector(state => state.wishlist.data);
  const navigation = useNavigation();

  // Use Set to keep track of unique item IDs
  const uniqueItemIds = new Set();

  const uniqueWishlistItems = wishlistItems.filter(item => {
    if (uniqueItemIds.has(item.id)) {
      // If the item ID is already in the set, skip it
      return false;
    }
    // Otherwise, add the item ID to the set and include the item in the list
    uniqueItemIds.add(item.id);
    return true;
  });

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.productItem}
      onPress={() => {
        navigation.navigate('ProductDetail', { data: item });
      }}>
      <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
      <View>
        <Text style={styles.name}>
          {item.title.length > 25 ? item.title.substring(0, 25) + '...' : item.title}
        </Text>
        <Text style={styles.desc}>
          {item.description.length > 30 ? item.description.substring(0, 30) + '...' : item.description}
        </Text>
        <Text style={styles.price}>{'$' + item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={'Wishlist Items'} />
      <FlatList
        data={uniqueWishlistItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString() + index}
      />
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff',
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
});
