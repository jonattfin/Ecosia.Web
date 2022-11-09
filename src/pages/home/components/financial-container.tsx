import { Fragment } from "react";
import { useQuery } from "react-query";
import { fetchLastReport } from "../../../api";
import FinancialComponent from "./financial-component";

export default function Component({
  language,
}: {
  language: string | undefined;
}) {
  const {
    data: report,
    isLoading: reportIsLoading,
    error: reportError,
  } = useQuery(["fetchLastReport"], () => fetchLastReport());

  if (reportIsLoading) return <Fragment>Loading...</Fragment>;
  if (reportError || !report) return <Fragment>An error has occurred</Fragment>;

  return <FinancialComponent {...{ report, language }} />;
}
