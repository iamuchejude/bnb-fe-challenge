import { getApplication } from "~/data";
import type { Route } from "../+types/root";
import { useLoaderData } from "react-router";
import { LoanApplication } from "../components/loan-application";

export function meta() {
  return [{ title: "BnB" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const applicationId = searchParams.get("id");
  if (!applicationId) return {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { uuid, ...data } = await getApplication(applicationId);
  return data;
}

export default function Home() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="pt-10">
      <LoanApplication values={loaderData} />
    </div>
  );
}
