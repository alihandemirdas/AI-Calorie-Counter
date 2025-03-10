import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HeroScreen({ navigation }) {
  const [logoAnim] = useState(new Animated.Value(0));
  const { t, i18n } = useTranslation();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoAnim, {
          toValue: -20,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(logoAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [logoAnim]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => changeLanguage(i18n.language === "tr" ? "en" : "tr")}
          >
            <Text style={styles.languageButtonText}>
              {i18n.language === "tr" ? "English" : "Turkish"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Animated.Image
                source={require("../assets/fire2.png")}
                style={[styles.icon, { transform: [{ translateY: logoAnim }] }]}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "7%",
              }}
            >
              <Text style={styles.label}>{t("hero-welcome")}</Text>
              <Text style={styles.label1}>{t("hero-app-name")}</Text>
              <Text style={styles.label2}>{t("hero-slug")}</Text>
            </View>
            <LinearGradient
              colors={["#09A129", "#2A4849"]}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Pressable
                style={styles.pressableButton}
                onPress={() => navigation.navigate("Age")}
              >
                <Text style={styles.buttonText}>{t("hero-start")}</Text>
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
      </>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  headerContainer: {
    top: "10%",
    right: "4%",
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: 1,
  },
  languageButton: {
    backgroundColor: "#09A129",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  languageButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  label: {
    fontSize: 25,
    marginBottom: 4,
    fontFamily: "MontserratLight",
  },
  label1: {
    fontSize: 25,
    marginBottom: 4,
    fontFamily: "MontserratBold",
  },
  label2: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: "MontserratLight",
    marginTop: 15,
    textAlign: "center",
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
