import { View, StyleSheet, Image, Text } from "react-native";
import { useMediaQuery } from "responsive-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ExternalLink } from "@/components/shared/ExternalLink";
import { When } from "@/components/shared/When";
import { Menu } from "@/components/Menu";

export const Header = () => {
  const isDesktop = useMediaQuery({
    minBreakpoint: "md",
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <When value={isDesktop}>
          <Menu />
        </When>
        <View style={styles.logo}>
          <Image
            source={require("@/assets/images/logo.png")}
            width={253}
            height={84}
          />
        </View>
        <When value={isDesktop}>
          <ExternalLink
            href="https://www.linkedin.com/in/guilhermeguain/"
            style={styles.link}
          >
            <Text>LinkedIn</Text>
          </ExternalLink>
        </When>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    maxWidth: 1280,
  },
  logo: {
    flex: 1,
    alignItems: "center",
    maxWidth: "100%",
  },
  link: {
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#1323B0",
    color: "#fff",
    fontWeight: "bold",
  },
});
