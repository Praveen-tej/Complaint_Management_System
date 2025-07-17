import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { useState } from 'react';

const departments = ['it', 'cse', 'ece', 'eee', 'mech', 'civil'];

export default function ComplaintFormScreen() {
  const [department, setDepartment] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // For demo, replace with actual user email from Google sign-in
  const user = { email: 'abc22it@psnacet.edu.in' };
  const match = user.email.toLowerCase().match(/^[a-zA-Z0-9]+[0-9]{2}([a-z]+)@psnacet\.edu\.in$/);
  const emailDept = match ? match[1] : '';

  const handleSubmit = async () => {
    setMessage('');
    setLoading(true);
    if (emailDept === department) {
      try {
        // Replace with your backend URL
        await fetch('http://YOUR_SERVER_IP:5000/api/complaints', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ department, complaintText }),
        });
        setMessage('Complaint submitted successfully!');
        setDepartment('');
        setComplaintText('');
      } catch (err) {
        setMessage('Failed to submit complaint.');
      }
    } else {
      setMessage('Please raise a complaint in your own department only.');
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#f5f7fa' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Raise a Complaint</Text>
      <TextInput
        style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 16 }}
        placeholder="Department (e.g. it, cse)"
        value={department}
        onChangeText={setDepartment}
      />
      <TextInput
        style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 16 }}
        placeholder="Enter your complaint"
        value={complaintText}
        onChangeText={setComplaintText}
        multiline
      />
      {loading ? (
        <ActivityIndicator size="large" color="#6366f1" />
      ) : (
        <Button title="Submit" onPress={handleSubmit} color="#6366f1" />
      )}
      {message ? <Text style={{ marginTop: 16, textAlign: 'center', color: '#06b6d4', fontWeight: 'bold' }}>{message}</Text> : null}
    </View>
  );
}
