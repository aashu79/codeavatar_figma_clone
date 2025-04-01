import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recordSiteVisit, recordCardVisitor } from "../state/globalState";
import { RootState } from "../redux/store";

// Hook that can be used in any page component
export function useVisitorTracking(cardId?: number) {
  const dispatch = useDispatch();
  const { siteVisitors } = useSelector((state: RootState) => state.globalState);

  useEffect(() => {
    // Check if we're in the browser, not in SSR
    if (typeof window !== "undefined") {
      // Track general site visit
      dispatch(recordSiteVisit());

      // If a card ID was provided, also track that specific card visit
      if (cardId) {
        dispatch(recordCardVisitor({ id: cardId }));
      }
    }
  }, [dispatch, cardId]);

  // Return visitor stats for convenience
  return {
    totalVisits: siteVisitors.totalVisits,
    uniqueVisitors: siteVisitors.uniqueVisitors.length,
  };
}
