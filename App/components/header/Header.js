import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './HeaderStyle';
import scaling from '../../resource/normalize';
import colors from '../../resource/colors';
import {Icon} from '@rneui/themed';

function Header({title, navigation, menuIcon, isAdd, isBackIcon, handleAdd}) {
  return (
    <View style={styles.view}>
      <View style={styles.headerSubView}>
        {menuIcon && (
          <TouchableOpacity
            onPress={() => {
              console.log('Menu icon TouchableOpacity pressed in Header.js!'); 
              navigation.openDrawer();
            }}
            style={styles.backTouchable}>
            <Icon
              name="menu"
              type="entypo"
              color={colors.black}
              size={scaling.normalize(25)}
            />
          </TouchableOpacity>
        )}
        {isBackIcon && (
          <TouchableOpacity
            onPress={() => {
              console.log('Back icon TouchableOpacity pressed in Header.js!'); 
              navigation.goBack(null);
            }}
            style={styles.backTouchable}>
            <Icon
              name="chevron-left"
              type="entypo"
              color={colors.black}
              size={scaling.normalize(25)}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.titleView}>
        <Text style={styles.HeaderTxt}>{title}</Text>
      </View>
      <View style={styles.headerSubView}>
        {isAdd && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              console.log('Add button TouchableOpacity pressed in Header.js!'); 
              handleAdd();
            }}>
            {/* <Icon
            name="notifications-none"
            type="materialIcons"
            color={colors.black}
            size={scaling.normalize(25)}
          /> */}
            <Text style={{color: 'black'}}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default Header;