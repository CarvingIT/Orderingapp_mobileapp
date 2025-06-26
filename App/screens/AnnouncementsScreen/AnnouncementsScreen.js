// This file is part of the React Native application for managing announcements.
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AnnouncementCard from '../../components/AnnouncementCard';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ListofAnnouncementsAPI } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnnouncementsScreen = () => {
    const navigation = useNavigation();
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [readAnnouncementIds, setReadAnnouncementIds] = useState([]);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {

            const userToken = await AsyncStorage.getItem('userToken');
            if (!userToken) {
                setError("Please log in to view announcements.");
                setLoading(false);
                return;
            }

            const apiData = await ListofAnnouncementsAPI(userToken);
            const sortedData = apiData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setAnnouncements(sortedData);

            const storedReadIds = await AsyncStorage.getItem('readAnnouncementIds');
            if (storedReadIds) {
                setReadAnnouncementIds(JSON.parse(storedReadIds));
            } else {
                setReadAnnouncementIds([]);
            }

        } catch (err) {
            setError('Failed to load announcements. Please try again later.');
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

    const handleCardPress = async (announcement) => {
        try {
            if (!readAnnouncementIds.includes(announcement.id)) {
                const newReadIds = [...readAnnouncementIds, announcement.id];
                setReadAnnouncementIds(newReadIds);
                await AsyncStorage.setItem('readAnnouncementIds', JSON.stringify(newReadIds));
            }
        } catch (err) {
            console.error("Failed to save read status locally:", err);
        }
        navigation.navigate('AnnouncementDetail', { announcement: announcement });
    };

    const renderItem = ({ item }) => (
        <AnnouncementCard
            announcement={item}
            isRead={readAnnouncementIds.includes(item.id)}
            onPress={() => handleCardPress(item)}
        />
    );

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={styles.statusText}>Loading Announcements...</Text>
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

    return (
        <View style={styles.container}>
            <FlatList
                data={announcements}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                extraData={readAnnouncementIds}
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

export default AnnouncementsScreen;

