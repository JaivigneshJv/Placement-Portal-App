import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import DocumentPicker from "react-native-document-picker";

const JobsScreen = () => {
  const [resume, setResume] = useState(null);
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({});
      setResume(result);
    } catch (err) {
      console.log("Error picking document", err);
    }
  };

  const [fontsLoaded] = useFonts({
    "Poppins-Italic": require("../assets/Fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("../assets/Fonts/Poppins-Light.ttf"),
    "Poppins-Bold": require("../assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-Thin": require("../assets/Fonts/Poppins-Thin.ttf"),
    "Poppins-Black": require("../assets/Fonts/Poppins-Black.ttf"),
  });

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
          flex: 0.14,
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            marginTop: 20,
            marginLeft: 20,
            fontSize: 30,
            fontFamily: "Poppins-Bold",
          }}
        >
          Resume
        </Text>
      </View>
      <View>
        <TouchableOpacity>
          <TouchableOpacity onPressText={() => pickDocument()}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins-Light",
                fontSize: 17,
                marginTop: 20,
              }}
            >
              Upload your resume here
            </Text>
            <Button title="button " onPress={() => pickDocument()}></Button>
          </TouchableOpacity>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "justify",
            padding: 20,
            fontFamily: "Poppins-Thin",
            fontSize: 15,
          }}
        >
          Our AI will analyze your resume and suggest you the best jobs
        </Text>
      </View>
      <TouchableOpacity onPress={() => pickDocument()}>
        <Text>Pick a PDF file</Text>
      </TouchableOpacity>
      {resume && (
        <TouchableOpacity onPress={() => uploadResume()}>
          <Text>Upload resume</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default JobsScreen;

const styles = StyleSheet.create({});
