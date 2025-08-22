import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

function NameScreen() {
    const theme = useTheme();
    return (

        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <ScrollView>
                <Text style={{ color: theme.colors.onSurface }}>Blank</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    content: {
        padding: 10,
    },
    row: {
        flexDirection: 'row', // Ensure columns are in a row
        justifyContent: 'center', // Space out columns evenly
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        margin: 5
    },
    text: {
        textAlign: 'center',
    },
    icon: {
        marginBottom: 5, // Space between icon and text
        textAlign: 'center',
    },
});