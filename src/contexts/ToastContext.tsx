import React, { createContext, useContext, useState, ReactNode } from "react";
import { Toast, ToastType } from "@/components/Toast";

type ToastContextType = {
	showToast: (params: { title: string; description?: string; type?: ToastType; duration?: number }) => void;
	hideToast: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

type ToastState = {
	visible: boolean;
	title: string;
	description?: string;
	type: ToastType;
	duration: number;
};

const initialToastState: ToastState = {
	visible: false,
	title: "",
	description: "",
	type: "info",
	duration: 3000,
};

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toast, setToast] = useState<ToastState>(initialToastState);

	const showToast = ({
		title,
		description,
		type = "info",
		duration = 3000,
	}: {
		title: string;
		description?: string;
		type?: ToastType;
		duration?: number;
	}) => {
		setToast({
			visible: true,
			title,
			description,
			type,
			duration,
		});
	};

	const hideToast = () => {
		setToast((prev) => ({ ...prev, visible: false }));
	};

	return (
		<ToastContext.Provider value={{ showToast, hideToast }}>
			{children}
			<Toast
				visible={toast.visible}
				title={toast.title}
				description={toast.description}
				type={toast.type}
				duration={toast.duration}
				onHide={hideToast}
			/>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}
