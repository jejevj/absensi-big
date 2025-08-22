import { Platform, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Badge, Button, Card, Chip, DataTable, MD2Colors, MD3Colors, Text, TextInput, useTheme } from "react-native-paper";
import * as React from 'react';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from '@react-native-picker/picker';

export default function PatroliScreen() {
    const [datePicker, setDatePicker] = React.useState(false);  // For showing date picker
    const [isStartDate, setIsStartDate] = React.useState(true);  // To determine whether it's start or end date picker
    const [startDate, setStartDate] = React.useState(new Date());  // Store selected start date
    const [endDate, setEndDate] = React.useState(new Date());  // Store selected end date
    const [selectedReason, setSelectedReason] = React.useState();
    const [text, setText] = React.useState("");

    // Show Date Picker (Start or End Date)
    function showDatePicker(isStart) {
        setIsStartDate(isStart); // Determine whether we are picking start or end date
        setDatePicker(true); // Show the picker
    }

    // Handle Date Selection
    function OnDateSelected(event, selectedDate) {
        if (event.type === "set" && selectedDate) {
            if (isStartDate) {
                // setStartDate(selectedDate); // Set start date
                if (selectedDate >= startDate) {
                    setStartDate(selectedDate); // Set end date
                } else {
                    alert("Tanggal Izin Tidak Valid");
                }
            }
        }
        setDatePicker(false); // Close the picker after selection
    }
    function OnDateSelected2(event, selectedDate) {
        if (event.type === "set" && selectedDate) {
            if (isStartDate) {
                // setStartDate(selectedDate); // Set start date
                if (selectedDate >= startDate) {
                    setEndDate(selectedDate); // Set end date
                } else {
                    alert("Tanggal Izin Tidak Valid");
                }
            }
        }
        setDatePicker(false); // Close the picker after selection
    }

    const LeftContent = props => <Avatar.Icon {...props} icon="car-clock" />;
    const LeftContent2 = props => <Avatar.Icon {...props} icon="qrcode" />;
    const LeftContent3 = props => <Avatar.Image {...props} source={{ uri: "https://cdn-icons-png.flaticon.com/256/5600/5600583.png" }} />;
    const theme = useTheme();




    // Function to format date
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <ScrollView>
                <Card style={{ marginBottom: 20 }}>
                    <Card.Title title="Pilih Rentang Waktu" subtitle="Silahkan Pilih" left={LeftContent} />
                    <Card.Content>
                        {datePicker && (
                            <RNDateTimePicker
                                value={isStartDate ? startDate : endDate}
                                mode={'date'}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is24Hour={true}
                                onChange={OnDateSelected} // Handle the date change
                            />
                        )}

                        {/* Display selected dates below the buttons */}
                        <Card.Content>
                            <Text>Start Date: {formatDate(startDate)}</Text>
                            <Text>End Date: {formatDate(endDate)}</Text>
                        </Card.Content>
                    </Card.Content>
                    <Card.Actions >
                        <Button icon="calendar" mode="outlined" onPress={() => showDatePicker(true)}>
                            Tanggal Awal
                        </Button>
                        <Button icon="calendar" mode="outlined" onPress={() => showDatePicker(false)}>
                            Tanggal Selesai
                        </Button>
                    </Card.Actions>
                </Card>


                {/* LIST DATA UNTUK DI LOOP */}
                <Card style={{ marginBottom: 20 }}>
                    <Card.Title title="Patroli: QRCODE Code"  left={LeftContent2} />
                    <Card.Content>
                        {/* Display selected dates below the buttons */}
                        <Card.Content>
                            <Text>Tanggal: {formatDate(endDate)}</Text>
                            <Text>Lokasi QRIS: XXX.</Text>
                        </Card.Content>
                    </Card.Content>
                </Card>

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
