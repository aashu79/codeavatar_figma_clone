import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as UAParserLib from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";
const UAParser = UAParserLib.UAParser;

export interface CardCount {
  cardId: number;
  viewCount: number;
  shareCount: number;
  uniqueVisitors?: string[];
}

export interface GlobalState {
  cardCount: CardCount[];
  siteVisitors: {
    totalVisits: number;
    uniqueVisitors: string[];
  };
  referrals: {
    id: string;
    count: number;
  }[];
}

const initialState: GlobalState = {
  cardCount: [],
  siteVisitors: {
    totalVisits: 0,
    uniqueVisitors: [],
  },
  referrals: [],
};

const getVisitorFingerprint = (): string => {
  if (typeof window === "undefined") return "server";

  let visitorId = localStorage.getItem("unique_visitor_id");

  if (!visitorId) {
    visitorId = uuidv4();
    localStorage.setItem("unique_visitor_id", visitorId);
  }

  const parser = new UAParser();
  const result = parser.getResult();

  return [
    visitorId,
    result.browser.name,
    result.browser.version,
    result.os.name,
    result.os.version,
    result.device.vendor || "unknown",
    result.device.model || "unknown",

    Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)),
  ]
    .filter(Boolean)
    .join("|");
};

const globalSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    increaseViewCount: (state, action: PayloadAction<{ id: number }>) => {
      const cardId = action.payload.id;
      const card = state.cardCount.find((card) => card.cardId === cardId);
      if (card) {
        card.viewCount += 1;
      } else {
        state.cardCount.push({
          cardId: cardId,
          viewCount: 1,
          shareCount: 0,
          uniqueVisitors: [],
        });
      }
    },

    increaseShareCount: (state, action: PayloadAction<{ id: number }>) => {
      const cardId = action.payload.id;
      const card = state.cardCount.find((card) => card.cardId === cardId);
      if (card) {
        card.shareCount += 1;
      } else {
        state.cardCount.push({
          cardId: cardId,
          viewCount: 0,
          shareCount: 1,
          uniqueVisitors: [],
        });
      }
    },

    recordSiteVisit: (state) => {
      state.siteVisitors.totalVisits += 1;

      const fingerprint = getVisitorFingerprint();

      if (!state.siteVisitors.uniqueVisitors.includes(fingerprint)) {
        state.siteVisitors.uniqueVisitors.push(fingerprint);
        state.siteVisitors.totalVisits += 1;
      }
    },

    recordCardVisitor: (state, action: PayloadAction<{ id: number }>) => {
      const cardId = action.payload.id;
      const fingerprint = getVisitorFingerprint();

      let card = state.cardCount.find((card) => card.cardId === cardId);

      if (!card) {
        card = {
          cardId,
          viewCount: 0,
          shareCount: 0,
          uniqueVisitors: [],
        };
        state.cardCount.push(card);
      }

      if (!card.uniqueVisitors) {
        card.uniqueVisitors = [];
      }

      if (!card.uniqueVisitors.includes(fingerprint)) {
        card.uniqueVisitors.push(fingerprint);
      }
    },

    recordReferral: (state, action: PayloadAction<{ refId: string }>) => {
      const refId = action.payload.refId;

      if (!refId) return;

      const existingRef = state.referrals.find((ref) => ref.id === refId);

      if (existingRef) {
        existingRef.count += 1;
      } else {
        state.referrals.push({
          id: refId,
          count: 1,
        });
      }
    },
  },
});

export const {
  increaseViewCount,
  increaseShareCount,
  recordSiteVisit,
  recordCardVisitor,
  recordReferral,
} = globalSlice.actions;

export default globalSlice.reducer;
