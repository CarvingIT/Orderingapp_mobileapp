// EventDetailScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Icon } from '@rneui/base';

const EventDetailScreen = ({ route }) => {
  
  const { event = {} } = route.params || {};

  
  const {
    title = 'Untitled Event',
    description = 'No description available.',
    start_date = '',
    end_date = '',
    venue = 'No venue specified', 
  } = event;

  // Format the start date
  const formattedStartDate = start_date ? new Date(start_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'Date not available';

  // Format the end date
  const formattedEndDate = end_date ? new Date(end_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.detailsSection}>
        <View style={styles.detailItem}>
            <Icon name="calendar" type="feather" color="#444" size={20} />
            <Text style={styles.detailText}>
              {formattedStartDate}
              {formattedEndDate && formattedEndDate !== formattedStartDate ? ` to ${formattedEndDate}` : ''}
            </Text>
        </View>
        
        <View style={styles.detailItem}>
            <Icon name="location-pin" type="entypo" color="#444" size={20} />
            <Text style={styles.detailText}>{venue}</Text>
        </View>
      </View>

      <View style={styles.divider}/>
      
      <Text style={styles.contentHeader}>About this event:</Text>
      <Text style={styles.content}>{description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#222',
  },
  detailsSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flexShrink: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  contentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 26,
    color: '#444',
  },
});

export default EventDetailScreen;
