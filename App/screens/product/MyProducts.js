import {Icon, Text} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../resource/colors';
import scaling from '../../resource/normalize';
import Toast from 'react-native-simple-toast';
import Header from '../../components/header/Header';
import {
  DeleteProductAPI,
  ListofCategoryAPI,
  MyProductsAPI,
  UploadProductPhotoAPI,
} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';

export default function MyProducts({navigation}) {
  const [productlist, setProductList] = useState([]);
  const [category, setCategory] = useState([]);
  const [userRole, setUserRole] = useState('');


  

  const MyProducts = async () => {
    const token = await AsyncStorage.getItem('token');

    await MyProductsAPI(token)
      .then(response => {

        if (!response.ok) {
          if (response.status == 404) {
            throw new Error('Product not found.');
          }
          throw new Error('error');
        }

        return response.json();
      })
      .then(async data => {
        console.log(data.products)
        setProductList(data.products);
        
      })
      .catch(async error => {
        Toast.show(JSON.stringify(error), Toast.SHORT);
      });
  };

  useEffect(() => {
    MyProducts();
    CategoryList();
    const willFocusSubscription = navigation.addListener('focus', () => {
      MyProducts();
      CategoryList();
    });
  //   const fetchData = async () => {
  //     const user_details = await AsyncStorage.getItem('userDetails');
  //     setUser_id(JSON.parse(user_details)?.id);
  //   };
  //   fetchData();
  //   return willFocusSubscription;
  // }, []);
  const fetchData = async () => {
    const user_details= await AsyncStorage.getItem('userDetails')
    setUser_id(JSON.parse(user_details)?.id)
    const role = await AsyncStorage.getItem('userRole');
    if (role !== null) {
      setUserRole(role);
    }
  }
  fetchData();
  return willFocusSubscription;
}, []);
  const CategoryList = async () => {
    const token = await AsyncStorage.getItem('token');
    await ListofCategoryAPI(token)
      .then(response => {
        if (!response.ok) {
          throw new Error('error');
        }

        return response.json();
      })
      .then(async data => {
        setCategory(data.taxonomies);
      })
      .catch(async error => {
        Toast.show('Error', Toast.SHORT);
      });
  };
  const handleDelete = async id => {
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append('product_id', id);
    await DeleteProductAPI(token, formData)
      .then(response => {
        console.log('response', response);
        if (!response.ok) {
          if (response.status == 404) {
            throw new Error('Product not found.');
          }
          throw new Error('error');
        }

        return response.json();
      })
      .then(async data => {
        MyProducts();
      })
      .catch(async error => {
        Toast.show(JSON.stringify(error), Toast.SHORT);
      });
  };

  return (
    <View style={style.containerMain}>
      <Header
        menuIcon
        isAdd 
        handleAdd={() => navigation.navigate('AddProducts')}
        title="My Products"
        navigation={navigation}
      />
      <ScrollView>
        {productlist.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('ProductDetails', item.id)}
          >
            <View style={style.container}>
              <View style={{width: scaling.widthScale(260)}}>
                <Text style={style.text}>
                  <Text style={{fontWeight: 'bold'}}>Product Name:</Text>
                  {item.product_name}
                </Text>
                <Text style={style.text}>
                  <Text style={{fontWeight: 'bold'}}>Description:</Text>
                  {item.description}
                </Text>
                <Text style={style.text}>
              <Text style={{fontWeight: 'bold'}}>category:</Text>
              {category.filter(cat=> cat.id==item.taxonomy_id)[0]?.label}

            </Text>
                {/* <Text style={style.text}>
              <Text style={{fontWeight: 'bold'}}>Photo:</Text>
            </Text>
            <Text style={style.text}>
              <Text style={{fontWeight: 'bold'}}>Video URL:</Text>
            </Text> */}
              </View>

              <View>
                <Icon
                  name="trash-2"
                  type="feather"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
              {/* <View style={style.editicon}>
                <Icon
                  name="edit"
                  type="feather"
                  onPress={() => navigation.navigate("AddProducts",item.id)}
                />
              </View> */}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    margin: 10,
  },

  container: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    borderWidth: 1,
  },
  text: {
    fontWeight: '500',
    color: colors.black,
    marginBottom: 4,
  },
  editicon:
  {
    marginTop:30,
  },
  label: {
    width: 120,
    height: 120,
    marginLeft: 20,
    marginBottom: 20,
    backgroundColor: '#dcdcdc',
    borderWidth: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    borderStyle: 'dashed',
    alignItems: 'center',
  },

  isAdd: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: 'black',
  },
});
