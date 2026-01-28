import { useState } from "react";
import { PaymentRequest } from "@/data/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ExternalLink, FileText, Phone, Mail, Eye } from "lucide-react";
import { toast } from "sonner";
import { InvoicePreviewModal } from "./InvoicePreviewModal";

interface PaymentsTableProps {
  payments: PaymentRequest[];
  onUpdatePaymentStatus: (paymentId: string, isPaid: boolean) => void;
}

export function PaymentsTable({ payments, onUpdatePaymentStatus }: PaymentsTableProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentRequest | null>(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  const handleTogglePaid = (payment: PaymentRequest) => {
    const newStatus = !payment.isPaid;
    onUpdatePaymentStatus(payment.id, newStatus);
    toast.success(
      newStatus 
        ? `Payment ${payment.invoiceId} marked as paid` 
        : `Payment ${payment.invoiceId} marked as unpaid`
    );
  };

  const handleViewInvoice = (payment: PaymentRequest) => {
    setSelectedPayment(payment);
    setInvoiceModalOpen(true);
  };

  return (
    <>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Invoice</TableHead>
              <TableHead className="font-semibold">Guide</TableHead>
              <TableHead className="font-semibold">Experience</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Country</TableHead>
              <TableHead className="font-semibold">Created</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No payment requests found
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-mono text-xs text-muted-foreground">{payment.id}</p>
                      <p className="font-medium text-sm">{payment.invoiceId}</p>
                      {payment.invoiceUrl && (
                        <a
                          href={payment.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <FileText size={12} />
                          PDF
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{payment.payerName}</p>
                      <p className="text-xs text-muted-foreground font-mono">{payment.payerId}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail size={10} />
                        <span className="truncate max-w-[150px]">{payment.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone size={10} />
                        {payment.payerPhone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <p className="font-medium text-sm truncate" title={payment.experienceDetails.name}>
                        {payment.experienceDetails.name}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {payment.experienceDetails.id}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-lg">${payment.amount.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-muted">
                      {payment.country}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <p>{payment.createdAt}</p>
                      {payment.paidAt && (
                        <p className="text-xs text-success">
                          Paid: {payment.paidAt}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        payment.isPaid
                          ? "bg-success text-success-foreground"
                          : "bg-warning text-warning-foreground"
                      }
                    >
                      {payment.isPaid ? "PAID" : "PENDING"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewInvoice(payment)}
                        className="gap-1"
                      >
                        <Eye size={14} />
                        View Invoice
                      </Button>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={payment.isPaid}
                          onCheckedChange={() => handleTogglePaid(payment)}
                        />
                        <span className="text-xs text-muted-foreground">
                          {payment.isPaid ? "Paid" : "Mark Paid"}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <InvoicePreviewModal
        open={invoiceModalOpen}
        onOpenChange={setInvoiceModalOpen}
        payment={selectedPayment}
      />
    </>
  );
}
