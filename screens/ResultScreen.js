import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Pressable,
  Animated,
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

export default function ResultScreen({ navigation, route }) {
  const { t } = useTranslation();
  const { age, gender, height, weight, activity, goal } = route.params;
  const [logoAnim] = useState(new Animated.Value(0));
  const [prot, setProt] = useState("");
  const [karb, setKarb] = useState("");
  const [yag, setYag] = useState("");
  const [cal, setCal] = useState("");

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

    calculateNutrition();
  }, [logoAnim]);

  const calculateNutrition = () => {
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (gender === "male") {
      bmr = bmr * 1.2;
    } else {
      bmr = bmr * 1;  
    }

    const dailyCalories = bmr * activity + parseInt(goal);

    const proteinPercentage = 0.25;
    const fatPercentage = 0.3;
    const carbPercentage = 0.45;

    const proteinCalories = dailyCalories * proteinPercentage;
    const fatCalories = dailyCalories * fatPercentage;
    const carbCalories = dailyCalories * carbPercentage;

    const proteinGrams = proteinCalories / 4;
    const fatGrams = fatCalories / 8.8;
    const carbGrams = carbCalories / 4;

    setCal(Math.round(dailyCalories));
    setProt(Math.round(proteinGrams));
    setYag(Math.round(fatGrams));
    setKarb(Math.round(carbGrams));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* 1.Adım */}
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Animated.Image
              source={require("../assets/result-icon.png")}
              style={[styles.icon, { transform: [{ translateY: logoAnim }] }]}
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.result}>{t('res-h2')}</Text>
            <Text style={styles.result1}>{cal} {t('res-calorie')}</Text>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>{t('res-besin')}</Text>
              <Text style={styles.tableHeader}>{t('res-miktar')}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{t('res-protein')}</Text>
              <Text style={styles.tableCell}>{prot} gram</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{t('res-yag')}</Text>
              <Text style={styles.tableCell}>{yag} gram</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{t('res-carbs')}</Text>
              <Text style={styles.tableCell}>{karb} gram</Text>
            </View>
          </View>
          <LinearGradient
            colors={["#09A129", "#2A4849"]}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Pressable
              style={styles.pressableButton}
              onPress={() => navigation.navigate("Hero")}
            >
              <Text style={styles.buttonText}>{t('res-button')}</Text>
            </Pressable>
          </LinearGradient>
          <View style={styles.textView}>
            <Text
              style={{
                marginTop: 10,
                fontFamily: "MontserratLight",
                fontSize: 10,
              }}
            >{t('res-thanks')}</Text>
          </View>
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
  tableContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 40,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tableHeader: {
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
    width: "50%",
    textAlign: "left",
  },
  tableCell: {
    fontSize: 16,
    fontFamily: "MontserratLight",
    width: "50%",
    textAlign: "left",
  },
  container: {
    flex: 1,
    backgroundColor: "#F1F5F2",
    justifyContent: "center",
  },
  innerContainer: {
    padding: 20,
    marginVertical: "auto",
    marginHorizontal: "5%",
    zIndex: 1,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  result: {
    fontSize: 25,
    fontFamily: "MontserratLight",
  },
  result1: {
    fontSize: 24,
    fontFamily: "MontserratBold",
  },
  textView: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
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
