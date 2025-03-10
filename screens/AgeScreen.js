import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { useTranslation } from "react-i18next";

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-9923127969454459/5654756827";

export default function AgeScreen({ navigation }) {
  const [age, setAge] = useState("");
  const { t } = useTranslation();

  const handlePress = () => {
    if (age.trim() === "") {
      Alert.alert("Hata", t('age-error'));
    } else {
      navigation.navigate("Gender", { age });
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* 1.Adım */}
          <Text style={styles.label}>{t('age-label')} </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            placeholder={t('age-place')} 
          />
          <LinearGradient
            colors={["#09A129", "#2A4849"]}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Pressable style={styles.pressableButton} onPress={handlePress}>
              <Text style={styles.buttonText}>{t('age-button')} </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>

      {/* Background Circles */}
      <View style={styles.backgroundCircles}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
        <View style={[styles.circle, styles.circle4]} />
        <View style={[styles.circle, styles.circle5]} />
        <View style={[styles.circle, styles.circle6]} />
      </View>

      <View style={styles.adMob}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            networkExtras: {
              collapsible: "bottom",
            },
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  adMob: {
    bottom: "0",
  },
  container: {
    flex: 1,
    backgroundColor: "#F1F5F2",
    justifyContent: "center",
  },
  innerContainer: {
    padding: 20,
    marginVertical: "auto",
    marginHorizontal: "10%",
    zIndex: 1,
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
    fontFamily: "MontserratLight",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1.5,
    borderRadius: 30,
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 10,
    fontFamily: "MontserratMedium",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 75,
  },
  pressableButton: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  backgroundCircles: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0, // Ensures the circles stay behind the content
  },
  circle: {
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "#60D394",
    opacity: 0.15,
  },
  circle1: {
    width: 125,
    height: 125,
    top: -5,
    left: -70,
  },
  circle2: {
    width: 140,
    height: 140,
    bottom: -80,
    right: -100,
    backgroundColor: "#60D394",
  },
  circle3: {
    width: 140,
    height: 140,
    bottom: 70,
    left: 80,
    backgroundColor: "#60D394",
  },
  circle4: {
    width: 130,
    height: 130,
    top: 180,
    left: 30,
    backgroundColor: "#60D394",
    opacity: 0.2,
  },
  circle5: {
    width: 120,
    height: 120,
    bottom: 180,
    right: -90,
    backgroundColor: "#60D394",
  },
  circle6: {
    width: 220,
    height: 220,
    top: -30,
    right: -80,
    backgroundColor: "#60D394",
  },
});
