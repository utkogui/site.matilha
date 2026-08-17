"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createConsent,
  openCookiePreferences,
  readConsent,
  writeConsent,
  type ConsentState,
} from "@/lib/consent/storage";

type ConsentContextValue = {
  hydrated: boolean;
  consent: ConsentState | null;
  preferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: { analytics: boolean; marketing: boolean }) => void;
  allowsAnalytics: boolean;
  allowsMarketing: boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setHydrated(true);

    const onOpen = () => setPreferencesOpen(true);
    window.addEventListener("matilha:open-cookie-preferences", onOpen);
    return () => window.removeEventListener("matilha:open-cookie-preferences", onOpen);
  }, []);

  const persist = useCallback((next: ConsentState) => {
    writeConsent(next);
    setConsent(next);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist(createConsent({ analytics: true, marketing: true }));
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist(createConsent({ analytics: false, marketing: false }));
  }, [persist]);

  const savePreferences = useCallback(
    (prefs: { analytics: boolean; marketing: boolean }) => {
      persist(createConsent(prefs));
    },
    [persist],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      hydrated,
      consent,
      preferencesOpen,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      acceptAll,
      rejectNonEssential,
      savePreferences,
      allowsAnalytics: Boolean(consent?.analytics),
      allowsMarketing: Boolean(consent?.marketing),
    }),
    [
      hydrated,
      consent,
      preferencesOpen,
      acceptAll,
      rejectNonEssential,
      savePreferences,
    ],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}

export { openCookiePreferences };
