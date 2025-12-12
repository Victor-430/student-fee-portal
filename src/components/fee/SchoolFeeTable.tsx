import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { useFee } from "@/hooks/useFee";

export const SchoolFeeTable = () => {
  const {
    selectedFee,
    setSelectedFee,
    setTotalFee,
    setAmountPaid,
    amountPaid,
    totalFee,
    setFeeBalance,
  } = useFee();

  const feeData: FEEDATA[] = [
    {
      type: "School charges",
      amount: 150000,
      no: 1,
    },
    {
      type: "Hostel fee",
      amount: 50000,
      no: 2,
    },
    {
      type: "Examination fee",
      amount: 10000,
      no: 3,
    },
    {
      type: "Practical",
      amount: 30000,
      no: 4,
    },
    {
      type: "PTA",
      amount: 2000,
      no: 5,
    },
    {
      type: "Science Lab",
      amount: 4000,
      no: 6,
    },
    {
      type: "Sports",
      amount: 5000,
      no: 7,
    },
    {
      type: "Interhouse sport",
      amount: 10000,
      no: 8,
    },
    {
      type: "Result printing",
      amount: 5000,
      no: 9,
    },
    {
      type: "ID card",
      amount: 5000,
      no: 10,
    },
    {
      type: "Music",
      amount: 5000,
      no: 11,
    },
    {
      type: "Lab Manual",
      amount: 1000,
      no: 12,
    },
  ];

  const isItemChecked = (feeNo: number) => {
    return selectedFee.some((fee) => fee.no === feeNo);
  };

  const handleCheckedItems = (fee: FEEDATA, isChecked: boolean) => {
    if (isChecked) {
      setSelectedFee((prev: FEEDATA[]) => {
        if (prev.some((f) => f.no === fee.no)) return prev;
        return [...prev, fee];
      });
    } else {
      setSelectedFee((prev: FEEDATA[]) =>
        prev.filter((item) => item.no !== fee.no)
      );
    }
  };

  const handleTotalFee = () => {
    const totalFee = feeData.reduce((sum, fee) => sum + fee.amount, 0);
    setTotalFee(totalFee);
  };

  const handleAmountPaid = () => {
    const totalAmount = selectedFee.reduce((sum, fee) => sum + fee.amount, 0);

    setAmountPaid(totalAmount);
  };

  const handleFeeBalance = () => {
    const feeBalance = totalFee - amountPaid;
    setFeeBalance(feeBalance);
  };

  const totalAmount = selectedFee.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S/N </TableHead>
          <TableHead>PAYMENT TYPE</TableHead>
          <TableHead className="text-right">AMOUNT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feeData.map((fee) => (
          <TableRow key={fee.type}>
            <TableCell className="text-left">{fee.no}</TableCell>
            <div className="flex gap-8 items-center">
              <Checkbox
                checked={isItemChecked(fee.no)}
                onCheckedChange={(checked) =>
                  handleCheckedItems(fee, checked as boolean)
                }
              />
              <TableCell>{fee.type}</TableCell>
            </div>
            <TableCell className="text-right">
              {fee.amount.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableCell colSpan={2}>Total</TableCell>
        <TableCell className="text-right">
          &#8358;{totalAmount.toLocaleString()}
        </TableCell>
      </TableFooter>
    </Table>
  );
};
