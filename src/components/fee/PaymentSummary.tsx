import { useLocation } from "react-router";

export const PaymentSummary = () => {
  const selectedFee = useLocation();
  return (
    <div>
      {selectedFee.state}

      {/* <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S/N</TableHead>
          <TableHead>PAYMENT TYPE</TableHead>
          <TableHead className="text-right">AMOUNT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feeData.map((fee) => (
          <TableRow key={fee.type}>
            <TableCell className="text-left">{fee.no}</TableCell>
            <div className="flex gap-8 items-center">
              <Checkbox />
              <TableCell>{fee.type}</TableCell>
            </div>
            <TableCell>{fee.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter> */}
    </div>
  );
};
