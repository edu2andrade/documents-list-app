import { Platform } from "react-native";
import { NotificationType } from "./types";

// Get the base WebSocket URL based on platform
const getWebSocketBaseUrl = () => {
	if (Platform.OS === "android") {
		return "ws://10.0.2.2:8080";
	}
	return "ws://localhost:8080";
};

type MessageListener = (data: NotificationType) => void;

export class WebSocketService {
	private socket: WebSocket | null = null;
	private listeners: MessageListener[] = [];
	private reconnectAttempts = 0;
	private maxReconnectAttempts = 5;
	private reconnectTimeout: NodeJS.Timeout | null = null;

	constructor(endpoint: string) {
		this.connect(endpoint);
	}

	private connect(endpoint: string): void {
		try {
			const url = `${getWebSocketBaseUrl()}${endpoint}`;
			this.socket = new WebSocket(url);

			this.socket.onopen = () => {
				console.log("WebSocket connection established");
				this.reconnectAttempts = 0;
			};

			this.socket.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data) as NotificationType;
					this.notifyListeners(data);
				} catch (error) {
					console.error("Error parsing WebSocket message:", error);
				}
			};

			this.socket.onerror = (error) => {
				console.error("WebSocket error:", error);
			};

			this.socket.onclose = (event) => {
				console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
				this.attemptReconnect(endpoint);
			};
		} catch (error) {
			console.error("Failed to create WebSocket connection:", error);
			this.attemptReconnect(endpoint);
		}
	}

	private attemptReconnect(endpoint: string): void {
		if (this.reconnectAttempts < this.maxReconnectAttempts) {
			this.reconnectAttempts++;
			const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

			console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);

			if (this.reconnectTimeout) {
				clearTimeout(this.reconnectTimeout);
			}

			this.reconnectTimeout = setTimeout(() => {
				this.connect(endpoint);
			}, delay);
		} else {
			console.error("Maximum reconnection attempts reached");
		}
	}

	public addMessageListener(listener: MessageListener): void {
		this.listeners.push(listener);
	}

	public removeMessageListener(listener: MessageListener): void {
		this.listeners = this.listeners.filter((l) => l !== listener);
	}

	private notifyListeners(data: NotificationType): void {
		this.listeners.forEach((listener) => {
			try {
				listener(data);
			} catch (error) {
				console.error("Error in WebSocket listener:", error);
			}
		});
	}

	public disconnect(): void {
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}

		if (this.reconnectTimeout) {
			clearTimeout(this.reconnectTimeout);
			this.reconnectTimeout = null;
		}

		this.listeners = [];
	}

	public isConnected(): boolean {
		return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
	}
}
