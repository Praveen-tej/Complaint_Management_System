import { View, Text, Button, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
// npm install @react-native-picker/picker

export default function AdminDashboardScreen() {
  const { department } = useLocalSearchParams();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      // Replace with your backend URL
      const res = await fetch(`http://YOUR_SERVER_IP:5000/api/complaints/${department}`);
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      setComplaints([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, [department]);

  return (
    <ScrollView style={{ flex: 1, padding: 24, backgroundColor: '#f5f7fa' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
        {department} Department Complaints
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6366f1" />
      ) : complaints.length === 0 ? (
        <Text>No complaints found.</Text>
      ) : (
        complaints.map((c) => (
          <View key={c._id} style={{ backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <Text style={{ fontWeight: 'bold' }}>Complaint:</Text>
            <Text>{c.complaintText}</Text>
            <Text style={{ marginTop: 8, color: '#6366f1' }}>Status: {c.status || 'pending'}</Text>
            <Text style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
              Created: {new Date(c.createdAt).toLocaleString()}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
