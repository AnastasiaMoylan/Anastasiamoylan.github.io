import DiagramPanel from "../primitives/DiagramPanel";

/* ------------------------------------------------------------------ *
 * UNCONFIRMED — edit this block only.
 *
 * Which role holds which permission has NOT been verified. Everything the
 * table renders comes from `permissions` below, so correcting a cell means
 * adding or removing a capability id from one array.
 * ------------------------------------------------------------------ */
const capabilities = [
  { id: "sandbox", label: "Sandbox experiment" },
  { id: "build", label: "Build workflow" },
  { id: "promote", label: "Promote to production" },
  { id: "approve", label: "Approve consequential action" },
  { id: "configure", label: "Configure governance" },
  { id: "view", label: "View and audit" },
] as const;

type CapabilityId = (typeof capabilities)[number]["id"];

const permissions: { role: string; allowed: CapabilityId[] }[] = [
  { role: "Accountant", allowed: ["sandbox", "build", "view"] },
  { role: "Analyst", allowed: ["sandbox", "build", "view"] },
  { role: "Manager / Controller", allowed: ["sandbox", "build", "promote", "approve", "view"] },
  { role: "Finance leader", allowed: ["approve", "view"] },
  { role: "Admin", allowed: ["sandbox", "build", "promote", "configure", "view"] },
  { role: "Viewer", allowed: ["view"] },
];
/* ------------------------------------------------------------------ */

export default function RoleMatrix() {
  return (
    <DiagramPanel
      heading="Six roles, one governed surface"
      subheading="What each role can do, and where accountability sits."
      quote="Ownership and review are different jobs, so they are different permissions."
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Finance Cloud role and permission matrix. Roles are rows, capabilities are columns.
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="py-3 pr-4 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent"
              >
                Role
              </th>
              {capabilities.map((c) => (
                <th
                  key={c.id}
                  scope="col"
                  className="px-3 py-3 align-bottom text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent"
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map(({ role, allowed }) => (
              <tr key={role} className="border-b border-border last:border-0">
                <th
                  scope="row"
                  className="border-l-2 border-accent py-3.5 pl-3 pr-4 text-[0.875rem] font-bold text-foreground"
                >
                  {role}
                </th>
                {capabilities.map((c) => {
                  const ok = allowed.includes(c.id);
                  return (
                    <td key={c.id} className="px-3 py-3.5 text-center">
                      <span
                        className={
                          ok
                            ? "inline-block h-2 w-2 rounded-full bg-accent"
                            : "inline-block text-muted-foreground"
                        }
                        aria-hidden="true"
                      >
                        {ok ? "" : "—"}
                      </span>
                      <span className="sr-only">{ok ? "Permitted" : "Not permitted"}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DiagramPanel>
  );
}
