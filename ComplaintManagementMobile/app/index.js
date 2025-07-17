import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 24 }}>
        Welcome to the Complaint Management App!
      </Text>
      <Link href="/complaint-form" asChild>
        <Button title="Raise a Complaint" />
      </Link>
      <Link href="/admin-login" asChild>
        <Button title="Admin Login" />
      </Link>
    </View>
  );
}
