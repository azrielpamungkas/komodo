import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "@/app/ui/buttons";
import { fetchVoters } from "@/app/lib/data";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
// import InvoiceStatus from "@/app/ui/invoices/status";
// import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
// import { fetchFilteredInvoices } from "@/app/lib/data";

export default async function InvoicesTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const voters = await fetchVoters();
  // console.log(result);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {voters?.map((voter) => (
              <div
                key={voter.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={voter.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${voter.name}'s profile picture`}
                      />
                      <p>{voter.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{voter.email}</p>
                  </div>
                  {/* <voterStatus status={invoice.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {/* {formatCurrency(invoice.amount)} */}
                    </p>
                    {/* <p>{formatDateToLocal(invoice.date)}</p> */}
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={voter.id} />
                    <DeleteInvoice id={voter.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  NIK
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>

                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {voters?.map((voter) => (
                <tr
                  key={voter.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{voter.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {voter.idCard}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className="btn">
                      {voter.isVerified ? "Verified" : " Not Verified"}
                      <div className="badge">
                        <CheckBadgeIcon className="bg-white text-white" />
                      </div>
                    </span>
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={voter.id} />
                      <DeleteInvoice id={voter.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
