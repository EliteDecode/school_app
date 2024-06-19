import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import MyStatusBar from "../../helpers/MyStatusBar";
import NavigationBar from "../../components/NavigationBar";
import Colors from "../../helpers/Colors";

import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";
const HomeScreen = ({ route }) => {
  const { openControlPanel } = route.params;
  const imagesWithText = [
    { id: 1, uri: slider1, text: "First Image" },
    { id: 2, uri: slider2, text: "Second Image" },
    { id: 3, uri: slider3, text: "Third Image" },
  ];

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.uri} style={styles.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <>
      <MyStatusBar barStyle="dark-content" backgroundColor={Colors.primary} />
      <NavigationBar openControlPanel={openControlPanel} />

      <Carousel
        data={imagesWithText}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        autoplay={true}
        loop
      />
    </>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    width: Dimensions.get("window").width,
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ececec",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 15,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
