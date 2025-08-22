import { useTheme, Text, Chip, Card, IconButton, MD3Colors, Button, Badge, Portal, Dialog, Avatar } from "react-native-paper";
import * as React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import { padding } from "@mui/system";


export function HomeScreen() {

    const [value, setValue] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [visible, setVisibility] = React.useState(false);
    const [numberOfItemsPerPageList] = React.useState([5, 10, 15]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const theme = useTheme();
    const showDialog = () => setVisibility(true);
    const hideDialog = () => setVisibility(false);
    const LeftContent = props => <Avatar.Image {...props} source={{ uri: 'https://cdn-icons-png.flaticon.com/256/5600/5600583.png' }}  />

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
    ]);
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (

        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <ScrollView>
                <Card style={{marginBottom:20}}>
                    <Card.Title title="User - Staff IT" subtitle="Selamat Datang Kembali" left={LeftContent} />
                    {/* <Card.Content>
                        <Text variant="titleLarge">Card title</Text>
                        <Text variant="bodyMedium">Card content</Text>
                    </Card.Content> */}
                 
                </Card>
                <Card style={{ marginBottom: 20, justifyContent: "center" }}>
                    <Card.Content style={styles.content}>
                        {/* Row container for the columns */}
                        <View style={styles.row}>
                            {/* First Column: Text + Icon */}
                            <TouchableOpacity onPress={showDialog}>
                                <View style={styles.column}>
                                    <IconButton
                                        icon="account"
                                        color={MD3Colors.error50}
                                        size={30}
                                        style={styles.icon}
                                    />
                                    <Text variant="labelSmall" style={[styles.text, { textAlign: 'center' }]}>Profil</Text>
                                </View>
                                {/* 2 */}
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={styles.column}>
                                    <IconButton
                                        icon="calendar"
                                        color={MD3Colors.error50}
                                        size={30}
                                        style={styles.icon}
                                    />
                                    <Text variant="labelSmall" style={[styles.text, { textAlign: 'center' }]}>Cuti</Text>
                                </View>
                            </TouchableOpacity>

                            {/* 3 */}
                            <TouchableOpacity>

                                <View style={styles.column}>
                                    <IconButton
                                        icon="history"
                                        color={MD3Colors.error50}
                                        size={30}
                                        style={styles.icon}
                                    />
                                    <Text variant="labelSmall" style={[styles.text, { textAlign: 'center' }]}>History</Text>
                                </View>

                            </TouchableOpacity>
                            {/* 4 */}

                            <TouchableOpacity>
                                <View style={styles.column}>
                                    <IconButton
                                        icon="map-marker"
                                        color={MD3Colors.error50}
                                        size={30}
                                        style={styles.icon}
                                    />
                                    <Text variant="labelSmall" style={[styles.text, { textAlign: 'center' }]}>Lokasi</Text>
                                </View>
                            </TouchableOpacity>

                            {/* 5 */}

                            <TouchableOpacity>
                                <View style={styles.column}>
                                    <IconButton
                                        icon="qrcode"
                                        color={MD3Colors.error50}
                                        size={30}
                                        style={styles.icon}
                                    />
                                    <Text variant="labelSmall" style={[styles.text, { textAlign: 'center' }]}>Patroli</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </Card.Content>
                </Card>

                <View style={[styles.row, { marginBottom: 20 }]}>
                    <TouchableOpacity onPress={showDialog}>
                        <View style={styles.column}>
                            <Card>
                                <Card.Content>
                                    <IconButton
                                        icon="login"
                                        color={MD3Colors.error50}
                                        size={30}
                                        style={styles.icon}
                                    />
                                    <Text variant="bodyLarge" style={[styles.text, { textAlign: 'center' }]}>Masuk</Text>
                                    <Text variant="labelSmall" style={[styles.text, { textAlign: 'center' }]}>Belum Absen</Text>
                                </Card.Content>
                            </Card>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showDialog}>
                        <View style={styles.column}>
                            <Card>
                                <Card.Content>
                                    <IconButton
                                        icon="logout"
                                        color={MD3Colors.error50}
                                        size={30}
                                        style={styles.icon}
                                    />
                                    <Text variant="bodyLarge" style={[styles.text, { textAlign: 'center' }]}>Pulang</Text>
                                    <Text variant="labelSmall" style={[styles.text, { textAlign: 'center' }]}>Belum Absen</Text>
                                </Card.Content>
                            </Card>
                        </View>
                    </TouchableOpacity>
                </View>

                <Text variant="titleMedium" style={{ marginBottom: 20 }}>Rekap Presensi Bulan ... Tahun ...</Text>
                <Card style={{ marginBottom: 20, justifyContent: "space-between" }}>
                    <Card.Content style={[styles.conten,{paddingVertical:-5}]}>
                        {/* Row container for the columns */}
                        <View style={styles.row}>
                            {/* First Column: Text + Icon */}
                            <TouchableOpacity>
                                <View style={styles.column}>
                                    <Badge style={{ marginBottom: -15 }}>3</Badge>
                                    <IconButton
                                        icon="calendar-account"
                                        color={MD3Colors.error50}
                                        size={30}
                                        style={styles.icon}
                                    />
                                    <Text variant="labelSmall" style={[styles.text, { textAlign: 'center' }]}>Profil</Text>
                                </View>
                                {/* 2 */}
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={styles.column}>
                                    <Badge style={{ marginBottom: -15 }}>3</Badge>
                                    <IconButton
                                        icon="calendar-alert"
                                        color={MD3Colors.error50}
                                        size={30}
                                        style={styles.icon}
                                    />
                                    <Text variant="labelSmall" style={[styles.text, { textAlign: 'center' }]}>Izin</Text>
                                </View>
                            </TouchableOpacity>

                            {/* 3 */}
                            <TouchableOpacity>

                                <View style={styles.column}>
                                    <Badge style={{ marginBottom: -15 }}>3</Badge>
                                    <IconButton
                                        icon="hospital-box"
                                        color={MD3Colors.error50}
                                        size={30}
                                        style={styles.icon}
                                    />
                                    <Text variant="labelSmall" style={[styles.text, { textAlign: 'center' }]}>Sakit</Text>
                                </View>

                            </TouchableOpacity>
                            {/* 4 */}

                            <TouchableOpacity>
                                <View style={styles.column}>
                                    <Badge style={{ marginBottom: -15 }}>3</Badge>
                                    <IconButton
                                        icon="calendar-clock"
                                        color={MD3Colors.error50}
                                        size={30}
                                        style={styles.icon}
                                    />
                                    <Text variant="labelSmall" style={[styles.text, { textAlign: 'center' }]}>Telat</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </Card.Content>
                </Card>


                <SegmentedButtons
                    style={{ marginBottom: 20 }}
                    value={value}
                    onValueChange={setValue}
                    buttons={[
                        {
                            value: 'now',
                            label: 'Bulan Ini',
                            icon: 'calendar',
                        },
                        {
                            value: 'leaderboard',
                            label: 'Leaderboard',
                            icon: 'trophy'
                        },
                    ]}
                />
                <ScrollView horizontal={true}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Tanggal</DataTable.Title>
                        <DataTable.Title >Masuk</DataTable.Title>
                        <DataTable.Title >Pulang</DataTable.Title>
                    </DataTable.Header>

                    {items.slice(from, to).map((item) => (
                        <DataTable.Row key={item.key}>
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
                </DataTable>
                </ScrollView>
            </ScrollView>
            <View>
                {/* <Button onPress={showDialog}>Show Dialog</Button> */}
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>503</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">Fitur Sedang Dikembangkan, silahkan tunggu update selanjutnya.</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </SafeAreaView >

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