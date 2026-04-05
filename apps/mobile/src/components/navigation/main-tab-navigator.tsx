import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { themeTokens } from "../../theme/tokens";

import { TrainingScreen } from "../../screens/training/training-screen";
import { ProgressScreen } from "../../screens/progress/progress-screen";
import { RewardsScreen } from "../../screens/rewards/rewards-screen";
import { NutritionScreen } from "../../screens/nutrition/nutrition-screen";
import { CommunityScreen } from "../../screens/community/community-screen";
import { MachinesScreen } from "../../screens/machines/machines-screen";
import { CoachingScreen } from "../../screens/coaching/coaching-screen";
import { ExploreScreen } from "../../screens/explore/explore-screen";
import { SessionCreateScreen } from "../../screens/sessions/session-create-screen";
import { ProfileScreen } from "../../screens/profile/profile-screen";

type TabScreen =
  | "home"
  | "train"
  | "session-create"
  | "progress"
  | "rewards"
  | "more"
  | "nutrition"
  | "community"
  | "machines"
  | "coaching"
  | "profile"
  | "explore";

interface MainTabNavigatorProps {
  homeScreen: React.ReactNode;
}

const PRIMARY_TABS = [
  { key: "home" as const, icon: "🏠", label: "Home" },
  { key: "train" as const, icon: "🏋️", label: "Train" },
  { key: "session-create" as const, icon: "+", label: "" },
  { key: "progress" as const, icon: "📈", label: "Progress" },
  { key: "more" as const, icon: "☰", label: "More" },
];

const MORE_TABS = [
  { key: "explore" as const, icon: "🧭", label: "Explore" },
  { key: "nutrition" as const, icon: "🍎", label: "Nutrition" },
  { key: "community" as const, icon: "💬", label: "Community" },
  { key: "machines" as const, icon: "🔧", label: "Machines" },
  { key: "coaching" as const, icon: "👨‍🏫", label: "Coach" },
  { key: "profile" as const, icon: "👤", label: "Profile" },
];

export const MainTabNavigator = ({ homeScreen }: MainTabNavigatorProps) => {
  const [activeTab, setActiveTab] = useState<TabScreen>("home");

  const isMoreSection = ["nutrition", "community", "machines", "coaching", "explore"].includes(activeTab);

  const handleTabPress = (key: TabScreen) => {
    if (key === "more") {
      setActiveTab("explore");
    } else {
      setActiveTab(key);
    }
  };

  const handleMoreTabPress = (key: TabScreen) => {
    setActiveTab(key);
  };

  const handleExploreNavigate = (screen: string) => {
    const screenMap: Record<string, TabScreen> = {
      Training: "train",
      Progress: "progress",
      Nutrition: "nutrition",
      Coaching: "coaching",
    };
    const target = screenMap[screen];
    if (target) setActiveTab(target);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "home": return React.isValidElement(homeScreen) 
          ? React.cloneElement(homeScreen as React.ReactElement<any>, { onNavigateToSession: () => setActiveTab("session-create") })
          : <>{homeScreen}</>;
      case "train": return <TrainingScreen />;
      case "session-create": return <SessionCreateScreen />;
      case "progress": return <ProgressScreen />;
      case "rewards": return <RewardsScreen />;
      case "nutrition": return <NutritionScreen />;
      case "community": return <CommunityScreen />;
      case "machines": return <MachinesScreen />;
      case "coaching": return <CoachingScreen />;
      case "profile": return <ProfileScreen />;
      case "explore": return <ExploreScreen onNavigate={handleExploreNavigate} />;
      default: return React.isValidElement(homeScreen) 
      ? React.cloneElement(homeScreen as React.ReactElement<any>, { onNavigateToSession: () => setActiveTab("session-create") })
      : <>{homeScreen}</>;
    }
  };

  const currentTabs = isMoreSection ? MORE_TABS : PRIMARY_TABS;
  const currentHandler = isMoreSection ? handleMoreTabPress : handleTabPress;

  return (
    <View style={styles.container}>
      {renderScreen()}
      
      {isMoreSection && activeTab !== "more" ? (
        <View style={styles.backRow}>
          <Pressable style={styles.backBtn} onPress={() => setActiveTab("home")}>
            <Text style={styles.backText}>← Back to main</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.tabBar}>
        {currentTabs.map((tab) => {
          const isActive = tab.key === activeTab || (tab.key === "more" && isMoreSection);
          const isCenter = tab.key === "session-create";

          if (isCenter && !isMoreSection) {
            return (
              <Pressable
                key={tab.key}
                style={styles.centerBtnWrapper}
                onPress={() => currentHandler(tab.key)}
              >
                <View style={styles.centerBtnPrimary}>
                  <Text style={styles.centerBtnIcon}>+</Text>
                </View>
              </Pressable>
            );
          }

          return (
            <Pressable key={tab.key} style={styles.tabBtn} onPress={() => currentHandler(tab.key)}>
              <Text style={[styles.tabIcon, isActive ? styles.tabIconActive : null]}>
                {tab.icon}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: themeTokens.surface },
  tabBar: {
    height: 70,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-around",
    backgroundColor: "rgba(11, 11, 11, 0.95)",
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  tabBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: { fontSize: 24, opacity: 0.4 },
  tabIconActive: { opacity: 1, textShadowColor: "rgba(255,255,255,0.2)", textShadowRadius: 8 },
  centerBtnWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: -20,
  },
  centerBtnPrimary: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: themeTokens.brandPrimary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: themeTokens.brandPrimary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 4,
    borderColor: "#18181A",
  },
  centerBtnIcon: { fontSize: 32, color: "#FFFFFF", fontWeight: "400", lineHeight: 36, marginTop: -2 },
  backRow: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
    backgroundColor: themeTokens.surfaceElevated,
    borderWidth: 1,
    borderColor: themeTokens.border,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  backBtn: { paddingVertical: 4 },
  backText: {
    fontSize: 14,
    fontWeight: "700",
    color: themeTokens.brandPrimary,
  },
});
