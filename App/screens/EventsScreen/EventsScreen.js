// This file is for displaying the list of upcoming events.
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import EventCard from '../../components/EventCard'; 
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ListofEventsAPI } from '../../api/api'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventsScreen = () => {
    const navigation = useNavigation();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [readEventIds, setReadEventIds] = useState([]);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (!userToken) {
                setError("Please log in to view events.");
                setLoading(false);
                return;
            }

            const apiData = await ListofEventsAPI(userToken); 
            console.log('API Response for Events:', JSON.stringify(apiData, null, 2));
            setEvents(apiData);

            const storedReadIds = await AsyncStorage.getItem('readEventIds'); 
            if (storedReadIds) {
                setReadEventIds(JSON.parse(storedReadIds));
            } else {
                setReadEventIds([]);
            }

        } catch (err) {
            setError('Failed to load events. Please try again later.');
            console.error('API or Storage Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const handleCardPress = async (event) => {
        try {
            // Logic for marking events as read locally
            if (!readEventIds.includes(event.id)) {
                const newReadIds = [...readEventIds, event.id];
                setReadEventIds(newReadIds);
                await AsyncStorage.setItem('readEventIds', JSON.stringify(newReadIds));
            }
        } catch (err) {
            console.error("Failed to save read status locally:", err);
        }
        // Navigate to the EventDetail screen
        navigation.navigate('EventDetail', { event: event }); 
    };

    const renderItem = ({ item }) => (
        <EventCard
            event={item}
            isRead={readEventIds.includes(item.id)}
            onPress={() => handleCardPress(item)}
        />
    );

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={styles.statusText}>Loading Events...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }
    
    // Handle case where there are no events
    if (events.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.statusText}>No upcoming events at the moment.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                extraData={readEventIds}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    listContent: {
        paddingVertical: 10,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    statusText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});

export default EventsScreen;
