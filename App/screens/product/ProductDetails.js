import {Button, Card, Text} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../resource/colors';
import Header from '../../components/header/Header';
import {
  GetProductImage,
  ListofCategoryAPI,
  LoadProductImageAPI,
  MyBuisnessessAPI,
  ProductDetailsAPI,
  SaveProductAPI,
  UploadProductPhotoAPI,
  UploadProductVideoUrlAPI,
} from '../../api/api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from '@rneui/themed';
import scaling from '../../resource/normalize';
import {Dropdown} from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker';
import ImageDisplay from './ImageDisplay';

export default function ProductDetails({navigation, route}) {
  const [productname, setProductName] = useState('');
  const [productdescription, setProductDescription] = useState('');
  const [category, setCategory] = useState([]);
  const [categoryid, setCategoryId] = useState('');
  const [photo, setPhoto] = useState([]);
  const [addPhoto, setAddPhoto] = useState('');
  const [videoUrlList, setVideoUrlList] = useState([]);
  const [sellerlist, setSellerList] = useState([]);
  const [sellerid, setSellerId] = useState('');
  const [videourl, setVideoUrl] = useState('');

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token');

    const formData = new FormData();
    formData.append('product_name', productname);
    formData.append('description', productdescription);
    formData.append('seller_id', sellerid.id);
    formData.append('category_id', categoryid);
    formData.append('product_id', route.params);

    SaveProductAPI(token, formData)
      .then(response => {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      })
      .then(async data => {
        handleVideo(data.product_id);
        handleimage(data.product_id);
        Toast.show('Updated sucessfully', Toast.SHORT);
        navigation.goBack();
      })
      .catch(async error => {
        console.log(JSON.stringify(error));
      });
  };
  const handlePhoto = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setAddPhoto(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const handleimage = async productid => {
    // Pick a single file

    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append('image_path', addPhoto[0]);
    formData.append('product_id', productid);

    UploadProductPhotoAPI(token, formData)
      .then(response => {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      })
      .then(async data => {
        Toast.show('Photo Uploaded Successfully!', Toast.SHORT);
      })
      .catch(async error => {
        Toast.show('Error', Toast.SHORT);
      });
  };

  const handleVideo = async productid => {
    // Pick a single file
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append('video_url', videourl);
    formData.append('product_id', productid);

    UploadProductVideoUrlAPI(token, formData)
      .then(response => {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      })
      .then(async data => {
        Toast.show('Video Uploaded Successfully!', Toast.SHORT);
      })
      .catch(async error => {
        Toast.show('Error', Toast.SHORT);
      });
  };
  const GetProductList = async () => {
    const token = await AsyncStorage.getItem('token');

    await ProductDetailsAPI(token, route.params)
      .then(response => {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      })
      .then(async data => {
        setProductName(data.product.product_name);
        setProductDescription(data.product.description);
        setPhoto(data.product_photos);
        setVideoUrlList(data.product_videos);
        setSellerId(data.sellers);
        setCategoryId(data.product.taxonomy_id);
      })
      .catch(async error => {
        // Toast.show('Error', Toast.SHORT);
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
        // Toast.show('Error', Toast.SHORT);
      });
  };
  const getSeller = async () => {
    const token = await AsyncStorage.getItem('token');

    await MyBuisnessessAPI(token)
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
        setSellerList(data.sellers);
      })
      .catch(async error => {
        Toast.show(JSON.stringify(error), Toast.SHORT);
      });
  };
  useEffect(() => {
    GetProductList();
    CategoryList();
    getSeller();
  }, []);

  

  return (
    <View>
      <Header isBackIcon title="Edit Product" navigation={navigation} />
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.form}>
          <Text style={style.label}>Product Name:</Text>
          <TextInput
            style={style.input}
            value={productname}
            onChangeText={text => setProductName(text)}
            placeholder="Enter the Product Name"
            placeholderTextColor={colors.black}
          />
          <Text style={style.label}> Product Photo:</Text>
          <View style={style.box}>
            {photo.map(item => (
              <ImageDisplay image_id={item.id} product_id={item.product_id} />
            ))}
            {addPhoto && (
              <Image
                source={{uri: addPhoto[0]?.uri}}
                style={style.cardImage}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity style={style.label} onPress={() => handlePhoto()}>
              <Icon
                name="add"
                type="ionicons"
                color={colors.black}
                size={scaling.normalize(25)}
              />
            </TouchableOpacity>
          </View>
          <Text style={style.label}> Video URL:</Text>
          {videoUrlList.map(item => (
            <Text style={{margin: 6}}>{item.video_url}</Text>
          ))}
          <TextInput
            style={style.input}
            value={videourl}
            onChangeText={text => setVideoUrl(text)}
            placeholder="Enter the URL"
            placeholderTextColor={colors.black}
          />

          <Text style={style.label}> Description:</Text>
          <TextInput
            style={style.input}
            value={productdescription}
            onChangeText={text => setProductDescription(text)}
            placeholder="Enter the Product Description"
            placeholderTextColor={colors.black}
          />
          <Text style={style.label}>Seller:</Text>
          <Dropdown
            style={style.input}
            selectedTextStyle={{
              textTransform: 'capitalize',
              color: colors.black,
            }}
            itemTextStyle={{textTransform: 'capitalize', color: colors.black}}
            data={sellerlist}
            maxHeight={300}
            labelField="business_name"
            valueField="id"
            placeholder="Select Seller"
            value={sellerid}
            onChange={item => {
              setSellerId(item.id);
            }}
          />

          <Text style={style.label}>Categories:</Text>
          <Dropdown
            style={style.input}
            selectedTextStyle={{
              textTransform: 'capitalize',
              color: colors.black,
            }}
            itemTextStyle={{textTransform: 'capitalize', color: colors.black}}
            data={category}
            maxHeight={300}
            labelField="label"
            valueField="id"
            placeholder="Select Categories"
            value={categoryid}
            onChange={item => {
              setCategoryId(item.id);
            }}
          />

          <Button
            title="Submit"
            onPress={() => {
              handleSubmit();
              handleVideo(route.params);
              handleimage(route.params);
            }}
          />
        </View>
        <View style={{height:scaling.heightScale(30)}}/>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  form: {
    padding: 20,

    color: colors.black,
  },
  cardImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  label1: {},
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#333',
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    color: colors.black,
  },
  box: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    alignItems:'center',
    
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    color: colors.black,
  },
});
