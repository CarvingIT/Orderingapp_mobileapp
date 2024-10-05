import {Card, Text} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {Image, Linking, ScrollView, StyleSheet, View} from 'react-native';
import colors from '../../resource/colors';
import Header from '../../components/header/Header';
import {GetProductImage, ProductDetailsAPI} from '../../api/api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from '@rneui/themed';

export default function ProductDetails({navigation, route}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [productphoto, setProductPhoto] = useState([]);
  const [productvideo, setProductVideo] = useState([]);
  const [seller, setSeller] = useState('');

  const GetProductList = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    await ProductDetailsAPI(token, route.params)
      .then(response => {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      })
      .then(async data => {
        setName(data.product.product_name);
        setDescription(data.product.description);
        setProductPhoto(data.product_photos);
        setProductVideo(data.product_videos);
        setSeller(data.sellers);
      })
      .catch(async error => {
        Toast.show('Error', Toast.SHORT);
        console.log(JSON.stringify(error));
      });
  };
  useEffect(() => {
    GetProductList();
  }, []);

  const getVideoIdFromUrl = url => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  return (
    <View style={style.containerMain}>
      <Header
        isBackIcon
        isNotification
        title="Product Details"
        navigation={navigation}
      />

      <View style={style.container}>
        <ScrollView>
          <Text style={style.textheading}>{name}</Text>
          <Text style={style.text}>{description}</Text>
          {console.log('productphoto', productphoto)}
          {productphoto.length != 0 ? <Text style={style.textHead}></Text> : ''}
          <View style={style.container}>
            {productphoto.map(item => (
              <Image
                source={{
                  uri:
                    'http://orderingapp.carvingit.com/api/product/' +
                    route.params +
                    '/loadimage/' +
                    item.id,
                }}
                style={style.logo}
              />
            ))}
          </View>
          {productvideo.length != 0 ? <Text style={style.textHead}></Text> : ''}
          <View>
            {console.log('productvideo', productvideo)}
            {productvideo.map(item => (
              <Text onPress={() => Linking.openURL(item.video_url)}>
                {item.video_url}
              </Text>
            ))}
          </View>
          <Text style={style.textHead}>Seller Details:</Text>

          <View>
            <Text style={style.heading}>
              Business Name:<Text style={style.gaps}>{' '}{seller.business_name}</Text>
            </Text>
            <Text style={style.heading}>
             
              Address:<Text>{' '}{seller.address}</Text>
            </Text>
            <Text style={style.heading}>
              Description:<Text>{' '}{seller.description}</Text>
            </Text>
            <Text style={style.heading}>Business Email:
                   <Text >{' '}{seller.business_email}</Text>
            </Text>
            <View style={style.phonenumber}>
              <Icon style={style.icon} name="call" type="ionicons" />
              <Text>{' '}{seller.business_phone}</Text>
            </View>
          </View>

          {/* <Text>{seller}</Text> */}
        </ScrollView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  containerMain: {
    flex: 1,
    margin: 10,
   
    },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    display:'flex',

  },
  text: {
    fontWeight: '500',
    color: colors.black,
    marginBottom: 10,
    marginStart:5,
    
  },
  textHead: {
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 15,
    marginTop: 15,
    fontSize:18,
  },
  textheading: {
    fontWeight: '800',
    color: colors.black,
    marginBottom: 10,
    fontSize: 25,
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  phonenumber:{
   display:'flex',
   alignItems:'center',
   flexDirection:'row',
   marginStart:7,

  },
  heading: {
    fontWeight: 'bold',
    color: colors.black,
    fontFamily: 'arial',
    flexWrap: 'wrap',
    marginStart: 7,
    marginBottom: 10,
  },
  gaps:{
 paddingLeft:5,

  }
});
