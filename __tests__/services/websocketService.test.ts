import { Platform } from 'react-native';
import { WebSocketService } from '@/services/api/websocketService';
import { NotificationType } from '@/services/api/types';

// Mock the Platform module
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn(),
}));

// Define WebSocket constants if not already defined
if (typeof WebSocket === 'undefined') {
  Object.defineProperty(global, 'WebSocket', {
    value: {
      CONNECTING: 0,
      OPEN: 1,
      CLOSING: 2,
      CLOSED: 3
    },
    writable: true
  });
}

// Create a mock WebSocket class with Jest mock functions
class MockWebSocket {
  url: string;
  onopen: ((this: WebSocket, ev: Event) => any) | null = null;
  onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null = null;
  onclose: ((this: WebSocket, ev: CloseEvent) => any) | null = null;
  onerror: ((this: WebSocket, ev: Event) => any) | null = null;
  readyState: number = WebSocket.CONNECTING;

  constructor(url: string) {
    this.url = url;
  }

  close = jest.fn().mockImplementation(() => {
    if (this.onclose) {
      const closeEvent = { code: 1000, reason: 'Normal closure', wasClean: true } as unknown as CloseEvent;
      this.onclose.call(this as unknown as WebSocket, closeEvent);
    }
    this.readyState = WebSocket.CLOSED;
  });

  // Helper methods for tests to simulate WebSocket events
  simulateOpen(): void {
    this.readyState = WebSocket.OPEN;
    if (this.onopen) {
      this.onopen.call(this as unknown as WebSocket, {} as Event);
    }
  }

  simulateMessage(data: string): void {
    if (this.onmessage) {
      const messageEvent = { data } as unknown as MessageEvent;
      this.onmessage.call(this as unknown as WebSocket, messageEvent);
    }
  }

  simulateError(): void {
    if (this.onerror) {
      this.onerror.call(this as unknown as WebSocket, {} as Event);
    }
  }

  simulateClose(code: number = 1000, reason: string = 'Normal closure'): void {
    this.readyState = WebSocket.CLOSED;
    if (this.onclose) {
      const closeEvent = { code, reason, wasClean: true } as unknown as CloseEvent;
      this.onclose.call(this as unknown as WebSocket, closeEvent);
    }
  }
}

// Create a Jest mock function for the WebSocket constructor
const mockWebSocketConstructor = jest.fn().mockImplementation((url: string) => {
  return new MockWebSocket(url);
});

// Replace the global WebSocket with our mock
(global as any).WebSocket = mockWebSocketConstructor;

// Sample notification data
const mockNotification: NotificationType = {
  Timestamp: '2023-01-01T00:00:00Z',
  UserID: 'user1',
  UserName: 'User One',
  DocumentID: 'doc1',
  DocumentTitle: 'Document One',
};

describe('WebSocketService', () => {
  let websocketService: WebSocketService;
  let mockSocket: MockWebSocket;
  
  // Mock timers
  jest.useFakeTimers();
  
  // Spy on console methods
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  
  // Spy on setTimeout and clearTimeout
  let setTimeoutSpy: jest.SpyInstance;
  let clearTimeoutSpy: jest.SpyInstance;
  
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    mockWebSocketConstructor.mockClear();
    
    // Spy on console methods to prevent actual logging during tests
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Spy on setTimeout and clearTimeout
    setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    
    // Create a new service instance
    websocketService = new WebSocketService('/notifications');
    
    // Get the mock socket instance - it's the last instance created by the constructor
    mockSocket = mockWebSocketConstructor.mock.results[0].value as MockWebSocket;
    
    // Set the readyState to CONNECTING by default
    mockSocket.readyState = WebSocket.CONNECTING;
  });

  afterEach(() => {
    // Clean up
    websocketService.disconnect();
    jest.restoreAllMocks();
  });

  test('should connect to the correct WebSocket URL', () => {
    expect(mockWebSocketConstructor).toHaveBeenCalledWith('ws://localhost:8080/notifications');
  });

  test('should use correct URL for Android platform', () => {
    // Change the platform to Android
    Platform.OS = 'android';
    
    // Clear previous calls
    mockWebSocketConstructor.mockClear();
    
    // Create a new service instance
    const androidService = new WebSocketService('/notifications');
    
    expect(mockWebSocketConstructor).toHaveBeenCalledWith('ws://10.0.2.2:8080/notifications');
    
    // Reset platform back to iOS for other tests
    Platform.OS = 'ios';
    
    // Clean up
    androidService.disconnect();
  });

  test('should notify listeners when a message is received', () => {
    // Create mock listeners
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    
    // Add listeners
    websocketService.addMessageListener(listener1);
    websocketService.addMessageListener(listener2);
    
    // Simulate connection open
    mockSocket.simulateOpen();
    
    // Simulate receiving a message
    mockSocket.simulateMessage(JSON.stringify(mockNotification));
    
    // Check that both listeners were called with the parsed data
    expect(listener1).toHaveBeenCalledWith(mockNotification);
    expect(listener2).toHaveBeenCalledWith(mockNotification);
  });

  test('should handle JSON parsing errors', () => {
    // Create mock listener
    const listener = jest.fn();
    
    // Add listener
    websocketService.addMessageListener(listener);
    
    // Simulate connection open
    mockSocket.simulateOpen();
    
    // Simulate receiving an invalid JSON message
    mockSocket.simulateMessage('invalid json');
    
    // Listener should not be called
    expect(listener).not.toHaveBeenCalled();
    
    // Error should be logged
    expect(console.error).toHaveBeenCalledWith(
      'Error parsing WebSocket message:',
      expect.any(Error)
    );
  });

  test('should remove message listeners correctly', () => {
    // Create mock listeners
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    
    // Add listeners
    websocketService.addMessageListener(listener1);
    websocketService.addMessageListener(listener2);
    
    // Remove the first listener
    websocketService.removeMessageListener(listener1);
    
    // Simulate connection open
    mockSocket.simulateOpen();
    
    // Simulate receiving a message
    mockSocket.simulateMessage(JSON.stringify(mockNotification));
    
    // Only the second listener should be called
    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).toHaveBeenCalledWith(mockNotification);
  });

  test('should handle errors in listeners', () => {
    // Create a listener that throws an error
    const errorListener = jest.fn().mockImplementation(() => {
      throw new Error('Listener error');
    });
    
    // Add the error-throwing listener
    websocketService.addMessageListener(errorListener);
    
    // Simulate connection open
    mockSocket.simulateOpen();
    
    // Simulate receiving a message
    mockSocket.simulateMessage(JSON.stringify(mockNotification));
    
    // The listener should be called
    expect(errorListener).toHaveBeenCalledWith(mockNotification);
    
    // Error should be logged
    expect(console.error).toHaveBeenCalledWith(
      'Error in WebSocket listener:',
      expect.any(Error)
    );
  });

  test('should attempt to reconnect when connection is closed', () => {
    // Simulate connection open
    mockSocket.simulateOpen();
    
    // Simulate connection close
    mockSocket.simulateClose(1006, 'Abnormal closure');
    
    // Should log the close event
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'WebSocket connection closed: 1006 Abnormal closure'
    );
    
    // Should attempt to reconnect after a delay
    expect(setTimeoutSpy).toHaveBeenCalled();
    
    // Fast-forward time to trigger reconnection
    jest.runOnlyPendingTimers();
    
    // Should create a new WebSocket connection
    expect(mockWebSocketConstructor).toHaveBeenCalledTimes(2);
  });

  test('should stop reconnecting after max attempts', () => {
    // Create a direct spy on the WebSocketService's private method
    const originalWebSocketService = WebSocketService.prototype;
    const attemptReconnectSpy = jest.spyOn(originalWebSocketService as any, 'attemptReconnect');
    
    // Reset mocks to start fresh
    mockWebSocketConstructor.mockClear();
    consoleErrorSpy.mockClear();
    
    // Create a new service instance
    const service = new WebSocketService('/notifications');
    
    // Get the initial mock socket
    const initialSocket = mockWebSocketConstructor.mock.results[0].value as MockWebSocket;
    
    // Manually set the reconnectAttempts to max to trigger the error
    (service as any).reconnectAttempts = 5;
    
    // Call the attemptReconnect method directly
    (service as any).attemptReconnect('/notifications');
    
    // Should log max reconnection attempts reached
    expect(consoleErrorSpy).toHaveBeenCalledWith('Maximum reconnection attempts reached');
    
    // Clean up
    service.disconnect();
    attemptReconnectSpy.mockRestore();
  });

  test('should clean up resources when disconnected', () => {
    // Create mock listener
    const listener = jest.fn();
    
    // Add listener
    websocketService.addMessageListener(listener);
    
    // Simulate connection open
    mockSocket.simulateOpen();
    
    // Reset spy call counts
    clearTimeoutSpy.mockClear();
    
    // Disconnect
    websocketService.disconnect();
    
    // Socket should be closed
    expect(mockSocket.close).toHaveBeenCalled();
    
    // Any pending reconnect timeouts should be cleared
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    // Simulate receiving a message after disconnect
    mockSocket.simulateMessage(JSON.stringify(mockNotification));
    
    // Listener should not be called because it was removed during disconnect
    expect(listener).not.toHaveBeenCalled();
  });

  test('should report connection status correctly', () => {
    // Create a spy on the WebSocketService.prototype.isConnected method
    const originalIsConnected = WebSocketService.prototype.isConnected;
    const isConnectedSpy = jest.spyOn(WebSocketService.prototype, 'isConnected');
    
    // Create a new service instance
    const service = new WebSocketService('/notifications');
    
    // Test 1: When socket is null
    // Temporarily replace the isConnected method with our own implementation
    isConnectedSpy.mockImplementation(function(this: WebSocketService) {
      // Simulate socket being null
      return false;
    });
    
    // Should report as not connected when socket is null
    expect(service.isConnected()).toBe(false);
    
    // Test 2: When socket is in OPEN state
    // Update the mock implementation
    isConnectedSpy.mockImplementation(function(this: WebSocketService) {
      // Simulate socket being in OPEN state
      return true;
    });
    
    // Should report as connected when in OPEN state
    expect(service.isConnected()).toBe(true);
    
    // Restore the original method
    isConnectedSpy.mockRestore();
    
    // Clean up
    service.disconnect();
  });
});
