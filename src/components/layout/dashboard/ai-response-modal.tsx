"use client";

import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { useWallets } from "@privy-io/react-auth";

interface AIResponseModalProps {
  open: boolean;
  onClose: () => void;
  data: {
    assets: string[];
    allocations: number[];
    analysis: { asset_name: string; reason: string }[];
  };
}

export function AIResponseModal({ open, onClose, data }: AIResponseModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { wallets } = useWallets();

  // Close modal if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open || !data.assets || !data.allocations || !data.analysis) return null;

  // 🔹 Function to call backend for automated purchase
  const handleAutomatePurchase = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // TODO Replace with backend API endpoint
      const response = await fetch("https://localhost:3050/api/v1/swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userWallet: wallets[0],
          assets: data.assets,
          allocations: data.allocations,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed: ${response.statusText}`);
      }

      setSuccess("Purchase automated successfully!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-[90%] max-w-2xl p-6"
      >
        <h2 className="text-2xl font-bold mb-4">AI Portfolio Recommendation</h2>

        <div className="rounded-md border min-w-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Allocation (%)</TableHead>
                <TableHead className="text-left">Reasoning</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.assets.map((asset, index) => {
                const analysisItem = data.analysis.find(
                  (item) => item.asset_name === asset
                );

                return (
                  <TableRow key={asset}>
                    <TableCell>{asset}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatNumber(data.allocations[index] * 100)}%
                    </TableCell>
                    <TableCell className="text-left">
                      {analysisItem
                        ? analysisItem.reason
                        : "No analysis available"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Status Messages */}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-4">{success}</p>}

        {/* Buttons */}
        <div className="flex justify-center mt-6 space-x-3">
          <Button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </Button>
          <Button
            onClick={handleAutomatePurchase}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Processing..." : "Automate Purchase"}
          </Button>
        </div>
      </div>
    </div>
  );
}
