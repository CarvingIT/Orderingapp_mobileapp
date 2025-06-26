// AnnouncementCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AnnouncementCard = ({ announcement, onPress, isRead }) => {
    
    const {
        title = '',
        announcement: content = '',
        created_at = '',
    } = announcement || {}; 

    
    const formattedDate = created_at ? new Date(created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) : 'No Date Available';

    return (
        <TouchableOpacity
            onPress={() => onPress(announcement)}
            style={[styles.card, isRead ? styles.readCard : styles.unreadCard]}
        >
            <View style={styles.header}>
                <Text style={styles.title}>{String(title)}</Text>
                {!isRead && <View style={styles.unreadBadge}/>}
            </View>
            <Text style={styles.contentSnippet} numberOfLines={2}>{String(content)}</Text>
            <Text style={styles.date}>{String(formattedDate)}</Text>
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
        elevation: 3, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    readCard: {
        // Style for a card that has been read (e.g., slightly transparent)
        opacity: 0.7,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    unreadCard: {
        // Style for an unread card
        borderColor: '#007bff',
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
        flexShrink: 1,
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
});

export default AnnouncementCard;
