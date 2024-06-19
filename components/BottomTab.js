import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Platform, SafeAreaView, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/base";
import Drawer from "react-native-drawer";
import Colors from "../helpers/Colors";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import ControlPanel from "./ControPanel";
import MyStatusBar from "../helpers/MyStatusBar";
import ChangeEmailScreen from "../screens/settings/ChangeEmailScreen";
import ConfirmEmailChangeScreen from "../screens/settings/ConfirmEmailChangeScreen";
import ChangePasswordScreen from "../screens/settings/ChangePasswordScreen";
import DeleteAccountScreen from "../screens/settings/DeleteAccountScreen";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../store/reducers/auth/authSlice";
import Filter from "../screens/Filter/Filter";
import Downloads from "../screens/Downloads/Downloads";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import UpdateProfileScreen from "../screens/Profile/UpdateProfileScreen";

const Tab = createBottomTabNavigator();

const drawerStyles = {
  drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
};

const BottomTab = () => {
  const { user } = useSelector((state) => state.auth);
  const loggedInUserId = user?.data?._id;
  const drawerRef = useRef(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchUserData());
  }, []);

  const closeControlPanel = () => {
    drawerRef.current.close();
  };

  return (
    <>
      <Drawer
        type="overlay"
        content={<ControlPanel closeControlPanel={closeControlPanel} />}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        ref={drawerRef}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 },
        })}>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: Colors.primary,
              tabBarInactiveTintColor: Colors.gray2,

              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Filter") {
                  iconName = focused ? "filter" : "filter-outline";
                } else if (route.name === "Downloads") {
                  iconName = focused ? "download" : "download-outline";
                } else if (route.name === "Settings") {
                  iconName = focused ? "settings" : "settings-outline";
                }

                return <Icon name={iconName} size={size} color={color} />;
              },
            })}>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              initialParams={{
                openControlPanel: () => drawerRef.current.open(),
              }}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Filter"
              component={Filter}
              options={{ headerShown: false }}
              initialParams={{
                openControlPanel: () => drawerRef.current.open(),
              }}
            />
            <Tab.Screen
              name="Downloads"
              component={Downloads}
              options={{ headerShown: false }}
              initialParams={{
                openControlPanel: () => drawerRef.current.open(),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ headerShown: false }}
              initialParams={{
                openControlPanel: () => drawerRef.current.open(),
              }}
            />

            <Tab.Screen
              name="Change Email"
              component={ChangeEmailScreen}
              options={{ headerShown: false, tabBarButton: () => null }}
              initialParams={{
                openControlPanel: () => drawerRef.current.open(),
              }}
            />
            <Tab.Screen
              name="Confirm Email"
              component={ConfirmEmailChangeScreen}
              options={{ headerShown: false, tabBarButton: () => null }}
              initialParams={{
                openControlPanel: () => drawerRef.current.open(),
              }}
            />

            <Tab.Screen
              name="Change Password"
              component={ChangePasswordScreen}
              options={{ headerShown: false, tabBarButton: () => null }}
              initialParams={{
                openControlPanel: () => drawerRef.current.open(),
              }}
            />

            <Tab.Screen
              name="Delete Account"
              component={DeleteAccountScreen}
              options={{ headerShown: false, tabBarButton: () => null }}
              initialParams={{
                openControlPanel: () => drawerRef.current.open(),
              }}
            />

            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              initialParams={{
                openControlPanel: () => drawerRef.current.open(),
              }}
              options={{ tabBarButton: () => null, headerShown: false }}
            />
            <Tab.Screen
              name="Update Profile"
              component={UpdateProfileScreen}
              initialParams={{
                openControlPanel: () => drawerRef.current.open(),
              }}
              options={{ tabBarButton: () => null, headerShown: false }}
            />
          </Tab.Navigator>
        </View>
      </Drawer>
    </>
  );
};

export default BottomTab;
