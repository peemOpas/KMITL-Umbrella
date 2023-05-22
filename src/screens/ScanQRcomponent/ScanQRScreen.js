import React, {useState, useEffect,useCallback} from 'react';
import axios from 'axios';
import {authentication} from '../../../firebase';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  FlatList,
  RefreshControl,
} from 'react-native';
import Logo from '../../../assets/images/search.png';
import LockerImage from '../../../assets/images/locker.png';
import profileImage2 from '../../../assets/images/profileNew.png';
import profileBW from '../../../assets/images/profileBW.png';
import bill from '../../../assets/images/bill.png';
import correctImage from '../../../assets/images/correct.png';
import {useNavigation} from '@react-navigation/native';
import {FullWindowOverlay} from 'react-native-screens';
import {ScrollView} from 'react-native';
import Stylecomponent from '../../StyleSheet/StyleAuthenticationcomponent';
import secondModalImage from '../../../assets/images/howto2.png';

export default function ScanQRScreen({navigation}) {
  const [data, setData] = useState([]);
  const [lockerData, setLockerData] = useState(null);
  const [userId, setUserId] = useState(null);

    // Define your state variable for refreshing
    const [refreshing, setRefreshing] = useState(false);

    // This function will be called when a refresh is triggered
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      // Simulate a network request
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

    const renderRefreshControl = () => {
      return (
        <RefreshControl
          colors={["#E35205"]} // Color of the spinning indicator
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      );
    };

  useEffect(() => {
    const email = authentication.currentUser.email;

    axios
      .get('http://10.66.4.168:8000/api/get_userid/', {params: {email}})
      .then(response => {
        setUserId(response.data.id);
        return axios.get(
          `http://10.66.4.168:8000/api/user_rentstate/${response.data.id}/`,
        );
      })
      .then(response => {
        const fetchedRentStateData = response.data.map(item => {
          return {
            time: item.rent_start,
            name: item.renter,
            date: item.date,
            umbrellaId: item.umbrella,
            image: profileImage2,
          };
        });

        setData(fetchedRentStateData);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const fetchAllLockersData = async () => {
      let lockerNumber = 1;
      let availableLockers = []; // Temp array to store available lockers
  
      while (true) {
        try {
          const response = await axios.get(
            `http://10.66.4.168:8000/api/locker/${lockerNumber}`,
          );
          const lockerData = response.data;
  
          // If lockerData is undefined or null, break the loop
          if (!lockerData) {
            console.log(
              `Locker data for locker number ${lockerNumber} not available`,
            );
            break;
          }
  
          // Check if any of the lock is available, if yes add it to the availableLockers array
          if (lockerData.lock_set.some(lock => !lock.availability)) {
            const availableLocker = {
              id: lockerData.id, // assuming this is your lockerId
              place: lockerData.name,
              status: 'Available',
              image: LockerImage, // add your image source here
            };
            availableLockers.push(availableLocker);
          }
  
          lockerNumber++;
        } catch (error) {
          // If the response status is 404, break the loop
          if (error.response && error.response.status === 404) {
            console.log(
              `Locker data for locker number ${lockerNumber} not available`,
            );
            break;
          } else {
            console.error(error);
            break; // Exit the loop if we get any other error
          }
        }
      }
  
      // Once we've fetched all the data, update the state
      setLockerData(availableLockers);  // Update the state with available lockers
    };
  
    fetchAllLockersData();
  }, [reloadData]);
  
  // Sample data
  // const data = [
  //   {
  //     id: 1,
  //     umbrellaId: '01',
  //     lockerId: '001',
  //     name: 'John Doe',
  //     date: '2023-04-28',
  //     time: '12:00',
  //     image: profileImage2,
  //   },
  //   {
  //     id: 2,
  //     umbrellaId: '02',
  //     lockerId: '002',
  //     name: 'John Doe',
  //     date: '2023-04-27',
  //     time: '17:00',
  //     image: profileImage2,
  //   },
  //   // Add more data items here
  // ];

  // [
  //   {
  //     id: 1,
  //     lockerId: '003',
  //     place: 'ECC Building',
  //     status: 'Available',
  //     image: LockerImage,
  //   },
  //   {
  //     id: 2,
  //     lockerId: '004',
  //     place: 'HM Building',
  //     status: 'Available',
  //     image: LockerImage,
  //   },
  //   {
  //     id: 1,
  //     lockerId: '003',
  //     place: 'ECC Building',
  //     status: 'Available',
  //     image: LockerImage,
  //   },
  //   {
  //     id: 2,
  //     lockerId: '004',
  //     place: 'HM Building',
  //     status: 'Available',
  //     image: LockerImage,
  //   },
  //   {
  //     id: 1,
  //     lockerId: '003',
  //     place: 'ECC Building',
  //     status: 'Available',
  //     image: LockerImage,
  //   },
  //   {
  //     id: 2,
  //     lockerId: '004',
  //     place: 'HM Building',
  //     status: 'Available',
  //     image: LockerImage,
  //   },
  // ];

  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);

  function DataCard({item}) {
    return (
      <View style={styles.dataCard}>
        <Image source={item.image} style={styles.dataImage} />
        <View style={styles.dataContent}>
          <Text>Umbrella ID: {item.umbrellaId}</Text>
          <Text>Locker ID: {item.lockerId}</Text>
          <Text>Name: {item.name}</Text>
          <Text>Date: {item.date}</Text>
          <Text>Time: {item.time}</Text>
          <View style={styles.returnButtonContainer}>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => setShowModal(true)}>
              <Text style={styles.returnButtonText}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function LockerCard({item}) {
    if (item.status === 'Available') {
      return (
        <View style={styles.lockerCard}>
          <Image source={item.image} style={styles.lockerImage} />
          <View style={styles.lockerContent}>
            <Text>Place: {item.place}</Text>
            <Text>Locker ID: {item.lockerId}</Text>
            <Text>
              Status: <Text style={styles.availableStatus}>{item.status}</Text>
            </Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }

  const renderItem = ({item}) => <DataCard item={item} />;
  const renderLocker = ({item}) => <LockerCard item={item} />;

  if (data.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Image source={profileBW} style={styles.noDataImage} />
        <Text style={styles.noDataText}>No umbrella rented</Text>
      </View>
    );
  }

  // Sort data by date and time in descending order (most recent first)
  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.date + 'T' + a.time);
    const dateB = new Date(b.date + 'T' + b.time);
    return dateB - dateA;
  });

  const availableLockers = lockerData.filter(
    locker => locker.status === 'Available',
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedData}
        renderItem={renderItem}
        refreshControl={renderRefreshControl()}
       
      />
      <Modal animationType="slide" transparent={false} visible={showModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowModal(false)}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => setShowSecondModal(true)}>
            <Text style={styles.infoButtonText}>?</Text>
          </TouchableOpacity>
          <Text style={styles.lockerTitle}>
            Available Lockers: {availableLockers.length}
          </Text>
          <FlatList
            data={availableLockers}
            renderItem={renderLocker}
           
            contentContainerStyle={styles.flatListContentContainer}
          />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showSecondModal}>
        <View style={styles.secondModalContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowSecondModal(false)}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Image source={secondModalImage} style={styles.secondModalImage} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAC983',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  dataCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  dataImage: {
    width: 150,
    height: 150,
    borderRadius: 25,
    marginRight: 10,
  },
  dataContent: {
    justifyContent: 'space-between',
    flex: 1,
  },
  returnButtonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },
  returnButton: {
    backgroundColor: '#E35205',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  returnButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FAC983',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  backButton: {
    backgroundColor: '#E35205',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  infoButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: -30,
  },
  infoButtonText: {
    color: 'black',
    fontSize: 16,
  },
  lockerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  lockerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  lockerImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginRight: 10,
  },
  lockerContent: {
    justifyContent: 'space-between',
    flex: 1,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataImage: {
    width: 200,
    height: 200,
  },
  noDataText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  flatListContentContainer: {
    flexGrow: 1,
  },
  availableStatus: {
    color: 'green',
  },
  secondModalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  secondModalImage: {
    width: '100%',
    height: '100%',
    //resizeMode: 'contain',
  },
});
