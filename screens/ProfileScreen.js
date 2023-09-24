import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ProfileSVG from "../assets/images/profile.svg";
import { useFonts } from "expo-font";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Contact from "./ProfileScreen/Contact";
import Activity from "./ProfileScreen/Activity";

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Poppins-Italic": require("../assets/Fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("../assets/Fonts/Poppins-Light.ttf"),
    "Poppins-Bold": require("../assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-Thin": require("../assets/Fonts/Poppins-Thin.ttf"),
    "Poppins-Black": require("../assets/Fonts/Poppins-Black.ttf"),
  });
  useEffect(() => {
    const FetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log(token);
        const tokensend = {
          token: token,
        };
        axios.post("http://192.168.0.100:8000/Main", tokensend).then((res) => {
          console.log(res);
          const email = res.data.email;
          const username = res.data.name;
          const rollno = res.data.regno;
          console.log(email, username, rollno);
          setUserData({ email, username, rollno });
        });
      } catch (err) {
        console.log("error at checkLogin", err);
        navigation.navigate("Login");
      }
    };
    FetchData();
  }, []);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 10 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 0.3,
          backgroundColor: "grey",
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          source={require("../assets/images/546605.jpg")}
        ></Image>
        <ProfileSVG
          width={100}
          height={100}
          style={{
            position: "absolute",
            top: 180,
            left: 30,
            zIndex: 1,
          }}
        ></ProfileSVG>
      </View>
      <View
        style={{
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 20,
            marginTop: 50,
            marginLeft: 40,
            textTransform: "uppercase",
          }}
        >
          {userData.username}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 12,
            marginLeft: 40,
            textTransform: "uppercase",
          }}
        >
          B.E - Computer Science and Engineering
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 12,
            marginLeft: 40,
            textTransform: "uppercase",
          }}
        >
          {userData.rollno}
        </Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontFamily: "Poppins-Black" },
        }}
        style={{
          flex: 0.5,
        }}
      >
        <Tab.Screen name="Contact" component={Contact} />
        <Tab.Screen name="Activity" component={Activity} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
