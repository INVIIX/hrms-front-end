import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLocation } from "react-router-dom";

// utility untuk merge class tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// utility hook untuk ambil last path segment
export function useLastPath() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? "";
}
