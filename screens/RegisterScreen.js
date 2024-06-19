import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-element-textinput";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../helpers/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import MyStatusBar from "../helpers/MyStatusBar";
import { registerFields } from "../utils/data";
import { Formik } from "formik";
import ToastManager, { Toast } from "toastify-react-native";
import { registerSchema } from "../utils/schemas";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../store/reducers/auth/authSlice";
import { ActivityIndicator } from "react-native";

const { width, height } = Dimensions.get("window");

const RegisterScreen = () => {
  const [AgreeTerms, setAgreeTerms] = useState(false);
  const [values, setValues] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleRegistration = async (values) => {
    if (AgreeTerms === false) {
      Toast.error("Agree to terms to continue");
    } else {
      dispatch(register(values));
      setValues(values);
    }
  };

  useEffect(() => {
    if (isSuccess && message === "Verification email sent successfully") {
      Alert.alert(
        "Information",
        "A mail containing a 5 digit code has been sent",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.replace("ConfirmPassword", {
                data: user,
              });
            },
          },
        ],
        { cancelable: false }
      );
    }

    if (
      isError &&
      message &&
      message === "Verification code sent to this email has not expired"
    ) {
      Alert.alert(
        "Information",
        "Verification code sent to this email has not expired",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.replace("ConfirmPassword", {
                data: values,
              });
            },
          },
        ],
        { cancelable: false }
      );
    }

    if (
      isError &&
      message &&
      message !== "Verification code sent to this email has not expired"
    ) {
      Toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
    }

    if (isError && message) {
      dispatch(reset());
    }
  }, [isError, isLoading, isSuccess, message, user, route, navigation]);

  return (
    <>
      <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ToastManager
        textStyle={{ fontSize: 12 }}
        height={50}
        position="top"
        width={300}
      />

      <SafeAreaView
        className=""
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}>
        <ScrollView
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: Platform.OS === "ios" ? 90 : 100,
            }}>
            <Text
              style={{
                fontSize: 30,

                fontWeight: "bold",
                color: Colors.dark,
              }}>
              Create a new account
            </Text>
            <Text style={{ fontSize: 13 }}>
              Fill in your details accurately
            </Text>
          </View>

          <View style={styles.container}>
            <Formik
              initialValues={{
                Fullname: "",
                Phone: "",
                ReferalCode: "",
                Email: "",
                Password: "",
                ConfirmPassword: "",
              }}
              validationSchema={registerSchema}
              onSubmit={handleRegistration}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View style={styles.container}>
                    {registerFields.map((field, index) => (
                      <View key={index}>
                        <TextInput
                          key={index}
                          showIcon
                          mode={field.mode}
                          style={styles.input}
                          inputStyle={styles.inputStyle}
                          placeholderStyle={styles.placeholderStyle}
                          textErrorStyle={styles.textErrorStyle}
                          placeholder={field.placeholder}
                          placeholderTextColor="gray"
                          focusColor={Colors.primary}
                          onChangeText={handleChange(field.title)}
                          onBlur={handleBlur(field.title)}
                          value={values[field.title]}
                          renderLeftIcon={() => field.icon}
                        />
                        {touched[field.title] && errors[field.title] && (
                          <Text
                            style={{
                              color: "red",
                              fontSize: 11,
                              marginLeft: 5,
                            }}>
                            {errors[field.title]}
                          </Text>
                        )}
                      </View>
                    ))}
                    <View style={styles.checkboxContainer}>
                      <TouchableOpacity
                        onPress={() => setAgreeTerms(!AgreeTerms)}
                        style={styles.checkbox}>
                        {AgreeTerms ? (
                          <FontAwesome
                            name="check-square-o"
                            size={24}
                            color={Colors.primary}
                          />
                        ) : (
                          <FontAwesome
                            name="square-o"
                            size={24}
                            color={Colors.gray}
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Terms and Conditions", {
                            screen: route.name,
                          })
                        }>
                        <Text
                          style={styles.checkboxText}
                          className="text-blue-700 underline">
                          Agree to Terms and Conditions
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View className=" mt-5 rounded-full flex flex-col items-center justify-center">
                      {isLoading ? (
                        <TouchableOpacity
                          className="p-4 rounded-full flex flex-col items-center justify-center mt-2"
                          style={{
                            backgroundColor: Colors.primary,
                            width: width / 2,
                          }}>
                          <Text
                            className="text-white font-ca font-bold"
                            style={{ fontFamily: "sen" }}>
                            <ActivityIndicator size="small" color="#fff" />
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={handleSubmit}
                          className="p-4 rounded-full flex flex-col items-center justify-center mt-2"
                          style={{
                            backgroundColor: Colors.primary,
                            width: width / 2,
                          }}>
                          <Text
                            className="text-white font-ca font-bold"
                            style={{ fontFamily: "sen" }}>
                            Complete Registration
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </>
              )}
            </Formik>
          </View>

          <TouchableOpacity
            onPress={() => navigation.replace("Login")}
            className="items-center -mt-5">
            <Text className="text-[16px] font-bold">
              Already have an account?{" "}
              <Text className="text-blue-500"> Login </Text>
            </Text>
          </TouchableOpacity>

          <View style={{ marginBottom: 300 }}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    height: 55,
    paddingHorizontal: 18,
    borderRadius: 30,

    borderColor: Colors.gray,
    backgroundColor: Colors.gray,

    marginTop: 8,
  },
  inputStyle: { fontSize: 14 },
  labelStyle: {
    fontSize: 12,
    position: "absolute",

    top: -8,
    paddingHorizontal: 8,
    marginLeft: -4,
    zIndex: 20,
  },
  placeholderStyle: { fontSize: 14, zIndex: 20 },
  textErrorStyle: { fontSize: 14 },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
  },
});
