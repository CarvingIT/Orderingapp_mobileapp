// EventCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/base'; 

const EventCard = ({ event, onPress, isRead }) => {
    
    
    const {
        title = 'Untitled Event',
        description = 'No description available.',
        start_date = '', 
        venue = 'No venue specified', 
    } = event || {}; 

    const formattedDate = start_date ? new Date(start_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) : 'Date not available';

    return (
        <TouchableOpacity
            onPress={() => onPress(event)}
            style={[styles.card, isRead ? styles.readCard : styles.unreadCard]}
        >
            <View style={styles.header}>
                <Text style={styles.title}>{String(title)}</Text>
                {!isRead && <View style={styles.unreadBadge}/>}
            </View>
            
            <Text style={styles.descriptionSnippet} numberOfLines={2}>{String(description)}</Text>

            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <Icon name="location-pin" type="entypo" color="#555" size={16} />
                    <Text style={styles.detailText}>{venue}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Icon name="calendar" type="feather" color="#555" size={16} />
                    <Text style={styles.detailText}>{formattedDate}</Text>
                </View>
            </View>
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
        opacity: 0.7,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    unreadCard: {
        borderColor: '#007bff',
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flexShrink: 1,
    },
    descriptionSnippet: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    detailsContainer: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#555',
        marginLeft: 8,
    },
    unreadBadge: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        marginLeft: 10,
    },
});

export default EventCard;
