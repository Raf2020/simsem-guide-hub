import { useState, useMemo } from "react";
import { format, parse, startOfMonth, endOfMonth, subMonths, startOfQuarter, startOfYear, isWithinInterval } from "date-fns";
import { CalendarIcon, Download, DollarSign, TrendingUp, Users, Clock, Globe, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import { PaymentRequest } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface FinanceReportsProps {
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
  "hsl(190, 65%, 45%)", "hsl(100, 50%, 45%)",
];

const DEST_COLORS = ["hsl(25, 85%, 55%)", "hsl(200, 70%, 50%)", "hsl(140, 55%, 45%)", "hsl(320, 60%, 55%)"];

export function FinanceReports({ payments }: FinanceReportsProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(subMonths(new Date(), 4)),
    to: new Date(),
  });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Filter payments by date range
  const filteredPayments = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return payments;
    return payments.filter((payment) => {
      const paymentDate = parsePaymentDate(payment.createdAt);
      return isWithinInterval(paymentDate, { start: dateRange.from!, end: dateRange.to! });
    });
  }, [payments, dateRange]);

  // Calculate financial metrics
  const metrics = useMemo(() => {
    const totalRevenue = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalProfit = filteredPayments.reduce((sum, p) => sum + (p.amount * p.commissionRate), 0);
    const totalPaidOut = totalRevenue - totalProfit;
    const pendingAmount = filteredPayments.filter(p => !p.isPaid).reduce((sum, p) => sum + p.amount, 0);
    return { totalRevenue, totalProfit, totalPaidOut, pendingAmount };
  }, [filteredPayments]);

  // Traveler origin data
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

  // Destination performance data
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

  // Quick date presets
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
    setSelectedIds(new Set());
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredPayments.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredPayments.map(p => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const downloadSelected = () => {
    const selectedPayments = filteredPayments.filter(p => selectedIds.has(p.id));
    const paymentsWithInvoices = selectedPayments.filter(p => p.invoiceUrl);
    if (paymentsWithInvoices.length === 0) {
      toast({ title: "No invoices available", description: "None of the selected payments have downloadable invoices.", variant: "destructive" });
      return;
    }
    paymentsWithInvoices.forEach(p => window.open(p.invoiceUrl, "_blank"));
    toast({ title: "Invoices opened", description: `Opened ${paymentsWithInvoices.length} invoice(s) in new tabs.` });
  };

  const isAllSelected = filteredPayments.length > 0 && selectedIds.size === filteredPayments.length;

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
        </CardContent>
      </Card>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{filteredPayments.length} payments in range</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid to Guides</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalPaidOut.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">After commission deduction</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Simsem Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${metrics.totalProfit.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Commission earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${metrics.pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
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
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={originData} layout="vertical" margin={{ left: 20, right: 20, top: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis type="category" dataKey="country" width={100} className="text-xs" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="bookings" name="bookings" radius={[0, 6, 6, 0]}>
                    {originData.map((_, i) => (
                      <Cell key={i} fill={ORIGIN_COLORS[i % ORIGIN_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
            {/* Volume summary */}
            {originData.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {originData.map((d, i) => (
                  <div key={d.country} className="flex items-center gap-2 text-xs">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: ORIGIN_COLORS[i % ORIGIN_COLORS.length] }} />
                    <span className="text-muted-foreground">{d.country}:</span>
                    <span className="font-medium">{d.bookings} bookings</span>
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
            {/* Performance summary */}
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

      {/* Invoice Selection Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Payments in Range</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="selectAll" checked={isAllSelected} onCheckedChange={toggleSelectAll} />
              <label htmlFor="selectAll" className="text-sm font-medium cursor-pointer">Select All</label>
            </div>
            <Button onClick={downloadSelected} disabled={selectedIds.size === 0} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Selected ({selectedIds.size})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Guide</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Traveller</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                    No payments found in the selected date range.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => {
                  const profit = payment.amount * payment.commissionRate;
                  return (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <Checkbox checked={selectedIds.has(payment.id)} onCheckedChange={() => toggleSelect(payment.id)} />
                      </TableCell>
                      <TableCell className="font-mono text-sm">{payment.invoiceId}</TableCell>
                      <TableCell>{payment.payerName}</TableCell>
                      <TableCell>${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{(payment.commissionRate * 100).toFixed(0)}%</TableCell>
                      <TableCell className="text-success font-medium">${profit.toFixed(2)}</TableCell>
                      <TableCell>{payment.travellerCountry}</TableCell>
                      <TableCell>{payment.country}</TableCell>
                      <TableCell className="text-muted-foreground">{format(parsePaymentDate(payment.createdAt), "MMM dd, yyyy")}</TableCell>
                      <TableCell>
                        <Badge variant={payment.isPaid ? "default" : "secondary"}>
                          {payment.isPaid ? "Paid" : "Pending"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
