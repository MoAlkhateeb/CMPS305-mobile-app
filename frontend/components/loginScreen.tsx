import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";

export default function LoginScreen() {
  const navigate = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function signIn() {
    if (username == "" && password == "") {
      alert("Kindly provide any info!");
    } else if (username == "") {
      alert("Kindly provide a username!");
    } else if (password == "") {
      alert("Kindly provide a password!");
    } else {
      alert("Await the API man");
      await fetch("192.168.134.142:8080/login", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((res) => {
          console.log(res.json);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <TextInput
        value={username}
        id="username"
        placeholder="Username..."
        onChangeText={setUsername}
        style={styles.text}
      ></TextInput>
      <TextInput
        value={password}
        id="password"
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles.text}
      ></TextInput>
      <TouchableHighlight onPress={signIn} style={styles.submit}>
        <Text>Login</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    margin: 20,
  },

  text: {
    width: 200,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    margin: 5,
  },

  submit: {
    backgroundColor: "#3498db",
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  warningInvisible: {},

  warningVisible: {},
});
