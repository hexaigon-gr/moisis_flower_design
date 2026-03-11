import { NextResponse } from "next/server";
import { GREEK_HOLIDAYS } from "@/lib/general/constants";
import recurringData from "@/lib/data/recurring-namedays.json";
import easterData from "@/lib/data/easter-namedays.json";

export interface TodayCelebrationResponse {
  names: string[];
  holiday: { el: string; en: string } | null;
  date: string;
}

// In-memory cache keyed by date string
let cache: { data: TodayCelebrationResponse; dateKey: string } | null = null;

/**
 * Calculate Orthodox Easter date using the Meeus Julian algorithm.
 * Returns a Date object for the given year.
 */
function getOrthodoxEaster(year: number): Date {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31); // 3 = March, 4 = April
  const day = ((d + e + 114) % 31) + 1;

  // This gives Julian calendar date — convert to Gregorian by adding 13 days
  const julian = new Date(year, month - 1, day);
  julian.setDate(julian.getDate() + 13);
  return julian;
}

/** Padded DD/MM key matching recurring-namedays.json */
function formatPaddedKey(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}`;
}

/** Unpadded D/M key matching GREEK_HOLIDAYS */
function formatUnpaddedKey(date: Date): string {
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

function getDaysFromEaster(today: Date): number {
  const easter = getOrthodoxEaster(today.getFullYear());
  const todayMs = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const easterMs = new Date(easter.getFullYear(), easter.getMonth(), easter.getDate()).getTime();
  return Math.round((todayMs - easterMs) / (1000 * 60 * 60 * 24));
}

function getTodayNames(paddedKey: string, daysDiff: number): string[] {
  const names: string[] = [];

  // 1. Recurring (fixed-date) namedays
  for (const entry of recurringData.data) {
    if (entry.date === paddedKey) {
      names.push(...entry.names);
    }
  }

  // 2. Easter-relative namedays
  for (const entry of easterData.special) {
    if (entry.toEaster === daysDiff && entry.variations.length > 0) {
      names.push(...entry.variations);
    }
  }

  return names;
}

function getHolidayForToday(unpaddedKey: string, daysDiff: number): { el: string; en: string } | null {
  // Check static holidays first (GREEK_HOLIDAYS uses D/M format)
  if (GREEK_HOLIDAYS[unpaddedKey]) {
    return GREEK_HOLIDAYS[unpaddedKey];
  }

  // Check Easter-relative holidays (entries without name variations are holidays/events)
  for (const entry of easterData.special) {
    if (entry.toEaster === daysDiff && entry.variations.length === 0) {
      return { el: entry.main, en: entry.main }; // Greek name only for movable feasts
    }
  }

  return null;
}

export async function GET() {
  const today = new Date();
  const dateKey = today.toISOString().split("T")[0];

  // Return cached if same day
  if (cache && cache.dateKey === dateKey) {
    return NextResponse.json(cache.data);
  }

  const paddedKey = formatPaddedKey(today);
  const unpaddedKey = formatUnpaddedKey(today);
  const daysDiff = getDaysFromEaster(today);

  const names = getTodayNames(paddedKey, daysDiff);
  const holiday = getHolidayForToday(unpaddedKey, daysDiff);

  const response: TodayCelebrationResponse = {
    names,
    holiday,
    date: dateKey,
  };

  cache = { data: response, dateKey };

  return NextResponse.json(response);
}
