import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const passwordValidateRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;