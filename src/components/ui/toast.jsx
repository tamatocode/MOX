"use client"

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "../../lib/utils";

// Toast Context for managing toast state
const ToastContext = React.createContext(null);

const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Toast Provider: Manages toast state and rendering
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);

  // Memoize toast and dismissToast to prevent unnecessary re-renders
  const toast = React.useCallback(
    ({ title, description, variant = "default", duration = 5000 }) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [
        ...prev,
        { id, title, description, variant, duration },
      ]);
    },
    []
  );

  const dismissToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismissToast }}>
      <ToastPrimitives.Provider>
        {toasts.map(({ id, title, description, variant, duration }) => (
          <Toast
            key={id}
            variant={variant}
            duration={duration}
            onOpenChange={(open) => !open && dismissToast(id)} // Only dismiss when open is false
          >
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
        {children}
      </ToastPrimitives.Provider>
    </ToastContext.Provider>
  );
};

// Toast Viewport: Defines the area where toasts appear
const ToastViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        "fixed top-0 right-0 z-[1000] flex max-h-screen w-full max-w-[420px] flex-col p-4 sm:bottom-0 sm:top-auto sm:flex-col-reverse",
        className
      )}
      {...props}
    />
  )
);
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

// Toast Variants: Define styles for default and destructive toasts
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-6 pr-8 shadow-lg transition-all " +
  "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] " +
  "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none " +
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out " +
  "data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full " +
  "data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border border-gray-700 bg-gray-900 text-white",
        destructive: "border border-red-700 bg-red-900 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Toast Root: Main toast component
const Toast = React.forwardRef(
  ({ className, variant, ...props }, ref) => {
    return (
      <ToastPrimitives.Root
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Toast.displayName = ToastPrimitives.Root.displayName;

// Toast Action: Button for toast interactions
const ToastAction = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Action
      ref={ref}
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-gray-700 bg-transparent px-3 text-sm font-medium text-white " +
        "transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 " +
        "disabled:pointer-events-none disabled:opacity-50 " +
        "group-[.destructive]:border-red-700 group-[.destructive]:hover:bg-red-800 group-[.destructive]:hover:text-white " +
        "group-[.destructive]:focus:ring-red-500",
        className
      )}
      {...props}
    />
  )
);
ToastAction.displayName = ToastPrimitives.Action.displayName;

// Toast Close: Close button for dismissing the toast
const ToastClose = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Close
      ref={ref}
      className={cn(
        "absolute right-2 top-2 rounded-md p-1 text-gray-400 opacity-0 transition-opacity hover:text-white " +
        "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 group Hover:opacity-100",
        className
      )}
      toast-close=""
      aria-label="Close toast"
      {...props}
    >
      <X className="h-4 w-4" />
    </ToastPrimitives.Close>
  )
);
ToastClose.displayName = ToastPrimitives.Close.displayName;

// Toast Title: Title text for the toast
const ToastTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Title
      ref={ref}
      className={cn("text-sm font-semibold", className)}
      {...props}
    />
  )
);
ToastTitle.displayName = ToastPrimitives.Title.displayName;

// Toast Description: Description text for the toast
const ToastDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Description
      ref={ref}
      className={cn("text-sm opacity-90", className)}
      {...props}
    />
  )
);
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// Toaster: Alias for ToastProvider
const Toaster = ToastProvider;

export {
  useToast,
  Toaster,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};