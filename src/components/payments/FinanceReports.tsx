import { useState, useMemo } from "react";
import { format, parse, startOfMonth, endOfMonth, subMonths, startOfQuarter, startOfYear, endOfYear, isWithinInterval } from "date-fns";
import { CalendarIcon, Download, DollarSign, TrendingUp, Users, Clock } from "lucide-react";
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
  // Format: "MM/DD/YYYY HH:MM:SS"
  return parse(dateString.split(" ")[0], "MM/dd/yyyy", new Date());
};

export function FinanceReports({ payments }: FinanceReportsProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
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
    const paidAmount = filteredPayments.filter(p => p.isPaid).reduce((sum, p) => sum + p.amount, 0);

    return { totalRevenue, totalProfit, totalPaidOut, pendingAmount, paidAmount };
  }, [filteredPayments]);

  // Quick date presets
  const setPreset = (preset: string) => {
    const now = new Date();
    switch (preset) {
      case "thisMonth":
        setDateRange({ from: startOfMonth(now), to: now });
        break;
      case "lastMonth":
        const lastMonth = subMonths(now, 1);
        setDateRange({ from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) });
        break;
      case "thisQuarter":
        setDateRange({ from: startOfQuarter(now), to: now });
        break;
      case "thisYear":
        setDateRange({ from: startOfYear(now), to: now });
        break;
    }
    setSelectedIds(new Set());
  };

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedIds.size === filteredPayments.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredPayments.map(p => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // Download selected invoices
  const downloadSelected = () => {
    const selectedPayments = filteredPayments.filter(p => selectedIds.has(p.id));
    const paymentsWithInvoices = selectedPayments.filter(p => p.invoiceUrl);
    
    if (paymentsWithInvoices.length === 0) {
      toast({
        title: "No invoices available",
        description: "None of the selected payments have downloadable invoices.",
        variant: "destructive",
      });
      return;
    }

    paymentsWithInvoices.forEach(p => {
      window.open(p.invoiceUrl, "_blank");
    });

    toast({
      title: "Invoices opened",
      description: `Opened ${paymentsWithInvoices.length} invoice(s) in new tabs.`,
    });
  };

  const isAllSelected = filteredPayments.length > 0 && selectedIds.size === filteredPayments.length;

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
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[140px] justify-start text-left font-normal",
                      !dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : "From"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <span className="text-muted-foreground">–</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[140px] justify-start text-left font-normal",
                      !dateRange.to && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : "To"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setPreset("thisMonth")}>
                This Month
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setPreset("lastMonth")}>
                Last Month
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setPreset("thisQuarter")}>
                This Quarter
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setPreset("thisYear")}>
                This Year
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {filteredPayments.length} payments in range
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Paid to Guides
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalPaidOut.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              After commission deduction
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Simsem Profit
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${metrics.totalProfit.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Commission earned
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">${metrics.pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting payment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Selection Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Payments in Range</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="selectAll"
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
              />
              <label htmlFor="selectAll" className="text-sm font-medium cursor-pointer">
                Select All
              </label>
            </div>
            <Button 
              onClick={downloadSelected} 
              disabled={selectedIds.size === 0}
              variant="outline"
            >
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
                <TableHead>Country</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No payments found in the selected date range.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => {
                  const profit = payment.amount * payment.commissionRate;
                  return (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.has(payment.id)}
                          onCheckedChange={() => toggleSelect(payment.id)}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {payment.invoiceId}
                      </TableCell>
                      <TableCell>{payment.payerName}</TableCell>
                      <TableCell>${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{(payment.commissionRate * 100).toFixed(0)}%</TableCell>
                      <TableCell className="text-success font-medium">
                        ${profit.toFixed(2)}
                      </TableCell>
                      <TableCell>{payment.country}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(parsePaymentDate(payment.createdAt), "MMM dd, yyyy")}
                      </TableCell>
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
