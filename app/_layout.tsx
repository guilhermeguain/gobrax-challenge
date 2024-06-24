import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { ScreenProvider } from "responsive-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { store } from "@/store";
import { theme } from "@/theme";

import { Header } from "@/components/Header";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ScreenProvider baseFontSize={16}>
          <PaperProvider theme={theme}>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: true,
                  header: () => <Header />,
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </PaperProvider>
        </ScreenProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
