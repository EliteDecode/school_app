import { FontAwesome } from "@expo/vector-icons";
import Colors from "../helpers/Colors";

export const registerFields = [
  {
    title: "Fullname",
    placeholder: "Fullname",
    mode: "text",
    icon: (
      <FontAwesome
        name="user"
        size={22}
        color={Colors.primary}
        style={{ width: "10%", opacity: 0.4 }}
      />
    ),
  },

  {
    title: "Email",
    mode: "text",
    placeholder: " Email Address",
    icon: (
      <FontAwesome
        name="envelope"
        size={15}
        color={Colors.primary}
        style={{ width: "10%", opacity: 0.4 }}
      />
    ),
  },
  {
    title: "Phone",
    mode: "number",
    placeholder: "Phone number",
    icon: (
      <FontAwesome
        name="phone"
        size={15}
        color={Colors.primary}
        style={{ width: "10%", opacity: 0.4 }}
      />
    ),
  },
  {
    title: "Password",
    mode: "password",
    placeholder: "Password",
    icon: (
      <FontAwesome
        name="lock"
        size={20}
        color={Colors.primary}
        style={{ width: "10%", opacity: 0.4 }}
      />
    ),
  },
  {
    title: "ConfirmPassword",
    mode: "password",
    placeholder: "Confirm Password",
    icon: (
      <FontAwesome
        name="lock"
        size={22}
        color={Colors.primary}
        style={{ width: "10%", opacity: 0.4 }}
      />
    ),
  },
  {
    title: "ReferalCode",
    mode: "text",
    placeholder: "Referal Code",
    icon: (
      <FontAwesome
        name="question"
        size={22}
        color={Colors.primary}
        style={{ width: "10%", opacity: 0.4 }}
      />
    ),
  },
];
