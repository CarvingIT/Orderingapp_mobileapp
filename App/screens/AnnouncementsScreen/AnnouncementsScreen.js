// This file is part of the React Native application for managing announcements.
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AnnouncementCard from '../../components/AnnouncementCard'; // Adjust path based on actual structure

// Dummy data for initial UI testing (will be replaced by actual API data)
const sampleAnnouncements = [
  { id: '1', title: 'Important System Maintenance', content: 'Our services will be undergoing scheduled maintenance on June 10th from 2 AM to 4 AM IST. Some services may be temporarily unavailable during this period. We apologize for any inconvenience this may cause.', date: '2025-06-05T10:00:00Z', isRead: false },
  { id: '2', title: 'New Feature: Dark Mode Available!', content: 'We\'re excited to announce that Dark Mode is now available! Go to Settings to enable it and give your eyes a break. Enjoy the new look!', date: '2025-06-03T15:30:00Z', isRead: true },
  { id: '3', title: 'Privacy Policy Update', content: 'Our privacy policy has been updated to reflect recent changes in data protection regulations. Please review the updated policy on our website to understand how your data is handled.', date: '2025-05-28T08:45:00Z', isRead: false },
  { id: '4', title: 'Weekend Sale Extravaganza!', content: 'Don\'t miss out on our special weekend sale! Get up to 50% off on selected items. Offer valid from Friday to Sunday. Shop now!', date: '2025-05-25T12:00:00Z', isRead: true },
  { id: '5', title: 'New Payment Options Added', content: 'We\'ve integrated new secure payment gateways for a smoother checkout experience. You can now pay with more options!', date: '2025-05-20T11:00:00Z', isRead: false },
  { id: '6', title: 'Security Advisory', content: 'We advise all users to update their passwords regularly for enhanced security. Never share your login credentials.', date: '2025-05-15T09:00:00Z', isRead: true },
];

const AnnouncementsScreen = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from an API
  useEffect(() => {
    setTimeout(() => {
      setAnnouncements(sampleAnnouncements); // Replace with actual API call later
      setLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  const handleCardPress = (announcement) => {
    // Mark as read in local state. In a real app, you'd send this to the API.
    setAnnouncements(prevAnnouncements =>
        prevAnnouncements.map(ann =>
            ann.id === announcement.id ? { ...ann, isRead: true } : ann
        )
    );
    navigation.navigate('AnnouncementDetail', { announcement }); // Navigate to detail screen
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Announcements...</Text>
      </View>
    );
  }

  if (announcements.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No announcements available at the moment.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnnouncementCard announcement={item} onPress={handleCardPress} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingVertical: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnnouncementsScreen;