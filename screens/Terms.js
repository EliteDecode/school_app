import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../helpers/Colors";

const TermsAndConditionsView = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 py-16 bg-white">
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          className=" py-2 flex-row space-x-2 items-center bg-white">
          <Ionicons
            name="arrow-back"
            size={27}
            color={Colors.primary}
            style={{ marginLeft: 16 }}
          />
          <Text className="text-[16px]">Go Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>General Terms and Conditions</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  paragraph: {
    fontSize: 18,
    marginTop: 5,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  listItem: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 10,
  },
});

export default TermsAndConditionsView;
