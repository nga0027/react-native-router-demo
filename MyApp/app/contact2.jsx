import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Link } from 'expo-router';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const ContactScreen = () => {
    return (
        <View style={styles.container}>
            <Fontisto style={styles.headerImage} name="coffeescript" size={250} color="black" />
            <View style={styles.textContainer}>
                <ThemedView style={styles.section}>
                    <ThemedText type='title'>Coffee Shop</ThemedText>
                </ThemedView>
        
                <ThemedView style={styles.section}>
                    <ThemedText type='defaultSemiBold'>
                        Address
                    </ThemedText>
                    <ThemedText>
                        124 Honking Street, Hank City, 123438
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.section}>
                    <ThemedText type='defaultSemiBold'>
                        Phone
                    </ThemedText>
                    <Link href='tel:88888888' style={styles.link}>88-888-888</Link>
                </ThemedView>

                <ThemedView style={styles.section}>
                    <ThemedText type='defaultSemiBold'>
                        Text
                    </ThemedText>
                    <Link href='sms:99999999' style={styles.link}>99-999-999</Link>
                </ThemedView>

                <ThemedView style={styles.section}>
                    <ThemedText type='defaultSemiBold'>
                        Hours
                    </ThemedText>
                    <ThemedText>
                        8am - 8pm daily
                    </ThemedText>
                </ThemedView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },  
    headerImage: {
        // width: '100%',
        // paddingHorizontal: 'auto',
        backgroundColor: 'rgba(197, 197, 197, 1)'
    },
    textContainer: {
        paddingLeft: 10
    },
    section: {
        marginTop: 20
    },
    link: {
        textDecorationLine: 'underline'
    }
})

export default ContactScreen;