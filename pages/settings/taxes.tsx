import { SettingsLayout } from "@/components/SettingsLayout";
import { useTaxes } from "@/data/taxes";
import { NextPage } from "next";
import { ComponentProps } from "pages/_app";

const Taxes: NextPage<ComponentProps>  = ({setShowAddTaxForm}) => {
  const { data: taxes } = useTaxes();

  return (
    <SettingsLayout label="Taxes" buttonText="Add Tax" onButtonClick={() => setShowAddTaxForm(true)}>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Value
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {taxes?.map((tax, taxIndex) => (
                    <tr
                      key={tax.id}
                      className={taxIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {tax.name}

                        <p className="text-gray-500">{tax.description}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {tax.type === "percentage"
                          ? `${tax.value}%`
                          : `${tax.value}`}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>

                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default Taxes;
