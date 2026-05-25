import { useState } from "react";
import { MOCK_FINANCIAL_RECORDS } from "@/data/mock/finance";

export const useFinance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month");
  const [selectedType, setSelectedType] = useState("all");

  const financialData = MOCK_FINANCIAL_RECORDS;

  const totalIncome = financialData
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = financialData
    .filter(item => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const netBalance = totalIncome - totalExpenses;
  const pendingAmount = financialData
    .filter(item => item.status === "pending")
    .reduce((sum, item) => sum + item.amount, 0);

  return {
    selectedPeriod,
    setSelectedPeriod,
    selectedType,
    setSelectedType,
    financialData,
    totalIncome,
    totalExpenses,
    netBalance,
    pendingAmount
  };
};
