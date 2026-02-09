
# Finance Reporting for Payments Page

## Overview
Add a dedicated "Reports" tab within the existing Payments page that allows admins to:
- Select a date range to filter payments
- View total revenue and profit for the selected period
- Select multiple invoices and download them as a batch

## Approach: Add as a New Tab
I recommend adding this as a **4th tab ("Reports")** on the existing Payments page rather than creating a separate page. This keeps all payment-related functionality organized together and follows the existing UI pattern.

## Features

### 1. Date Range Picker
- Two date picker inputs: "From" and "To"
- Quick presets: "This Month", "Last Month", "This Quarter", "This Year"
- Filter all payments within the selected date range

### 2. Financial Summary Cards
- **Total Revenue**: Sum of all payments in the date range
- **Total Paid Out**: Amount paid to guides (revenue minus commission)
- **Simsem Profit**: Commission earned (revenue × commission rate)
- **Pending**: Amount still awaiting payment

### 3. Invoice Selection & Download
- Table showing filtered payments with checkboxes
- "Select All" option
- "Download Selected Invoices" button (opens invoice PDFs in new tabs for those with URLs)
- Count of selected invoices displayed

### 4. Commission Handling
Since commission is dynamic from the backend, I'll:
- Add a `commissionRate` field to the `PaymentRequest` interface (as a decimal, e.g., 0.15 for 15%)
- Display the commission for each payment
- Calculate profit based on individual commission rates

---

## Technical Details

### Data Model Changes
Update `PaymentRequest` interface in `src/data/mockData.ts`:
```text
interface PaymentRequest {
  // ... existing fields
  commissionRate: number;  // e.g., 0.15 for 15%
}
```

### New Component
Create `src/components/payments/FinanceReports.tsx`:
- Date range state with `DateRange` type
- Filtered payments based on date range
- Selection state for checkboxes
- Financial calculations (revenue, paidOut, profit, pending)
- Download handler that opens invoice PDFs

### UI Layout
```text
+--------------------------------------------------+
|  [Reports] Tab                                    |
+--------------------------------------------------+
|  Date Range: [From Date] - [To Date]             |
|  Quick: [This Month] [Last Month] [Quarter] [Year]|
+--------------------------------------------------+
|  +--------+  +--------+  +--------+  +--------+  |
|  |Revenue |  |Paid Out|  |Profit  |  |Pending |  |
|  |$540.00 |  |$459.00 |  |$81.00  |  |$215.00 |  |
|  +--------+  +--------+  +--------+  +--------+  |
+--------------------------------------------------+
|  [x] Select All     [Download Selected (3)]      |
+--------------------------------------------------+
|  [x] INV123 | Hassan | $170 | 15% | Egypt | Paid |
|  [x] INV124 | Abanoub| $70  | 15% | Egypt | Paid |
|  [ ] INV125 | Firas  | $120 | 15% | Jordan| Pend |
+--------------------------------------------------+
```

### Files to Create/Modify
1. **Edit** `src/data/mockData.ts` - Add `commissionRate` to interface and mock data
2. **Create** `src/components/payments/FinanceReports.tsx` - Main reports component
3. **Edit** `src/pages/Payments.tsx` - Add "Reports" tab that renders `FinanceReports`
4. **Edit** `src/components/ui/calendar.tsx` - Add `pointer-events-auto` for dialog compatibility

### Date Parsing
The current date format in mock data is "MM/DD/YYYY HH:MM:SS". I'll parse these dates using `date-fns` to enable proper date range filtering.
