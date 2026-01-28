import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentsTable } from "@/components/payments/PaymentsTable";
import { paymentRequests as initialPayments, PaymentRequest } from "@/data/mockData";
import { Search, DollarSign, Clock, CheckCircle } from "lucide-react";

export default function Payments() {
  const [payments, setPayments] = useState<PaymentRequest[]>(initialPayments);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleUpdatePaymentStatus = (paymentId: string, isPaid: boolean) => {
    setPayments(prev =>
      prev.map(p =>
        p.id === paymentId
          ? { ...p, isPaid, paidAt: isPaid ? new Date().toLocaleString() : undefined }
          : p
      )
    );
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch =
      payment.payerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.experienceDetails.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "paid") return matchesSearch && payment.isPaid;
    if (activeTab === "pending") return matchesSearch && !payment.isPaid;
    return matchesSearch;
  });

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = payments.filter(p => p.isPaid).reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => !p.isPaid).reduce((sum, p) => sum + p.amount, 0);
  const paidCount = payments.filter(p => p.isPaid).length;
  const pendingCount = payments.filter(p => !p.isPaid).length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payments</h1>
            <p className="text-muted-foreground mt-1">
              Manage payment requests from local guides
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Payments
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {payments.length} requests
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Paid
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">${paidAmount.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {paidCount} payments completed
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
                <div className="text-2xl font-bold text-warning">${pendingAmount.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {pendingCount} awaiting payment
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, invoice ID, or experience..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payments Table with Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">
                All ({payments.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingCount})
              </TabsTrigger>
              <TabsTrigger value="paid">
                Paid ({paidCount})
              </TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-4">
              <PaymentsTable
                payments={filteredPayments}
                onUpdatePaymentStatus={handleUpdatePaymentStatus}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
