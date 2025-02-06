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
  Modal,
} from 'react-native';
import colors from '../../resource/colors';
import Header from '../../components/header/Header';
import {ProductDetailsAPI} from '../../api/api';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageDisplay from './ImageDisplay';

export default function CategoryProductDetails({navigation, route}) {
  const [productname, setProductName] = useState('');
  const [productdescription, setProductDescription] = useState('');
  const [photo, setPhoto] = useState([]);
  const [videourl, setVideoUrl] = useState([]);
  const [sellerbuisnessname, setSellerBuisnessName] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');
  const [selleremail, setSellerEmail] = useState('');
  const [sellerphone, setSellerPhone] = useState('');
  const [sellerdescription, setSellerDescription] = useState('');
  const [categoryname, setCategoryName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image for zoom
  const[product_id,setProduct_id]=useState();

  const handlePress = url => {
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `https://${url}`;
    }
    Linking.openURL(formattedUrl).catch(err =>
      console.error("Couldn't load page", err),
    );
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
      .then(data => {
        setProductName(data.product.product_name);
        setProductDescription(data.product.description);
        setPhoto(data.product_photos);
        setVideoUrl(data.product_videos);
        setSellerBuisnessName(data.sellers.business_name);
        setSellerAddress(data.sellers.address);
        setSellerEmail(data.sellers.business_email);
        setSellerPhone(data.sellers.business_phone);
        setSellerDescription(data.sellers.description);
        setCategoryName(data.taxonomies.label);
        setProduct_id(data.product.id);
      })
      .catch(error => {
        Toast.show('Error', Toast.SHORT);
        console.log(JSON.stringify(error));
      });
  };

  useEffect(() => {
    GetProductList();
  }, []);

  const handleRedirect = (id) => {
    Linking.openURL(
      `https://orderingapp.carvingit.com/product-query?prod_id=${id}`,
    );
  };

  // Function to open image in modal
  const openImageModal = imageUrl => {
    setSelectedImage(imageUrl);
  };

  // Function to close modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <View style={{flex: 1}}>
      <Header isBackIcon title="Product Details" navigation={navigation} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={style.scrollcontainer}>
        <View style={style.form}>
          <Text style={style.label}>Product Name</Text>
          <Text style={style.text}>{productname}</Text>

          <Text style={style.label}>Description</Text>
          <Text style={style.text}>{productdescription}</Text>

          <Text style={style.label}>Product Photo</Text>
          <View style={style.box}>
            {photo.map(item => (
              <ImageDisplay
                key={item.id}
                image_id={item.id}
                product_id={item.product_id}
                onImagePress={openImageModal} // Pass function to open modal
              />
            ))}
          </View>

          <Text style={style.label}>Video URL:</Text>
          {videourl.map(item => (
            <Text
              key={item.video_url}
              style={style.videoLink}
              onPress={() => handlePress(item.video_url)}>
              {item.video_url}
            </Text>
          ))}

          <Text style={style.sellerTitle}>Seller:</Text>
          <Text style={style.label1}>Business Name</Text>
          <Text style={style.text}>{sellerbuisnessname}</Text>

          <Text style={style.label1}>Address</Text>
          <Text style={style.text}>{sellerAddress}</Text>

          <Text style={style.label1}>Description</Text>
          <Text style={style.text}>{sellerdescription}</Text>

          <Text style={style.label1}>Business Email</Text>
          <Text style={style.text}>{selleremail}</Text>

          <Text style={style.label1}>Business Phone</Text>
          <Text style={style.text}>{sellerphone}</Text>

          <View style={{flexDirection: 'row-reverse'}}>
            <Button  onPress={() => handleRedirect(product_id)}>Have Queries?</Button>
          </View>
        </View>
      </ScrollView>

      {/* Modal for Zoomed Image */}
      <Modal visible={!!selectedImage} transparent={true} animationType="fade">
        <View style={style.modalContainer}>
          <TouchableOpacity style={style.closeButton} onPress={closeImageModal}>
            <Text style={style.closeText}>✕</Text>
          </TouchableOpacity>
          <Image
            source={{uri: selectedImage}}
            style={style.fullImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  form: {
    padding: 20,
    color: colors.black,
  },
  scrollcontainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  box: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    margin: 10,
    fontWeight: 'bold',
    color: colors.black,
    textDecorationLine: 'underline',
  },
  label1: {
    fontSize: 15,
    marginBottom: 3,
    fontWeight: 'bold',
    color: colors.black,
    marginStart:18,
    margin: 10,
  },
  text: {
    marginStart: 26,
    color: colors.black,
  },
  videoLink: {
    marginStart: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom:4,
  },
  sellerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginStart: 11,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
