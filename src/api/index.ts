import {Project, ProjectMetadata, ReportData, ReportMetadata, ResultQuery, SearchMetadata} from "./interfaces";

const environment = getEnvironment();

export const httpBaseUrl = environment.httpBaseUrl;
export const wssBaseUrl = environment.wssBaseUrl;

export const fetchProjects = async (): Promise<ProjectMetadata> => {
  const res = await fetch(`${httpBaseUrl}/projects`);
  return res.json();
};

export const fetchProjectById = async (
  projectId: string | string[] | undefined
): Promise<Project> => {
  const res = await fetch(`${httpBaseUrl}/projects/${projectId}`);
  return res.json();
};

export const fetchTags = async () => {
  const res = await fetch(`${httpBaseUrl}/tags`);
  return res.json();
};

export const fetchReports = async (size: number = 12): Promise<ReportMetadata> => {
  const res = await fetch(`${httpBaseUrl}/reports/?size=${size}`);
  return res.json();
};

export const fetchReportById = async (
  reportId: string | string[] | undefined
): Promise<ReportData> => {
  const res = await fetch(`${httpBaseUrl}/reports/${reportId}`);
  return res.json();
};

export const fetchLastReport = async (): Promise<ReportData> => {
  const res = await fetch(`${httpBaseUrl}/reports/last`);
  return res.json();
};


export const searchByQueryAsync = async (
  query: string | undefined,
  size: number = 5,
  page: number = 1
): Promise<SearchMetadata> => {
  const res = await fetch(`${httpBaseUrl}/search?text=${query}&page=${page}&size=${size}`);
  return res.json();
};

function getEnvironment(isDevelopment: boolean = true) {
  return isDevelopment ? getDevEnvironment() : getProdEnvironment();

  function getDevEnvironment() {
    const baseUrl = "localhost:7131/api/v1";

    return {
      baseUrl,
      httpBaseUrl: `https://${baseUrl}`,
      wssBaseUrl: `ws://${baseUrl}`,
    };
  }

  function getProdEnvironment() {
    const baseUrl = "ecosia-clone.herokuapp.com";

    return {
      baseUrl,
      httpBaseUrl: `https://${baseUrl}`,
      wssBaseUrl: `wss://${baseUrl}`,
    };
  }
}
