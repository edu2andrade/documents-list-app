import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NotificationType, WebSocketService } from '@/services';

export function WebSocketLogger() {
  useEffect(() => {
    const websocketService = new WebSocketService('/notifications');

    const messageListener = (data: NotificationType) => {
      console.log('WebSocket message received:', data.DocumentTitle);
    };

    websocketService.addMessageListener(messageListener);

    console.log('WebSocket logger started...');

    return () => {
      console.log('WebSocket logger stopped.');
      websocketService.removeMessageListener(messageListener);
      websocketService.disconnect();
    };
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <Text>WebSocket Logger Active...</Text>
    </View>
  );
}
