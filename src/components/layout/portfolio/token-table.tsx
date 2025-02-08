"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/utils";

interface TokenTableProps {
  tokens: {
    symbol: string;
    name: string;
    balance: number;
    price: number;
    value: number;
    percentage: number;
  }[];
}

export function TokenTable({ tokens }: TokenTableProps) {
  return (
    <div className="mt-12 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Token Breakdown</h2>
      <div className="rounded-md border min-w-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Token Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">% of Portfolio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens
              .sort((a, b) => b.value - a.value)
              .map((token) => (
                <TableRow key={token.symbol}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{token.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {token.symbol}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    ${formatNumber(token.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(token.balance)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${formatNumber(token.value)}
                  </TableCell>
                  <TableCell className="text-right">
                    {token.percentage.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
