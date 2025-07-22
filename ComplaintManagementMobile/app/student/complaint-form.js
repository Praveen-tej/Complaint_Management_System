import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, ActivityIndicator, Picker, StyleSheet, ScrollView } from "react-native";

const departments = ["it", "cse", "ec"];

export default function ComplaintForm({ user }) {
  const [form, setForm] = useState({
    department: "",
    complaintText: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const email = user.email.toLowerCase();
  const match = email.match(/^[a-zA-Z0-9]+[0-9]{2}([a-z]+)@psnacet\.edu\.in$/);
  const emailDept = match ? match[1] : "";

  const handleSubmit = async () => {
    setMessage("");
    setLoading(true);

    setTimeout(async () => {
      if (emailDept === form.department) {
        try {
          const res = await fetch("http://yourserver/api/complaints", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });

          if (res.ok) {
            setMessage("Complaint submitted successfully!");
            setForm({ department: "", complaintText: "" });
          } else {
            setMessage("Failed to submit complaint.");
          }
        } catch (err) {
          setMessage("Server error. Please try again later.");
        }
      } else {
        setMessage("Invalid department.");
        setForm({ department: "", complaintText: "" });
      }
      setLoading(false);
    }, 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Raise a Complaint</Text>

      <Text style={styles.label}>Select Department</Text>
      <Picker
        selectedValue={form.department}
        style={styles.picker}
        onValueChange={(itemValue) =>
          setForm({ ...form, department: itemValue })
        }
      >
        <Picker.Item label="Select department" value="" />
        {departments.map((dept) => (
          <Picker.Item key={dept} label={dept} value={dept} />
        ))}
      </Picker>

      <Text style={styles.label}>Complaint</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Write your complaint..."
        multiline
        numberOfLines={4}
        value={form.complaintText}
        onChangeText={(text) =>
          setForm({ ...form, complaintText: text })
        }
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Submit" onPress={handleSubmit} />
      )}

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f2f2",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  picker: {
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  textArea: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    textAlignVertical: "top",
    padding: 10,
    marginBottom: 10,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: "green",
  },
});
