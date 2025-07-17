import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const departments = ['it', 'cse', 'ece', 'eee', 'mech', 'civil'];

export default function AdminLoginScreen() {
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (department && email) {
      // You can add real admin validation here
      router.push({ pathname: '/admin-dashboard', params: { department } });
    } else {
      setMessage('Please fill all fields.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#f5f7fa' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Admin Login</Text>
      <TextInput
        style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 16 }}
        placeholder="Department (e.g. it, cse)"
        value={department}
        onChangeText={setDepartment}
      />
      <TextInput
        style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 16 }}
        placeholder="Admin Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Login" onPress={handleLogin} color="#6366f1" />
      {message ? <Text style={{ marginTop: 16, textAlign: 'center', color: '#ef4444', fontWeight: 'bold' }}>{message}</Text> : null}
    </View>
  );
}
