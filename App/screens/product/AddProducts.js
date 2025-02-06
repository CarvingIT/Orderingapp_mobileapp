import React, {useEffect, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../resource/colors';
import {
  ListofCategoryAPI,
  MyBuisnessessAPI,
  SaveProductAPI,
  UploadProductPhotoAPI,
  UploadProductVideoUrlAPI,
} from '../../api/api';
import Toast from 'react-native-simple-toast';
import Header from '../../components/header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import {Icon, Image} from '@rneui/base';
import scaling from '../../resource/normalize';
import DocumentPicker from 'react-native-document-picker';



export default function AddProducts({navigation}) {
 
  const [productname, setProductName] = useState('');
  const [productdescription, setProductDescription] = useState('');
  const [category, setCategory] = useState([]);
  const [categoryid, setCategoryId] = useState('');
  const[photo,setPhoto]=useState('');
  const[videourl,setVideoUrl] =useState('')
  const [sellerlist, setSellerList] = useState([]);
  const [sellerid, setSellerId] = useState('');

  const handleSubmit = async () => {
    Toast.show('Added sucessfully', Toast.SHORT);
    const token = await AsyncStorage.getItem('token');

    const formData = new FormData();
    formData.append('product_name', productname);
    formData.append('description', productdescription);
    formData.append('seller_id', sellerid);
    formData.append('category_id', categoryid);

    SaveProductAPI(token, formData)
      .then(response => {
                
        if (!response.ok) {
          // throw new Error('error');
        }
        return response.json();
      })
      .then(async data => {
        handleVideo(data.product_id);
        handleimage(data.product_id);
        Toast.show('Added sucessfully', Toast.SHORT);
        navigation.goBack();
      })
      .catch(async error => {
        console.log(JSON.stringify(error));
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
    CategoryList();
    getSeller();
    
  }, []);

  const handlePhoto = async () => {
    // Pick a single file
    try {
        console.log('pick image');
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setPhoto(res);
      console.log("resss",res);
     
    
    } catch (err) {
        console.log('error',err)
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const handleimage = async (productid) => {
    // Pick a single file
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append('image_path', photo);
    formData.append('product_id', productid);
    if(photo.length!=0){
    
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
        console.log(JSON.stringify(error));
      });
    }
  };
  const handleVideo = async (productid) => {
    // Pick a single file
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append('video_url', video);
    formData.append('product_id', productid);
    if(video.length!=0){
    
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
        console.log(JSON.stringify(error));
      });
    }
  };

  return (
    <View>
      <Header isBackIcon title="Add Product" navigation={navigation} />
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
           {photo!='' ? 
              <TouchableOpacity style={style.label}>
                <Image
                  style={style.cardImage}
                  source={{
                    uri: photo[0].uri,
                  }}
                />
              </TouchableOpacity>
            :
           
              <TouchableOpacity
                style={style.label}
                onPress={() => handlePhoto()}>
                <Icon
                  name="add"
                  type="ionicons"
                  color={colors.black}
                  size={scaling.normalize(25)}
                />
              </TouchableOpacity>}
          </View>
          <Text style={style.label}> Video URL:</Text>
          <TextInput
            style={style.input}
            value={videourl}
            onChangeText={text => setVideoUrl(text)}
            placeholder="Enter the Video URL"
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
              console.log('category id', item);
              setCategoryId(item.id);
            }}
          />

          <Button title="Submit" onPress={() => handleSubmit()} />
        </View>
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
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    color: colors.black,
  },
});
