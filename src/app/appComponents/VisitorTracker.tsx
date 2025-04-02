"use client";

import { useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { recordSiteVisit } from "../state/globalState";

interface VisitorTrackerProps {
  children: ReactNode;
}

export default function VisitorTracker({ children }: VisitorTrackerProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recordSiteVisit());
  }, [dispatch]);

  return <>{children}</>;
}
