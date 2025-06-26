// AnnouncementDetailScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const AnnouncementDetailScreen = ({ route }) => {
  const { announcement = {} } = route.params || {};

  const {
    title = 'No Title',
    announcement: content = 'No Content Available',
    created_at = '',
  } = announcement;



  const formattedDate = created_at ? new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'Date not available';

  const formattedTime = created_at ? new Date(created_at).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }) : '';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>
        {`Published: ${formattedDate}${formattedTime ? ` at ${formattedTime}` : ''}`}
      </Text>
      <View style={styles.divider}/>
      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});

export default AnnouncementDetailScreen;
