import { useState, useMemo } from "react";
import { format, parse, startOfMonth, endOfMonth, subMonths, startOfQuarter, startOfYear, isWithinInterval } from "date-fns";
import { CalendarIcon, Globe, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { PaymentRequest } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BookingAnalyticsProps {
  payments: PaymentRequest[];
}

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

const parsePaymentDate = (dateString: string): Date => {
  return parse(dateString.split(" ")[0], "MM/dd/yyyy", new Date());
};

const ORIGIN_COLORS = [
  "hsl(220, 70%, 55%)", "hsl(350, 65%, 55%)", "hsl(160, 60%, 45%)",
  "hsl(45, 85%, 55%)", "hsl(280, 60%, 55%)", "hsl(15, 75%, 55%)",
  "hsl(190, 65%, 45%)", "hsl(100, 50%, 45%)", "hsl(30, 70%, 50%)", "hsl(260, 50%, 60%)",
];

const DEST_COLORS = ["hsl(25, 85%, 55%)", "hsl(200, 70%, 50%)", "hsl(140, 55%, 45%)", "hsl(320, 60%, 55%)"];

const CustomTooltip = ({ active, payload, label }: any) => {
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

export function BookingAnalytics({ payments }: BookingAnalyticsProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(subMonths(new Date(), 4)),
    to: new Date(),
  });

  const filteredPayments = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return payments;
    return payments.filter((payment) => {
      const paymentDate = parsePaymentDate(payment.createdAt);
      return isWithinInterval(paymentDate, { start: dateRange.from!, end: dateRange.to! });
    });
  }, [payments, dateRange]);

  const originData = useMemo(() => {
    const map = new Map<string, { bookings: number; revenue: number }>();
    filteredPayments.forEach(p => {
      const existing = map.get(p.travellerCountry) || { bookings: 0, revenue: 0 };
      map.set(p.travellerCountry, { bookings: existing.bookings + 1, revenue: existing.revenue + p.amount });
    });
    return Array.from(map.entries())
      .map(([country, data]) => ({ country, ...data }))
      .sort((a, b) => b.bookings - a.bookings);
  }, [filteredPayments]);

  const destData = useMemo(() => {
    const map = new Map<string, { bookings: number; revenue: number }>();
    filteredPayments.forEach(p => {
      const existing = map.get(p.country) || { bookings: 0, revenue: 0 };
      map.set(p.country, { bookings: existing.bookings + 1, revenue: existing.revenue + p.amount });
    });
    return Array.from(map.entries())
      .map(([country, data]) => ({ country, ...data }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [filteredPayments]);

  const setPreset = (preset: string) => {
    const now = new Date();
    switch (preset) {
      case "thisMonth":
        setDateRange({ from: startOfMonth(now), to: now });
        break;
      case "lastMonth": {
        const lastMonth = subMonths(now, 1);
        setDateRange({ from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) });
        break;
      }
      case "thisQuarter":
        setDateRange({ from: startOfQuarter(now), to: now });
        break;
      case "thisYear":
        setDateRange({ from: startOfYear(now), to: now });
        break;
    }
  };

  const totalBookings = filteredPayments.length;
  const totalRevenue = filteredPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Date Range Picker */}
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
        {/* Traveler Origin Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-primary" />
              Where Travellers Come From
            </CardTitle>
            <p className="text-sm text-muted-foreground">Bookings by traveller origin country</p>
          </CardHeader>
          <CardContent>
            {originData.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No data for selected range</p>
            ) : (
              <ResponsiveContainer width="100%" height={Math.max(200, originData.length * 45)}>
                <BarChart data={originData} layout="vertical" margin={{ left: 20, right: 20, top: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis type="category" dataKey="country" width={110} className="text-xs" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="bookings" name="bookings" radius={[0, 6, 6, 0]}>
                    {originData.map((_, i) => (
                      <Cell key={i} fill={ORIGIN_COLORS[i % ORIGIN_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
            {originData.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {originData.map((d, i) => (
                  <div key={d.country} className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: ORIGIN_COLORS[i % ORIGIN_COLORS.length] }} />
                    <span className="text-muted-foreground">{d.country}:</span>
                    <span className="font-medium">{d.bookings}</span>
                    <span className="text-muted-foreground">(${d.revenue.toFixed(0)})</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Destination Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              Destination Performance
            </CardTitle>
            <p className="text-sm text-muted-foreground">Revenue & bookings by tour country</p>
          </CardHeader>
          <CardContent>
            {destData.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No data for selected range</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={destData} margin={{ left: 0, right: 20, top: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="country" className="text-xs" />
                  <YAxis yAxisId="revenue" orientation="left" className="text-xs" tickFormatter={(v) => `$${v}`} />
                  <YAxis yAxisId="bookings" orientation="right" className="text-xs" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar yAxisId="revenue" dataKey="revenue" name="revenue" radius={[6, 6, 0, 0]}>
                    {destData.map((_, i) => (
                      <Cell key={i} fill={DEST_COLORS[i % DEST_COLORS.length]} />
                    ))}
                  </Bar>
                  <Bar yAxisId="bookings" dataKey="bookings" name="bookings" fill="hsl(220, 60%, 65%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
            {destData.length > 0 && (
              <div className="mt-4 space-y-2">
                {destData.map((d, i) => (
                  <div key={d.country} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: DEST_COLORS[i % DEST_COLORS.length] }} />
                      <span className="font-medium text-sm">{d.country}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">{d.bookings} bookings</span>
                      <span className="font-semibold">${d.revenue.toFixed(0)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
