import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { TransactionsColumns } from "./_columns/index";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import TimeSelect from "../(home)/_components/time-select";
import ClearFilterButtons from "./_components/clear-filters-button";

interface TransactionsProps {
  searchParams: {
    month?: string;
    year?: string;
  };
}

const TransactionsPage = async ({
  searchParams: { month, year },
}: TransactionsProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  let transactions;

  if (month && year) {
    transactions = await db.transaction.findMany({
      where: {
        userId,
        date: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${year}-${month}-31`),
        },
      },
      orderBy: {
        date: "desc",
      },
    });
  } else {
    transactions = await db.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: "desc",
      },
    });
  }

  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>

          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>
        <div className="flex justify-start">
          <TimeSelect page="transactions" />
          <div className="ml-2">
            <ClearFilterButtons />
          </div>
        </div>

        <ScrollArea className="h-full">
          <DataTable
            columns={TransactionsColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
