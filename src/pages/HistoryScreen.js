import { Platform, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Chip, DataTable, Text, useTheme } from "react-native-paper";
import * as React from 'react';
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function HistoryScreen() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [datePicker, setDatePicker] = React.useState(false);  // For showing date picker
    const [isStartDate, setIsStartDate] = React.useState(true);  // To determine whether it's start or end date picker
    const [startDate, setStartDate] = React.useState(new Date());  // Store selected start date
    const [endDate, setEndDate] = React.useState(new Date());  // Store selected end date
    const [numberOfItemsPerPageList] = React.useState([5, 10, 15]);
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    // Show Date Picker (Start or End Date)
    function showDatePicker(isStart) {
        setIsStartDate(isStart); // Determine whether we are picking start or end date
        setDatePicker(true); // Show the picker
    }

    // Handle Date Selection
    function OnDateSelected(event, selectedDate) {
        if (event.type === "set" && selectedDate) {
            if (isStartDate) {
                setStartDate(selectedDate); // Set start date
            } else {
                if (selectedDate >= startDate) {
                    setEndDate(selectedDate); // Set end date
                } else {
                    alert("Tanggal Selesai Tidak Bisa Lebih Awal dari Tanggal Mulai");
                }
            }
        }
        setDatePicker(false); // Close the picker after selection
    }

    const LeftContent = props => <Avatar.Icon {...props} icon="calendar" />;
    const theme = useTheme();

    const [items] = React.useState([
        {
            key: 1,
            name: '04-08-2025',
            calories: "08.00",
            fat: "Belum Masuk",
        },
        {
            key: 2,
            name: '04-08-2025',
            calories: "08.00",
            fat: "16.05",
        },
        {
            key: 3,
            name: '04-08-2025',
            calories: "08.00",
            fat: "6.05",
        },
        {
            key: 4,
            name: '04-08-2025',
            calories: "08.00",
            fat: "7.05",
        },
        {
            key: 5,
            name: '04-08-2025',
            calories: "08.00",
            fat: "7.05",
        },
        {
            key: 6,
            name: '04-08-2025',
            calories: "08.00",
            fat: "7.05",
        },
        {
            key: 7,
            name: '04-08-2025',
            calories: "08.00",
            fat: "7.05",
        },
    ]);
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);


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

                <ScrollView horizontal={true}><DataTable>
                    <DataTable.Header>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title>Tanggal</DataTable.Title>
                        <DataTable.Title >Masuk</DataTable.Title>
                        <DataTable.Title >Pulang</DataTable.Title>
                    </DataTable.Header>

                    {items.slice(from, to).map((item) => (
                        <DataTable.Row key={item.key}>
                            <DataTable.Cell>
                                <Avatar.Image size={35} source={{ uri: 'https://cdn-icons-png.flaticon.com/256/5600/5600583.png' }} />
                            </DataTable.Cell>
                            <DataTable.Cell>{item.name}</DataTable.Cell>
                            <DataTable.Cell >
                                <Chip icon="check" style={{ backgroundColor: theme.colors.onPrimary }} onPress={() => console.log('Pressed')}>{item.calories}</Chip>
                            </DataTable.Cell>
                            <DataTable.Cell ><Chip icon="cancel" textStyle={{ color: theme.colors.onError }} style={{ backgroundColor: theme.colors.error }} onPress={() => console.log('Pressed')}>{item.fat}</Chip>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(items.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        label={`${from + 1}-${to} of ${items.length}`}
                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                        numberOfItemsPerPage={itemsPerPage}
                        onItemsPerPageChange={onItemsPerPageChange}
                        showFastPaginationControls
                        selectPageDropdownLabel={'Rows per page'}
                    />
                </DataTable></ScrollView>


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
