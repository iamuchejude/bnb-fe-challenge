import type { LoanApplication } from "./components/loan-application/schema";

export const BASE_ENDPOINT = "http://localhost:3000";

type TLoanApplication = Partial<LoanApplication>;

type LoanApplicationEntity = TLoanApplication & {
  uuid: string;
};

export async function getApplication(id: string) {
  const response = await fetch(`${BASE_ENDPOINT}/entities/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data as LoanApplicationEntity;
}

export async function createOrUpdateApplication(
  application: TLoanApplication,
  id?: string | null
) {
  if (!id) return createApplication(application);
  return updateApplication(id, application);
}

async function createApplication(application: TLoanApplication) {
  const response = await fetch(`${BASE_ENDPOINT}/entities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
  if (!response.ok) throw new Error("Failed to create application");
  const { entity } = (await response.json()) as {
    entity: LoanApplicationEntity;
  };
  return entity;
}

async function updateApplication(id: string, application: TLoanApplication) {
  const response = await fetch(`${BASE_ENDPOINT}/entities/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
  if (!response.ok) throw new Error("Failed to update application");
  const { entity } = (await response.json()) as {
    entity: LoanApplicationEntity;
  };
  return entity;
}
