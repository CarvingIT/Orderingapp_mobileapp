/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
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
            onPress={() => navigation.openDrawer()}
            style={styles.backTouchable}>
            <Icon
              onPress={() => navigation.openDrawer()}
              name="menu"
              type="entypo"
              color={colors.black}
              size={scaling.normalize(25)}
            />
          </TouchableOpacity>
        )}
        {isBackIcon && (
          <TouchableOpacity
            onPress={() => navigation.goBack(null)}
            style={styles.backTouchable}>
            <Icon
              onPress={() => navigation.goBack(null)}
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
            onPress={() => handleAdd()}>
            {/* <Icon
            name="notifications-none"
            type="materialIcons"
            color={colors.black}
            size={scaling.normalize(25)}
          /> */}
            <Text>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default Header;
