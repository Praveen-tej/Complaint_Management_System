import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function AdminDashboard({ department }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolvingId, setResolvingId] = useState(null);
  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://your-backend.com/api/complaints/${department}`);
      const data = await res.json();
      setComplaints(data);
    } catch {
      setComplaints([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, [department]);
  const handleResolve = (id) => {
    setResolvingId(id);
    setTimeout(async () => {
      try {
        const res = await fetch(`http://your-backend.com/api/complaints/resolve/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) fetchComplaints();
        else Alert.alert("Error", "Failed to resolve complaint.");
      } catch {
        Alert.alert("Error", "Failed to resolve complaint.");
      }
      setResolvingId(null);
    }, 2000);
  };
  
  const handleRemove = (id) => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to remove this complaint?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await fetch(`http://your-backend.com/api/complaints/${id}`, {
                method: "DELETE",
              });
              if (res.ok) setComplaints((prev) => prev.filter((c) => c._id !== id));
              else Alert.alert("Error", "Failed to remove complaint.");
            } catch {
              Alert.alert("Error", "Failed to remove complaint.");
            }
          },
        },
      ]
    );
  };
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (complaints.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noData}>No complaints found.</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={complaints}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.label}>Complaint:</Text>
          <Text>{item.complaintText}</Text>
          <Text style={styles.label}>Status:</Text>
          <Text>{item.status || "pending"}</Text>
          {item.response ? (
            <>
              <Text style={styles.label}>Response:</Text>
              <Text>{item.response}</Text>
            </>
          ) : null}
          <Text style={styles.timestamp}>
            Created: {new Date(item.createdAt).toLocaleString()}
          </Text>
          {resolvingId === item._id ? (
            <View style={styles.center}>
              <ActivityIndicator />
              <Text>Resolving...</Text>
            </View>
          ) : item.status !== "resolved" ? (
            <Button
              title="Resolve"
              onPress={() => handleResolve(item._id)}
            />
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.removeButton]}
              onPress={() => handleRemove(item._id)}
            >
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  noData: { fontSize: 18, color: "#555" },
  list: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: { fontWeight: "600", marginTop: 8 },
  timestamp: { marginTop: 8, fontSize: 12, color: "#666" },
  button: {
    marginTop: 12,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  removeButton: { backgroundColor: "#e11d48" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});