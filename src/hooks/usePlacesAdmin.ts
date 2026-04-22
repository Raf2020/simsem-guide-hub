import { useEffect, useState, useCallback } from "react";
import { placesData, countriesAPI, type Place } from "@/data/placesData";

const STORAGE_KEY = "simsem.placesAdmin.v1";

export interface AdminPlace extends Place {}

function load(): AdminPlace[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AdminPlace[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  // Seed from bundled data
  return placesData.map((p) => ({ ...p }));
}

function persist(list: AdminPlace[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore quota
  }
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function usePlacesAdmin() {
  const [places, setPlaces] = useState<AdminPlace[]>([]);

  useEffect(() => {
    setPlaces(load());
  }, []);

  useEffect(() => {
    if (places.length > 0) persist(places);
  }, [places]);

  const addPlace = useCallback((p: Omit<AdminPlace, "id"> & { id?: string }) => {
    setPlaces((prev) => {
      const baseId = p.id?.trim() || slugify(p.name);
      let id = baseId;
      let n = 2;
      while (prev.some((x) => x.id === id)) {
        id = `${baseId}-${n++}`;
      }
      return [...prev, { ...p, id }];
    });
  }, []);

  const updatePlace = useCallback((id: string, patch: Partial<AdminPlace>) => {
    setPlaces((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const deletePlace = useCallback((id: string) => {
    setPlaces((prev) => {
      // collect descendants
      const toDelete = new Set<string>([id]);
      let changed = true;
      while (changed) {
        changed = false;
        for (const p of prev) {
          if (p.parent_id && toDelete.has(p.parent_id) && !toDelete.has(p.id)) {
            toDelete.add(p.id);
            changed = true;
          }
        }
      }
      return prev.filter((p) => !toDelete.has(p.id));
    });
  }, []);

  const importJSON = useCallback((json: string, mode: "replace" | "merge") => {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) throw new Error("JSON must be an array");
    const normalized: AdminPlace[] = parsed.map((p: any) => ({
      id: String(p.id || slugify(p.name || "")),
      name: String(p.name || ""),
      type: String(p.type || "site"),
      parent_id: p.parent_id ?? null,
      country: String(p.country || ""),
    }));
    setPlaces((prev) => {
      if (mode === "replace") return normalized;
      const map = new Map(prev.map((p) => [p.id, p]));
      for (const n of normalized) map.set(n.id, n);
      return Array.from(map.values());
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    setPlaces(placesData.map((p) => ({ ...p })));
  }, []);

  const exportJSON = useCallback(() => {
    return JSON.stringify(
      places.map(({ id, name, parent_id, country, type }) => ({ id, name, type, parent_id, country })),
      null,
      2,
    );
  }, [places]);

  return {
    places,
    countries: countriesAPI,
    addPlace,
    updatePlace,
    deletePlace,
    importJSON,
    exportJSON,
    resetToDefaults,
  };
}
