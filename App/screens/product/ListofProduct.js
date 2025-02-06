import {Card, Text} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../resource/colors';
import Toast from 'react-native-simple-toast';
import Header from '../../components/header/Header';
import {
  ListofCategoryAPI,
  ListofCategoryWiseProductsAPI,
  ListofProductAPI,
} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListofProduct({navigation, route}) {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [categorywiseproduct, setCategorywiseProduct] = useState([]);
  const ProductList = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('Token', token);
    console.log(route.params);
    await ListofProductAPI(token, route.params.id)
      .then(response => {
        console.log('response of list of product:', response);
        if (!response.ok) {
          if (response.status == 404) {
            throw new Error('Product not found.');
          }
          throw new Error('error');
        }

        return response.json();
      })
      .then(async data => {
        console.log(data);
        setProduct(data.products);
      })
      .catch(async error => {
        Toast.show(JSON.stringify(error), Toast.SHORT);
        console.log('Error on get product list:', error);
      });
  };
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
  const CategoryListWiseProduct = async () => {
    const token = await AsyncStorage.getItem('token');
    await ListofCategoryWiseProductsAPI(token)
      .then(response => {
        if (!response.ok) {
          throw new Error('error');
        }

        return response.json();
      })
      .then(async data => {
        setCategorywiseProduct(data.products.category_name);
      })
      .catch(async error => {
        Toast.show('Error', Toast.SHORT);
      });
  };
  useEffect(() => {
    ProductList();
    CategoryList();
    CategoryListWiseProduct();
  }, []);

  return (
    <View style={style.containerMain}>
      <Header
        isBackIcon
        isNotification
        title="Products"
        navigation={navigation}
      />
      <ScrollView>
      <Text style={style.category}>{route.params.label}
               
              </Text>
        {product.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('CategoryProductDetails', item.id)}>
             
              <View style={style.container}>
              <Text style={style.text}>
                <Text style={{fontWeight: 'bold',alignContent:'center'}}>Product Name:</Text>
                {item.product_name}
              </Text>
              <Text style={style.text}>
                <Text style={{fontWeight: 'bold'}}>Description:</Text>
                {item.description}
              </Text>
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
  },
  category:{
  fontStyle:'normal',
  fontWeight:'bold',
alignContent:'center',
  fontSize:20,
  alignItems:'center',
  marginBottom:5,
  marginTop:5,
  alignSelf:'center',
  },
  container: {
    margin: 5,
    borderWidth: 1,
    padding: 5,
  },
  text: {
    fontSize: 15,
    color: colors.black,
    marginBottom: 4,
  },
  card: {
    width: 'auto',
  },
});
