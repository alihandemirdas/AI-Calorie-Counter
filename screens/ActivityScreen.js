import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { useTranslation } from "react-i18next";

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-9923127969454459/5654756827";

export default function ActivityScreen({ navigation, route }) {
  const [activity, setActivity] = useState("1.2");
  const { age, gender, height, weight } = route.params;
  const { t } = useTranslation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* 2.Adım */}
          <Text style={styles.label}>{t('activity-label')}</Text>
          <View
            style={{
              borderColor: "gray",
              borderRadius: 20,
              borderWidth: 0.8,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <Picker
              selectedValue={activity}
              style={styles.picker}
              onValueChange={(itemValue) => setActivity(itemValue)}
            >
              <Picker.Item
                label={t('activity-item1')}
                value="1.2"
              />
              <Picker.Item
                label={t('activity-item2')}
                value="1.375"
              />
              <Picker.Item
                label={t('activity-item3')}
                value="1.55"
              />
              <Picker.Item
                label={t('activity-item4')}
                value="1.725"
              />
              <Picker.Item
                label={t('activity-item5')}
                value="1.9"
              />
            </Picker>
          </View>
          <LinearGradient
            colors={["#09A129", "#2A4849"]}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Pressable
              style={styles.pressableButton}
              onPress={() =>
                navigation.navigate("Goal", {
                  age,
                  gender,
                  height,
                  weight,
                  activity,
                })
              }
            >
              <Text style={styles.buttonText}>{t('activity-button')}</Text>
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
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "MontserratLight",
  },
  picker: {
    backgroundColor: "white",
    width: "100%",
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
