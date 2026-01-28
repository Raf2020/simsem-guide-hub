import { PaymentRequest } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InvoicePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: PaymentRequest | null;
}

export function InvoicePreviewModal({
  open,
  onOpenChange,
  payment,
}: InvoicePreviewModalProps) {
  if (!payment) return null;

  // Format date from "01/26/2026 22:03:11" to "2026-01-26 22:03"
  const formatDate = (dateStr: string) => {
    const parts = dateStr.split(" ");
    if (parts.length >= 2) {
      const dateParts = parts[0].split("/");
      if (dateParts.length === 3) {
        return `${dateParts[2]}-${dateParts[0]}-${dateParts[1]} ${parts[1].slice(0, 5)}`;
      }
    }
    return dateStr;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center border-b pb-4">
          <DialogTitle className="text-2xl font-bold text-primary">
            Payment Invoice
          </DialogTitle>
          <p className="text-muted-foreground">
            Requested on: <span className="font-semibold text-foreground">{formatDate(payment.createdAt)}</span>
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Two Column Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Issued To */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">Issued To</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Company:</span> Simsme OU
                </p>
                <p>
                  <span className="font-semibold">Address:</span> Paju 2, Tartu 50603
                </p>
                <p>
                  <span className="font-semibold">Reg. Number:</span> 16518874
                </p>
                <p>
                  <span className="font-semibold">Email:</span> Hello@mysimsem.com
                </p>
              </div>
            </div>

            {/* Service Provider */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">Service Provider</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Name:</span> {payment.payerName}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {payment.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {payment.payerPhone}
                </p>
                <p>
                  <span className="font-semibold">Address:</span> {payment.country}
                </p>
                <p>
                  <span className="font-semibold">IBAN:</span> <span className="text-muted-foreground italic">Not provided</span>
                </p>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary">
              Invoice Items ({payment.invoiceId})
            </h3>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-primary-foreground font-semibold w-[150px]">
                      ID
                    </TableHead>
                    <TableHead className="text-primary-foreground font-semibold">
                      Description
                    </TableHead>
                    <TableHead className="text-primary-foreground font-semibold w-[120px]">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-sm">
                      {payment.experienceDetails.id}
                    </TableCell>
                    <TableCell>{payment.experienceDetails.name}</TableCell>
                    <TableCell>${payment.experienceDetails.cost.toFixed(1)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end">
              <p className="text-lg font-bold">
                Total: <span className="text-primary">${payment.amount.toFixed(0)}</span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
