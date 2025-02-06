import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LoadProductImageAPI } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImageDisplay = ({ image_id, product_id, onImagePress }) => {
  const [imageUri, setImageUri] = useState(null);

  // Fetch and display image from API
  const fetchAndDisplayImage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await LoadProductImageAPI(product_id, image_id, token);
      const blob = await response.blob();
  
      // Convert blob to base64
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // Resolve base64 string
        reader.onerror = (error) => reject(error); // Reject on error
        reader.readAsDataURL(blob);
      });
  
      setImageUri(base64Data);
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  useEffect(() => {
    fetchAndDisplayImage();
  }, []);

  return (
    <View style={styles.container}>
      {imageUri && (
        <TouchableOpacity onPress={() => onImagePress(imageUri)}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  image: {
    width: 140,
    height: 140,
  },
});

export default ImageDisplay;


// import React, { useEffect, useState } from 'react';
// import { Image, View, StyleSheet } from 'react-native';
// import { LoadProductImageAPI } from '../../api/api';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ImageDisplay = ({ image_id, product_id }) => {
//   const [imageUri, setImageUri] = useState(null);

//   // Example API call and image display
//   const fetchAndDisplayImage = async () => {
//     try {
//         const token = await AsyncStorage.getItem('token');
//         const response = await LoadProductImageAPI(product_id, image_id, token);
//         const blob = await response.blob();
    
//         // Convert blob to base64 using a Promise
//         const base64Data = await new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onload = () => resolve(reader.result); // Resolve base64 string
//           reader.onerror = (error) => reject(error); // Reject on error
//           reader.readAsDataURL(blob);
//         });
    
//         setImageUri(base64Data)
//     } catch (error) {
//       console.error('API call failed:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAndDisplayImage();
//   },[])

//   return (
//     <View style={styles.container}>
//       {imageUri && (
//         <Image
//           source={{ uri: imageUri }}
//           style={styles.image}
//           resizeMode="contain"
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
    
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding:5,
        
//   },
//   image: {
//     width: 140,
//     height: 140,
//     // resizeMode: 'cover',
    
//   },
// });

// export default ImageDisplay;