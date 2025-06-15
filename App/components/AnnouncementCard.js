// AnnouncementCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AnnouncementCard = ({ announcement, onPress }) => {
    const { title, content, date, isRead } = announcement;
    
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });


  return (
    
      <TouchableOpacity
      style={[styles.card, isRead ? styles.readCard : styles.unreadCard]}  
          onPress={() => onPress(announcement)}
      >
          <View style={styles.header}>
              
              <Text style={styles.title}>{String(title)}</Text>
              {!isRead && <View style={styles.unreadBadge} />}
          </View>
          <Text style={styles.contentSnippet} numberOfLines={2}>
            {String(content)}
          </Text>
          <Text style={styles.date}>{formattedDate}</Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 3, // Shadow for Android
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    readCard: {
        opacity: 0.7, // Slightly dim if read
    },
    unreadCard: {
        borderColor: '#007bff', // Highlight for unread announcements
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flexShrink: 1, // Allows text to wrap or shrink if badge is present
    },
    contentSnippet: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    date: {
        fontSize: 12,
        color: '#999',
        textAlign: 'right',
    },
    unreadBadge: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        marginLeft: 10,
    },
} );

export default AnnouncementCard;