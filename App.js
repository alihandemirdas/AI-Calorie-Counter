import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import AgeScreen from "./screens/AgeScreen";
import GenderScreen from "./screens/GenderScreen";
import HeightScreen from "./screens/HeightScreen";
import WeightScreen from "./screens/WeightScreen";
import ActivityScreen from "./screens/ActivityScreen";
import GoalScreen from "./screens/GoalScreen";
import ResultScreen from "./screens/ResultScreen";
import HeroScreen from "./screens/HeroScreen";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "expo-dev-client";
import './i18n';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
      MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
      MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
      MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
      MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
      MontserratThin: require("./assets/fonts/Montserrat-Thin.ttf"),
    });
    setFontsLoaded(true);
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Hero" component={HeroScreen} />
        <Stack.Screen name="Age" component={AgeScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="Height" component={HeightScreen} />
        <Stack.Screen name="Weight" component={WeightScreen} />
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="Goal" component={GoalScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
