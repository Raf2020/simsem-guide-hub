import { useState, useMemo, useRef } from "react";
import { format, parse, startOfMonth, endOfMonth, subMonths, startOfQuarter, startOfYear, isWithinInterval } from "date-fns";
import { CalendarIcon, Globe, MapPin, Search, X, ChevronDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Treemap } from "recharts";
import { PaymentRequest } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BookingAnalyticsProps {
  payments: PaymentRequest[];
}

type DateRange = { from: Date | undefined; to: Date | undefined };

const parsePaymentDate = (dateString: string): Date =>
  parse(dateString.split(" ")[0], "MM/dd/yyyy", new Date());

const ORIGIN_COLORS = [
  "hsl(220, 70%, 55%)", "hsl(350, 65%, 55%)", "hsl(160, 60%, 45%)",
  "hsl(45, 85%, 55%)", "hsl(280, 60%, 55%)", "hsl(15, 75%, 55%)",
  "hsl(190, 65%, 45%)", "hsl(100, 50%, 45%)", "hsl(30, 70%, 50%)",
  "hsl(260, 50%, 60%)", "hsl(0, 0%, 55%)",
];

const TREEMAP_COLORS = [
  "#e67e22", "#3498db", "#2ecc71", "#9b59b6", "#e74c3c",
  "#1abc9c", "#f39c12", "#2980b9", "#27ae60", "#8e44ad",
  "#c0392b", "#16a085", "#d35400", "#2c3e50", "#7f8c8d", "#34495e",
];

const TOP_N = 10;

// Custom treemap content renderer
const TreemapContent = (props: any) => {
  const { x, y, width, height, name, revenue, bookings, index } = props;
  if (width < 30 || height < 30) return null;

  const color = TREEMAP_COLORS[index % TREEMAP_COLORS.length];

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={color} stroke="hsl(0, 0%, 100%)" strokeWidth={2} rx={4} style={{ opacity: 0.9 }} />
      {width > 60 && height > 40 && (
        <>
          <text x={x + width / 2} y={y + height / 2 - 8} textAnchor="middle" fill="#fff" fontSize={width > 100 ? 14 : 11} fontWeight="600">
            {name}
          </text>
          <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize={width > 100 ? 12 : 10}>
            ${revenue?.toFixed(0)} · {bookings}
          </text>
        </>
      )}
    </g>
  );
};

const BarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background p-3 shadow-md">
      <p className="font-medium text-sm mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-xs text-muted-foreground">
          {entry.name === "bookings" ? "Bookings" : "Revenue"}: {entry.name === "revenue" ? `$${entry.value.toFixed(0)}` : entry.value}
        </p>
      ))}
    </div>
  );
};

const TreemapTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div className="rounded-lg border bg-background p-3 shadow-md">
      <p className="font-medium text-sm mb-1">{d.name}</p>
      <p className="text-xs text-muted-foreground">Revenue: ${d.revenue?.toFixed(0)}</p>
      <p className="text-xs text-muted-foreground">Bookings: {d.bookings}</p>
    </div>
  );
};

// Searchable country filter component
function CountryFilter({
  label,
  allCountries,
  selected,
  onToggle,
  onClear,
}: {
  label: string;
  allCountries: string[];
  selected: Set<string>;
  onToggle: (c: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = allCountries.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 h-8">
          <Search className="h-3.5 w-3.5" />
          {label}
          {selected.size > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">{selected.size}</Badge>
          )}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0 pointer-events-auto" align="start">
        <div className="p-2 border-b">
          <Input
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 text-xs"
          />
        </div>
        <div className="max-h-[200px] overflow-y-auto p-1">
          {filtered.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-3">No countries found</p>
          ) : (
            filtered.map(c => (
              <button
                key={c}
                onClick={() => onToggle(c)}
                className={cn(
                  "w-full text-left px-2 py-1.5 text-xs rounded-sm hover:bg-accent flex items-center justify-between",
                  selected.has(c) && "bg-accent"
                )}
              >
                {c}
                {selected.has(c) && <span className="text-primary font-bold">✓</span>}
              </button>
            ))
          )}
        </div>
        {selected.size > 0 && (
          <div className="p-2 border-t">
            <Button variant="ghost" size="sm" className="w-full h-7 text-xs" onClick={onClear}>
              <X className="h-3 w-3 mr-1" /> Clear filters
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export function BookingAnalytics({ payments }: BookingAnalyticsProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(subMonths(new Date(), 4)),
    to: new Date(),
  });
  const [originFilter, setOriginFilter] = useState<Set<string>>(new Set());
  const [destFilter, setDestFilter] = useState<Set<string>>(new Set());

  // Date-filtered payments
  const dateFiltered = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return payments;
    return payments.filter((p) => {
      const d = parsePaymentDate(p.createdAt);
      return isWithinInterval(d, { start: dateRange.from!, end: dateRange.to! });
    });
  }, [payments, dateRange]);

  // All unique countries for filter dropdowns
  const allOriginCountries = useMemo(() =>
    [...new Set(dateFiltered.map(p => p.travellerCountry))].sort(), [dateFiltered]);
  const allDestCountries = useMemo(() =>
    [...new Set(dateFiltered.map(p => p.country))].sort(), [dateFiltered]);

  // Apply country filters
  const filteredForOrigin = useMemo(() =>
    originFilter.size === 0 ? dateFiltered : dateFiltered.filter(p => originFilter.has(p.travellerCountry)),
    [dateFiltered, originFilter]);
  const filteredForDest = useMemo(() =>
    destFilter.size === 0 ? dateFiltered : dateFiltered.filter(p => destFilter.has(p.country)),
    [dateFiltered, destFilter]);

  // Origin data: top N + Others
  const originData = useMemo(() => {
    const map = new Map<string, { bookings: number; revenue: number }>();
    filteredForOrigin.forEach(p => {
      const e = map.get(p.travellerCountry) || { bookings: 0, revenue: 0 };
      map.set(p.travellerCountry, { bookings: e.bookings + 1, revenue: e.revenue + p.amount });
    });
    const sorted = Array.from(map.entries())
      .map(([country, data]) => ({ country, ...data }))
      .sort((a, b) => b.bookings - a.bookings);

    if (sorted.length <= TOP_N) return sorted;

    const top = sorted.slice(0, TOP_N);
    const others = sorted.slice(TOP_N).reduce(
      (acc, d) => ({ bookings: acc.bookings + d.bookings, revenue: acc.revenue + d.revenue }),
      { bookings: 0, revenue: 0 }
    );
    return [...top, { country: `Others (${sorted.length - TOP_N})`, ...others }];
  }, [filteredForOrigin]);

  // Destination data for treemap
  const destData = useMemo(() => {
    const map = new Map<string, { bookings: number; revenue: number }>();
    filteredForDest.forEach(p => {
      const e = map.get(p.country) || { bookings: 0, revenue: 0 };
      map.set(p.country, { bookings: e.bookings + 1, revenue: e.revenue + p.amount });
    });
    return Array.from(map.entries())
      .map(([name, data]) => ({ name, size: data.revenue, revenue: data.revenue, bookings: data.bookings }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [filteredForDest]);

  const setPreset = (preset: string) => {
    const now = new Date();
    switch (preset) {
      case "thisMonth": setDateRange({ from: startOfMonth(now), to: now }); break;
      case "lastMonth": { const lm = subMonths(now, 1); setDateRange({ from: startOfMonth(lm), to: endOfMonth(lm) }); break; }
      case "thisQuarter": setDateRange({ from: startOfQuarter(now), to: now }); break;
      case "thisYear": setDateRange({ from: startOfYear(now), to: now }); break;
    }
  };

  const toggleOrigin = (c: string) => {
    const next = new Set(originFilter);
    next.has(c) ? next.delete(c) : next.add(c);
    setOriginFilter(next);
  };
  const toggleDest = (c: string) => {
    const next = new Set(destFilter);
    next.has(c) ? next.delete(c) : next.add(c);
    setDestFilter(next);
  };

  const totalBookings = dateFiltered.length;
  const totalRevenue = dateFiltered.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Date Range + Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Date Range:</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[140px] justify-start text-left font-normal", !dateRange.from && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : "From"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dateRange.from} onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
              <span className="text-muted-foreground">–</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[140px] justify-start text-left font-normal", !dateRange.to && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : "To"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dateRange.to} onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setPreset("thisMonth")}>This Month</Button>
              <Button variant="secondary" size="sm" onClick={() => setPreset("lastMonth")}>Last Month</Button>
              <Button variant="secondary" size="sm" onClick={() => setPreset("thisQuarter")}>This Quarter</Button>
              <Button variant="secondary" size="sm" onClick={() => setPreset("thisYear")}>This Year</Button>
            </div>
          </div>
          <div className="flex gap-6 mt-4 text-sm">
            <span className="text-muted-foreground">Total: <span className="font-semibold text-foreground">{totalBookings} bookings</span></span>
            <span className="text-muted-foreground">Revenue: <span className="font-semibold text-foreground">${totalRevenue.toFixed(0)}</span></span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traveler Origin — Top 10 + Others */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5 text-primary" />
                  Where Travellers Come From
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Top {TOP_N} origin countries{originData.length > TOP_N ? " + others" : ""}</p>
              </div>
              <CountryFilter
                label="Filter Origins"
                allCountries={allOriginCountries}
                selected={originFilter}
                onToggle={toggleOrigin}
                onClear={() => setOriginFilter(new Set())}
              />
            </div>
          </CardHeader>
          <CardContent>
            {originData.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No data for selected range</p>
            ) : (
              <ResponsiveContainer width="100%" height={Math.max(200, originData.length * 40)}>
                <BarChart data={originData} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis type="category" dataKey="country" width={120} className="text-xs" tick={{ fontSize: 11 }} />
                  <Tooltip content={<BarTooltip />} />
                  <Bar dataKey="bookings" name="bookings" radius={[0, 6, 6, 0]}>
                    {originData.map((_, i) => (
                      <Cell key={i} fill={ORIGIN_COLORS[i % ORIGIN_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
            {originData.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {originData.map((d, i) => (
                  <div key={d.country} className="flex items-center gap-1.5 text-xs rounded-md border px-2 py-1">
                    <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: ORIGIN_COLORS[i % ORIGIN_COLORS.length] }} />
                    <span className="text-muted-foreground">{d.country}</span>
                    <span className="font-semibold">{d.bookings}</span>
                    <span className="text-muted-foreground">(${d.revenue.toFixed(0)})</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Destination Performance — Treemap */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  Destination Performance
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Revenue share by tour country</p>
              </div>
              <CountryFilter
                label="Filter Destinations"
                allCountries={allDestCountries}
                selected={destFilter}
                onToggle={toggleDest}
                onClear={() => setDestFilter(new Set())}
              />
            </div>
          </CardHeader>
          <CardContent>
            {destData.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No data for selected range</p>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <Treemap
                  data={destData}
                  dataKey="size"
                  aspectRatio={4 / 3}
                  stroke="none"
                  content={<TreemapContent />}
                >
                  <Tooltip content={<TreemapTooltip />} />
                </Treemap>
              </ResponsiveContainer>
            )}
            {destData.length > 0 && (
              <div className="mt-4 space-y-2">
                {destData.map((d, i) => {
                  const totalRev = destData.reduce((s, x) => s + x.revenue, 0);
                  const pct = totalRev > 0 ? ((d.revenue / totalRev) * 100).toFixed(1) : "0";
                  return (
                    <div key={d.name} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: TREEMAP_COLORS[i % TREEMAP_COLORS.length] }} />
                        <span className="font-medium text-sm">{d.name}</span>
                        <Badge variant="outline" className="text-xs">{pct}%</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">{d.bookings} bookings</span>
                        <span className="font-semibold">${d.revenue.toFixed(0)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
