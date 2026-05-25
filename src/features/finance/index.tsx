import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useFinance } from "./useFinance";
import { FinanceStats } from "./components/FinanceStats";
import { FinanceTransactions } from "./components/FinanceTransactions";

const Finance = () => {
  const {
    selectedPeriod,
    setSelectedPeriod,
    selectedType,
    setSelectedType,
    financialData,
    totalIncome,
    totalExpenses,
    netBalance,
    pendingAmount
  } = useFinance();

  return (
    <DashboardLayout>
      <DashboardHeader title="Finance Management" description="Track income, expenses, and financial reports" />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <FinanceStats 
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          netBalance={netBalance}
          pendingAmount={pendingAmount}
        />
        <FinanceTransactions 
          transactions={financialData}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>
    </DashboardLayout>
  );
};

export default Finance;
