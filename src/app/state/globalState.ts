import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as UAParserLib from "ua-parser-js";
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
}

const initialState: GlobalState = {
  cardCount: [],
  siteVisitors: {
    totalVisits: 0,
    uniqueVisitors: [],
  },
};

const getVisitorFingerprint = (): string => {
  if (typeof window === "undefined") return "server";

  const parser = new UAParser();
  const result = parser.getResult();

  return [
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
  },
});

export const {
  increaseViewCount,
  increaseShareCount,
  recordSiteVisit,
  recordCardVisitor,
} = globalSlice.actions;

export default globalSlice.reducer;
