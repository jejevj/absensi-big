import { Platform, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Badge, Button, Card, Chip, DataTable, MD2Colors, MD3Colors, Text, TextInput, useTheme } from "react-native-paper";
import * as React from 'react';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from '@react-native-picker/picker';

export default function IzinScreen() {
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

    const LeftContent = props => <Avatar.Icon {...props} icon="file-document" />;
    const LeftContent2 = props => <Avatar.Icon {...props} icon="calendar" />;
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
                    <Card.Title title="Pengajuan Izin / Cuti" subtitle="Silahkan Isi Form Dibawah Untuk Izin / Cuti" left={LeftContent} />
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
                            <Text>Tanggal Izin: {formatDate(startDate)}</Text>
                            <Button style={{ marginBottom: 10, marginTop: 10 }} icon="calendar" mode="outlined" onPress={() => showDatePicker(true)}>
                                Pilih Tanggal
                            </Button>
                            <Text>Status Izin: </Text>
                            <Picker style={{ marginBottom: 10 }}
                                selectedValue={selectedReason}
                                onValueChange={(itemValue, itemIndex) =>
                                    selectedReason(itemValue)
                                }>
                                <Picker.Item label="Izin / Ganti Jaga" value="1" />
                                <Picker.Item label="Izin" value="2" />
                                <Picker.Item label="Sakit" value="3" />
                                <Picker.Item label="Cuti" value="4" />
                            </Picker>
                            <Text>Keterangan: </Text>
                            <TextInput
                                style={{ marginTop: 10 }}
                                // label="Keterangan"
                                value={text}
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={text => setText(text)}
                            />

                            <Button style={{ marginTop: 10 }} icon="send" mode="contained" onPress={() => console.log("ok")}>
                                Ajukan Izin
                            </Button>
                        </Card.Content>
                    </Card.Content>




                </Card>


                {/* CARD FILTER DATA */}
                <Card style={{ marginBottom: 20 }}>
                    <Card.Title title="Lihat Status Pengajuan" subtitle="Pilih Tanggal Pengajuan Izin / Cuti" left={LeftContent2} />
                    <Card.Content>
                        {datePicker && (
                            <RNDateTimePicker
                                value={isStartDate ? startDate : endDate}
                                mode={'date'}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is24Hour={true}
                                onChange={OnDateSelected2} // Handle the date change
                            />
                        )}

                        {/* Display selected dates below the buttons */}
                        <Card.Content>
                            <Text>Tanggal Izin: {formatDate(startDate)}</Text>
                            <Button style={{ marginBottom: 10, marginTop: 10 }} icon="calendar" mode="outlined" onPress={() => showDatePicker(true)}>
                                Pilih Tanggal
                            </Button>
                            <Button style={{ marginTop: 10 }} icon="magnify" mode="contained" onPress={() => console.log("ok")}>
                                Lihat Status Pengajuan
                            </Button>
                        </Card.Content>
                    </Card.Content>
                </Card>

                {/* LIST DATA UNTUK DI LOOP */}
                <Card style={{ marginBottom: 20 }}>
                    <Card.Title title="Pengajuan: #ID" subtitle="Alasan Izin: Ganti Jaga" left={LeftContent3} />
                    <Card.Content>
                        {/* Display selected dates below the buttons */}
                        <Badge style={{ marginBottom: -15 }}>Ditolak</Badge>
                        <Card.Content>
                            <Text>Tanggal Izin: {formatDate(endDate)}</Text>
                            <Text>Keterangan: Saya bertukar shift dengan karyawan A pada tanggal x, dikarenakan ada kepereluan berkas pribadi di Dukcapil.</Text>
                        </Card.Content>
                    </Card.Content>
                </Card>
                {/* LIST DATA UNTUK DI LOOP */}
                <Card style={{ marginBottom: 20 }}>
                    <Card.Title title="Pengajuan: #ID" subtitle="Alasan Izin: Sakit" left={LeftContent3} />
                    <Card.Content>
                        {/* Display selected dates below the buttons */}
                        <Badge style={{ marginBottom: -15, backgroundColor:theme.colors.primary }}>Diterima</Badge>
                        <Card.Content>
                            <Text>Tanggal Izin: {formatDate(endDate)}</Text>
                            <Text>Keterangan: Saya bertukar shift dengan karyawan A pada tanggal x, dikarenakan ada kepereluan berkas pribadi di Dukcapil.</Text>
                        </Card.Content>
                    </Card.Content>
                </Card>
                {/* LIST DATA UNTUK DI LOOP */}
                <Card style={{ marginBottom: 20 }}>
                    <Card.Title title="Pengajuan: #ID" subtitle="Alasan Izin: Sakit" left={LeftContent3} />
                    <Card.Content>
                        {/* Display selected dates below the buttons */}
                        <Badge style={{ marginBottom: -15, backgroundColor:MD2Colors.orange300 }}>Menunggu Approval</Badge>
                        <Card.Content>
                            <Text>Tanggal Izin: {formatDate(endDate)}</Text>
                            <Text>Keterangan: Saya bertukar shift dengan karyawan A pada tanggal x, dikarenakan ada kepereluan berkas pribadi di Dukcapil.</Text>
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
