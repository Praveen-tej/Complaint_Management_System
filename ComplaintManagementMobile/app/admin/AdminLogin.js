// components/AdminLogin.js
import React, { useState } from "react";
import { 
  View, Text, TextInput, Button, StyleSheet, Alert,
  ScrollView, Platform 
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AdminDashboard from "./AdminDashboard";

const departments = ["it", "cse", "ec"];
export default function AdminLogin() {
  const [form, setForm] = useState({ department: "", email: "" });
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // Web used e.target.name; here we handle Picker and TextInput separately
  const handleDeptChange = (dept) => {
    setForm((f) => ({ ...f, department: dept }));
  };
  const handleEmailChange = (text) => {
    setForm((f) => ({ ...f, email: text }));
  };

  const handleSubmit = () => {
    if (form.department && form.email) {
      setLoggedIn(true);
    } else {
      setMessage("Please fill all fields.");
    }
  };

  // Once logged in, show the AdminDashboard component
  if (loggedIn) {
    return <AdminDashboard department={form.department} />;
  }

  // Otherwise show the login form
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin Login</Text>

      <Text style={styles.label}>Department</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.department}
          onValueChange={handleDeptChange}
          mode="dropdown"
        >
          <Picker.Item label="Select department" value="" />
          {departments.map((dept) => (
            <Picker.Item key={dept} label={dept.toUpperCase()} value={dept} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Email ID</Text>
      <TextInput
        style={styles.input}
        placeholder="admin@psnacet.edu.in"
        value={form.email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button title="Login" onPress={handleSubmit} />

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#7c3aed",
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    color: "#444",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
