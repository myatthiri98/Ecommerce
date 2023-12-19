import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';

const Search = () => {
  const products = useSelector(state => state.product.data);
  console.log(products)
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const [oldData, setOldData] = useState(products || []);
  const [searchedList, setSearchedList] = useState(oldData);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const categories = Array.from(new Set(oldData.map(item => item.category)));
    setFilteredCategories(categories);
  }, [oldData]);

  const filterData = txt => {
    let newData = oldData.filter(item => {
      return (
        typeof item.title === 'string' &&
        item.title.toLowerCase().includes(txt.toLowerCase())
      );
    });
    console.log('Filtered Data:', newData);
    setSearchedList(newData || []);
  };

  const handleCategoryPress = category => {
    const newSelectedCategory = selectedCategory === category ? null : category;

    let newData = oldData.filter(
      item =>
        (newSelectedCategory === null ||
          item.category === newSelectedCategory) &&
        item.title.toLowerCase().includes(search.toLowerCase()),
    );

    setSelectedCategory(newSelectedCategory);
    setSearchedList(newData || []);
    setShowCategories(false); // Hide categories after selecting one
  };
  const renderCategoryBox = () => {
    const allCategoriesOption = 'All Categories';
    const categoriesToRender = [allCategoriesOption, ...filteredCategories];

    return (
      <View style={styles.categoryBox}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.dropdownButton}>
          <Text style={styles.categoryTitle}>
            {selectedCategory || 'All Categories'}
          </Text>
          <View style={styles.arrowicon}>
            <Image
              source={require('../../images/down_arrow.png')}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {categoriesToRender.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryItem,
                    {
                      backgroundColor:
                        search !== '' && selectedCategory === item
                          ? '#e0e0e0'
                          : 'transparent',
                    },
                  ]}
                  onPress={() => handleCategoryPress(item)}>
                  <Text
                    style={[
                      styles.categoryText,
                      item === 'All Categories'
                        ? styles.allCategoriesText
                        : null,
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableHighlight
                style={styles.closeButton}
                underlayColor="transparent" // Set the underlay color to transparent
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'Search Items'} />
      <View style={styles.searchView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../images/search.png')}
            style={styles.icon}
          />
          <TextInput
            value={search}
            onChangeText={txt => {
              setSearch(txt);
              filterData(txt);
            }}
            placeholder="Search items here..."
            style={styles.input}
          />
        </View>
        {search !== '' && (
          <TouchableOpacity
            style={[
              styles.icon,
              {justifyContent: 'center', alignItems: 'center'},
            ]}
            onPress={() => {
              setSearch('');
              filterData('');
            }}>
            <Image
              source={require('../../images/clear.png')}
              style={[styles.icon, {width: 16, height: 16}]}
            />
          </TouchableOpacity>
        )}
      </View>
      {search === '' && renderCategoryBox()}
      <ScrollView style={{marginTop: 50, marginLeft: 30}}>
        {searchedList.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            style={styles.productItem}
            onPress={() => {
              navigation.navigate('ProductDetail', {data: item});
            }}>
            <Image source={{uri: item.thumbnail}} style={styles.itemImage} />

            <View>
              <Text style={styles.name}>
                {item.title.length > 25
                  ? item.title.substring(0, 25) + '...'
                  : item.title}
              </Text>
              <Text style={styles.desc}>
                {item.description.length > 30
                  ? item.description.substring(0, 30) + '...'
                  : item.description}
              </Text>
              <Text style={styles.price}>{'$' + item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchView: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    borderWidth: 2,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    borderColor: '#FF34A4'
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'center',
  },
  arrowicon: {
    width: 35,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FF3FA4',
    overflow: 'hidden',
    background: 'linear-gradient(45deg, #FF7FED, #FF3FA4)',
    borderWidth: 1,
    borderColor: '#FF3FA4',
  },

  input: {width: '80%', marginLeft: 10},
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
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
  categoryBox: {
    marginTop: 20,
    marginLeft: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryItem: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 14, // Set a smaller font size for regular categories
    color: '#000', // Set the text color to black
  },
  allCategoriesText: {
    fontSize: 18, // Set a larger font size for "All Categories"
    fontWeight: 'bold', // Make it bold for emphasis
    color: '#000', // Set the text color to black
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FF7FED',
    padding: 20,
    width: '80%',
    maxHeight: '80%',
    borderRadius: 10, // Add border radius for a rounded appearance
    borderWidth: 1,
    borderColor: '#FF3FA4',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Set text color to white
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#FF3FA4',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Set text color to white
  },
});
