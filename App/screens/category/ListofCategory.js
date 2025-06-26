import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text,TouchableOpacity, ScrollView} from 'react-native';
import Header from "../../components/header/Header";
import { ListofCategoriesAPI } from "../../api/api";
import colors from "../../resource/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-simple-toast';


export default function ListofCategory({navigation}) {
    const [categoryData,setCategoryData] =useState([]);

    const CategoryList = async () => {
        const token = await AsyncStorage.getItem('token');
    
        await ListofCategoriesAPI(token)
          .then(response => {
            console.log('Helloo',response);
           
            if (!response.ok) {
              throw new Error('error');
            }
    
            return response.json();
          })
          .then(async data => {
            setCategoryData(data.taxonomies)
          })
          .catch(async error => {
            Toast.show('Error', Toast.SHORT);
            console.log(JSON.stringify(error));
          });
      };
    
      useEffect(() => {
        CategoryList();
      }, []);
      
  
    return (
      <View style={style.containerMain}>
          <Header menuIcon isNotification title="Categories"  navigation={navigation} />
          <ScrollView>
          {categoryData.map(item => <TouchableOpacity style={style.card} onPress={() => navigation.navigate('ListOfProducts',item)}>
       
        <View style={style.container}>
       
            <Text style={style.text} >{item.label} </Text>
      
        </View>
        </TouchableOpacity>)}
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
      
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      },
      text: {
        fontWeight: '500',
        color:colors.black,
      },
      card: {
        backgroundColor: '#FFF',
        marginBottom: 10,
        marginLeft: '2%',
        width: '96%',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
          width: 3,
          height: 3,
        },
    },

  });