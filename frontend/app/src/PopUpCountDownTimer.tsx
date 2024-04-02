// import { useFonts } from "expo-font";
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   StyleSheet,
//   Text,
//   Modal,
//   Pressable,
//   Button,
//   Image,
//   Dimensions,
// } from "react-native";
// import { theme } from "../theme";
// import { LinearGradient } from "expo-linear-gradient";
// import { isAbsolute } from "path";
// import CardCountDownTimer from "@/components/CardCountDownTimer";

// const PopUpCountdownTimer = () => {
//   const [fontsLoaded] = useFonts({
//     "dm-sans-medium": require("../../assets/fonts/DMSans-Medium.ttf"),
//     "dm-sans-extrabold": require("../../assets/fonts/DMSans-ExtraBold.ttf"),
//     "dm-sans-semibold": require("../../assets/fonts/DMSans-SemiBold.ttf"),
//     "dm-sans-regular": require("../../assets/fonts/DMSans-Regular.ttf"),
//   });
//   if (!fontsLoaded) {
//     return <Text>Loading...</Text>;
//   }
//   const [time, setTime] = useState<number | null>(0.1 * 60); // 25 minutes in seconds
//   const [modalVisible, setModalVisible] = useState(false);
//   const [remainingTime, setRemainingTime] = useState<number | null>(null);
//   const [exceed, setExceed] = useState(false);

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;

//     if (time !== null && time > 0 && !exceed) {
//       interval = setInterval(() => {
//         setTime((prevTime) => (prevTime ?? time) - 1);
//         setRemainingTime(time);
//       }, 1000);
//     }
//     if (time !== null && time === 0 && !exceed) {
//       interval = setInterval(() => {
//         setTime((prevTime) => (prevTime ?? time) + 1);
//         setRemainingTime(time);
//       }, 1000);
//       setExceed(true);
//     } else if (time !== null && time >= 0 && exceed) {
//       interval = setInterval(() => {
//         setTime((prevTime) => (prevTime ?? time) + 1);
//         setRemainingTime(time);
//       }, 1000);
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [time]);

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;

//     return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const stopCountdown = () => {
//     setModalVisible(false);
//     console.log(time);
//     console.log(remainingTime);
//     setTime(null);
//   };

//   return (
//     <View style={styles.container}>
//       <Pressable onPress={() => setModalVisible(true)}>
//         <Text>Show Timer</Text>
//       </Pressable>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Pressable
//               style={styles.closeButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Image
//                 style={{ width: 32, resizeMode: "contain" }}
//                 source={require("../../assets/icons/button-close.png")}
//               />
//             </Pressable>

//             <Text style={styles.modalHeader}>Departure time begins in</Text>

//             <Text style={styles.timer}>
//               {time !== null ? formatTime(time) : "00:00"}
//             </Text>

//             {exceed ? (
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <Image
//                   style={{
//                     marginTop: -16,
//                     marginRight: -5,
//                     width: 16,
//                     resizeMode: "contain",
//                   }}
//                   source={require("../../assets/icons/alert-circle-yellow.png")}
//                 />
//                 <Text style={styles.modalYellowText}>
//                   Departure time passed. You may be late.
//                 </Text>
//               </View>
//             ) : null}

//             <Pressable
//               onPress={stopCountdown}
//               style={[styles.buttonContainer, styles.shadowProp]}
//             >
//               <LinearGradient
//                 colors={["#CF7B04", "#EDA33C"]}
//                 style={styles.buttonStyle}
//               >
//                 <Text style={styles.buttonText}>Stop Countdown</Text>
//               </LinearGradient>
//             </Pressable>

//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "flex-start",
//               }}
//             >
//               <Image
//                 style={{
//                   marginTop: 5,
//                   marginRight: 5,
//                   width: 16,
//                   resizeMode: "contain",
//                 }}
//                 source={require("../../assets/icons/alert-circle.png")}
//               />
//               <Text style={styles.modalText}>
//                 Press this button after leaving your home to stop the countdown.
//                 The timer will continue until manually turned off.
//               </Text>
//             </View>
//           </View>
//         </View>
//       </Modal>
//       <CardCountDownTimer time={time} />
//     </View>
//   );
// };

// const screenWidth = Dimensions.get("window").width;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   timer: {
//     fontSize: 60,
//     fontWeight: "bold",
//     color: "#FEFEFE",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: "85%",
//     backgroundColor: "#283752",
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   modalHeader: {
//     paddingTop: 40,
//     paddingBottom: 10,
//     marginBottom: 15,
//     textAlign: "center",
//     color: theme.colors.textPrimary,
//     fontFamily: "dm-sans-semibold",
//     fontSize: 20,
//   },
//   modalText: {
//     paddingTop: 20,
//     marginBottom: 15,
//     textAlign: "left",
//     color: theme.colors.textPrimary,
//     fontFamily: "dm-sans-regular",
//     fontSize: 12,
//     width: "85%",
//   },
//   modalYellowText: {
//     // marginBottom: 15,
//     textAlign: "center",
//     color: theme.colors.yellow,
//     fontFamily: "dm-sans-regular",
//     fontSize: 12,
//     width: "85%",
//   },
//   closeButton: {
//     position: "absolute",
//     top: -20,
//     right: 10,
//   },
//   buttonContainer: {
//     marginTop: 10,
//     width: "100%",
//     alignItems: "center",
//   },
//   buttonStyle: {
//     width: screenWidth - 112, // Adjusting width considering left and right margin of 32
//     height: 48,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     fontFamily: "dm-sans-extrabold",
//     color: theme.colors.textPrimary,
//     fontSize: 16,
//   },
//   shadowProp: {
//     shadowColor: theme.colors.textPrimary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
// });

// export default PopUpCountdownTimer;
