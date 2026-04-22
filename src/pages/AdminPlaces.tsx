import { useMemo, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown, Plus, Pencil, Trash2, Download, Upload, RotateCcw } from "lucide-react";
import { usePlacesAdmin, slugify, type AdminPlace } from "@/hooks/usePlacesAdmin";
import { toast } from "sonner";

const PLACE_TYPES = [
  "country",
  "region",
  "city",
  "town",
  "village",
  "district",
  "site",
  "museum",
  "park",
  "natural",
  "oasis",
  "resort",
  "reef",
];

import type { PlaceType } from "@/data/placesData";

interface FormState {
  id: string;
  name: string;
  type: PlaceType;
  parent_id: string | null;
  country: string;
}

const EMPTY_FORM: FormState = { id: "", name: "", type: "site", parent_id: null, country: "EG" };

export default function AdminPlaces() {
  const {
    places,
    countries,
    addPlace,
    updatePlace,
    deletePlace,
    importJSON,
    exportJSON,
    resetToDefaults,
  } = usePlacesAdmin();

  const [activeCountry, setActiveCountry] = useState<string>("EG");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<AdminPlace | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [importMode, setImportMode] = useState<"replace" | "merge">("merge");

  const countryPlaces = useMemo(
    () => places.filter((p) => p.country === activeCountry),
    [places, activeCountry],
  );

  const childrenOf = useMemo(() => {
    const map = new Map<string | null, AdminPlace[]>();
    for (const p of countryPlaces) {
      const k = p.parent_id;
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(p);
    }
    return map;
  }, [countryPlaces]);

  const filteredRootIds = useMemo(() => {
    if (!search.trim()) return null;
    const term = search.toLowerCase();
    const matchedIds = new Set<string>();
    for (const p of countryPlaces) {
      if (p.name.toLowerCase().includes(term) || p.id.includes(term)) {
        // include this and all ancestors
        let cur: AdminPlace | undefined = p;
        while (cur) {
          matchedIds.add(cur.id);
          cur = cur.parent_id ? countryPlaces.find((x) => x.id === cur!.parent_id) : undefined;
        }
      }
    }
    return matchedIds;
  }, [search, countryPlaces]);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openAdd = (parentId: string | null = null) => {
    setForm({ ...EMPTY_FORM, parent_id: parentId, country: activeCountry });
    setEditing(null);
    setShowAdd(true);
  };

  const openEdit = (p: AdminPlace) => {
    setForm({ id: p.id, name: p.name, type: p.type, parent_id: p.parent_id, country: p.country });
    setEditing(p);
    setShowAdd(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (editing) {
      updatePlace(editing.id, { name: form.name, type: form.type, parent_id: form.parent_id, country: form.country });
      toast.success(`Updated ${form.name}`);
    } else {
      addPlace({ name: form.name, type: form.type, parent_id: form.parent_id, country: form.country, id: form.id });
      toast.success(`Added ${form.name}`);
    }
    setShowAdd(false);
  };

  const handleDelete = (p: AdminPlace) => {
    const descendants = countryPlaces.filter((x) => {
      let cur: AdminPlace | undefined = x;
      while (cur?.parent_id) {
        if (cur.parent_id === p.id) return true;
        cur = countryPlaces.find((y) => y.id === cur!.parent_id);
      }
      return false;
    });
    const msg = descendants.length
      ? `Delete "${p.name}" and ${descendants.length} child place(s)?`
      : `Delete "${p.name}"?`;
    if (confirm(msg)) {
      deletePlace(p.id);
      toast.success("Deleted");
    }
  };

  const handleExport = () => {
    const json = exportJSON();
    navigator.clipboard.writeText(json).then(
      () => toast.success("JSON copied to clipboard"),
      () => {
        // fallback: download
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "places.json";
        a.click();
        URL.revokeObjectURL(url);
      },
    );
  };

  const handleImport = () => {
    try {
      importJSON(importText, importMode);
      toast.success("Imported successfully");
      setShowImport(false);
      setImportText("");
    } catch (e: any) {
      toast.error(`Import failed: ${e.message}`);
    }
  };

  const renderNode = (place: AdminPlace, depth = 0): JSX.Element | null => {
    if (filteredRootIds && !filteredRootIds.has(place.id)) return null;
    const kids = childrenOf.get(place.id) || [];
    const isOpen = expanded.has(place.id) || !!filteredRootIds;
    return (
      <div key={place.id}>
        <div
          className="group flex items-center gap-2 py-2 px-3 rounded-md hover:bg-muted/50 border-l-2 border-transparent hover:border-primary/40"
          style={{ paddingLeft: `${depth * 20 + 12}px` }}
        >
          <button
            onClick={() => kids.length && toggle(place.id)}
            className="w-5 h-5 flex items-center justify-center text-muted-foreground"
            aria-label="toggle"
          >
            {kids.length ? (
              isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            ) : (
              <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            )}
          </button>
          <span className="font-medium text-foreground">{place.name}</span>
          <Badge variant="outline" className="text-xs">{place.type}</Badge>
          <span className="text-xs text-muted-foreground font-mono">{place.id}</span>
          <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="ghost" onClick={() => openAdd(place.id)} title="Add child">
              <Plus size={14} />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => openEdit(place)} title="Edit">
              <Pencil size={14} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleDelete(place)}
              title="Delete"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
        {isOpen && kids.map((c) => renderNode(c, depth + 1))}
      </div>
    );
  };

  const roots = childrenOf.get(null) || [];

  // Build flat parent options for the select (in-country)
  const parentOptions = useMemo(() => {
    const opts: { id: string; label: string }[] = [];
    const walk = (parentId: string | null, depth: number) => {
      const kids = childrenOf.get(parentId) || [];
      for (const k of kids) {
        if (editing && k.id === editing.id) continue; // avoid self
        opts.push({ id: k.id, label: `${"  ".repeat(depth)}${k.name}` });
        walk(k.id, depth + 1);
      }
    };
    walk(null, 0);
    return opts;
  }, [childrenOf, editing]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          <header className="mb-6">
            <h1 className="text-3xl font-serif font-semibold text-foreground">Places Admin</h1>
            <p className="text-muted-foreground mt-1">
              Manage the location hierarchy: Country → City → District → Site. Changes are saved to your browser
              (localStorage) — no database required.
            </p>
          </header>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-card rounded-lg border">
            <div className="flex items-center gap-2">
              <Label className="whitespace-nowrap">Country:</Label>
              <Select value={activeCountry} onValueChange={setActiveCountry}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Input
              placeholder="Search places…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[240px]"
            />

            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowImport(true)}>
                <Upload size={16} /> Import JSON
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download size={16} /> Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (confirm("Reset to bundled defaults? Local edits will be lost.")) {
                    resetToDefaults();
                    toast.success("Reset to defaults");
                  }
                }}
              >
                <RotateCcw size={16} /> Reset
              </Button>
              <Button onClick={() => openAdd(null)}>
                <Plus size={16} /> New Place
              </Button>
            </div>
          </div>

          {/* Tree */}
          <div className="bg-card rounded-lg border p-4">
            {roots.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No places yet for {countries.find((c) => c.code === activeCountry)?.name}. Click <strong>New Place</strong> to start.
              </div>
            ) : (
              <div className="space-y-0.5">{roots.map((r) => renderNode(r))}</div>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            {countryPlaces.length} place(s) in {countries.find((c) => c.code === activeCountry)?.name} · stored locally
            in your browser
          </p>
        </div>
      </main>

      {/* Add / Edit Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit place" : "New place"}</DialogTitle>
            <DialogDescription>
              {editing ? `Editing "${editing.name}"` : "Add a new location to the hierarchy."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, id: editing ? f.id : slugify(e.target.value) }))}
                placeholder="e.g. Khan El Khalili"
              />
            </div>
            <div>
              <Label>ID (slug)</Label>
              <Input
                value={form.id}
                onChange={(e) => setForm((f) => ({ ...f, id: slugify(e.target.value) }))}
                placeholder="auto-generated from name"
                disabled={!!editing}
              />
              {editing && <p className="text-xs text-muted-foreground mt-1">ID cannot be changed after creation</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v as PlaceType }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PLACE_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Country</Label>
                <Select value={form.country} onValueChange={(v) => setForm((f) => ({ ...f, country: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>{c.flag} {c.code}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Parent place</Label>
              <Select
                value={form.parent_id ?? "__root__"}
                onValueChange={(v) => setForm((f) => ({ ...f, parent_id: v === "__root__" ? null : v }))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="__root__">— Top level (no parent) —</SelectItem>
                  {parentOptions.map((o) => (
                    <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editing ? "Save changes" : "Add place"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={showImport} onOpenChange={setShowImport}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import places from JSON</DialogTitle>
            <DialogDescription>
              Paste an array of places. Each item needs <code>id</code>, <code>name</code>, <code>parent_id</code>, <code>country</code> and optionally <code>type</code>.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label>Mode:</Label>
              <Select value={importMode} onValueChange={(v: any) => setImportMode(v)}>
                <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="merge">Merge (upsert by id)</SelectItem>
                  <SelectItem value="replace">Replace all</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder={`[
  {"id":"cairo","name":"Cairo","parent_id":null,"country":"EG"},
  {"id":"khan-el-khalili","name":"Khan El Khalili","parent_id":"islamic-cairo","country":"EG"}
]`}
              className="font-mono text-xs min-h-[280px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImport(false)}>Cancel</Button>
            <Button onClick={handleImport} disabled={!importText.trim()}>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
