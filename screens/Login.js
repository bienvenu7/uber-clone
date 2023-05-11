import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";

//for firebase
import { app } from "../firebase";
import { getFirestore, addDoc, getDocs, collection } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = React.useState("");
  const [myErrors, setMyErrors] = useState("");

  const navigation = useNavigation();

  const auth = getAuth(app);

  const userRegister = async () => {
    if (email === "" || password === "") {
      setMyErrors("make sure you fiiled up requireds fields");
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.uid) {
            navigation.navigate("HomeScreen");
          }
        })
        .catch((error) => {
          // const errorMessage = error.message;
          setMyErrors("this user already exist");
        });
    }
  };

  const userLogin = async () => {
    if (email === "" || password === "") {
      setMyErrors("make sure you fiiled up requireds fields");
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.uid) {
            navigation.navigate("HomeScreen");
          }
        })
        .catch((error) => {
          if (error.message) {
            setMyErrors(
              "Email or password is not correct, please check correctly"
            );
          }
          console.log(errorCode, errorMessage);
        });
    }
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.text}>Login</Text>
          <View style={styles.inputs}>
            {myErrors && <Text style={styles.error}>{myErrors}</Text>}
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              label="*Username or email"
              placeholder="*Username or email"
            >
              {email}
            </TextInput>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              label="*Password"
              placeholder="*Password"
              secureTextEntry
            >
              {password}
            </TextInput>
          </View>
          <View style={styles.buttons}>
            <Button onPress={userLogin} title="login" />
            <View style={styles.register}>
              <Text>or you can</Text>
              <Button onPress={userRegister} title="Register" />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  text: {
    fontSize: "40px",
    fontWeight: "500",
    marginBottom: 40,
  },
  inputs: {
    width: "100%",
    height: "auto",
  },
  input: {
    borderWidth: ".5px",
    padding: 20,
    borderColor: "#000",
    borderRadius: 10,
    fontSize: "16px",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 30,
  },
  register: {
    flexDirection: "row",
    height: "auto",
    alignItems: "center",
  },

  error: {
    color: "#FF0000",
    marginBottom: 10,
  },
});
