import { checklistItems } from "./checklist-items";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="mx-auto w-5"
    >
      <polyline
        points="20 6 9 17 4 12"
        className="stroke-neutral"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="20 6 9 17 4 12"
        className="text-success stroke-current"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="mx-auto w-5"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        className="stroke-neutral"
        strokeWidth={8}
        strokeLinecap="round"
      />
      <path
        d="M6 6L18 18M18 6L6 18"
        className="text-error stroke-current"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChecklistMark({ value }: { value: boolean }) {
  return (
    <>
      {value ? <CheckIcon /> : <XIcon />}
      <span className="sr-only">{value ? "Yes" : "No"}</span>
    </>
  );
}

function ChecklistTable() {
  return (
    <div className="card card-lg bg-base-100 border-neutral mx-auto max-w-3xl border-4 shadow-lg">
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="font-display uppercase">
                <th scope="col">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="text-base-content text-center">
                  mnemIQ
                </th>
                <th scope="col" className="text-base-content text-center">
                  Anki
                </th>
              </tr>
            </thead>
            <tbody>
              {checklistItems.map(({ feature, mnemiq, anki }) => (
                <tr key={feature}>
                  <th
                    scope="row"
                    className="text-base-content fluid-sm font-normal"
                  >
                    {feature}
                  </th>
                  <td className="text-center">
                    <ChecklistMark value={mnemiq} />
                  </td>
                  <td className="text-center">
                    <ChecklistMark value={anki} />
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

export default ChecklistTable;
