import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import "@/global.css";
import { RecoilRoot } from "recoil";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "M-PLUS-1": require("../assets/fonts/M-PLUS-1.ttf"),
    "MPLUS1-Bold": require("../assets/fonts/MPLUS1-Bold.ttf"),
    "MPLUS1-Medium": require("../assets/fonts/MPLUS1-Medium.ttf"),
    "MPLUS1-Regular": require("../assets/fonts/MPLUS1-Regular.ttf"),
    "Yatra-One": require("../assets/fonts/Yatra-One.ttf"),
  });

  useEffect(() => {
    if (error) {
      throw error;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <RecoilRoot>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(location)" options={{ headerShown: false }} />
        <Stack.Screen name="(map)" options={{ headerShown: false }} />
      </Stack>
    </RecoilRoot>
  );
}
