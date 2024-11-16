import { v4 as uuidv4 } from "uuid";

// UUID를 로컬 스토리지에서 가져오거나 생성하여 반환하는 함수
export function getOrCreateUuid(): string {
  let uuid = localStorage.getItem("tempUserId");

  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem("tempUserId", uuid);
  }

  return uuid;
}

export function setCommunityIdAfterLogin(id: number) {
  localStorage.setItem("communityDetailId", id.toString());
}

export function getCommunityIdAfterLogin(): number | undefined {
  const id = localStorage.getItem("communityDetailId");
  return id ? parseInt(id) : undefined;
}

export function setAdviceReportData(data: string) {
  localStorage.setItem("adviceReport", data);
}

export function getAdviceReportData(): string {
  return localStorage.getItem("adviceReport") || "";
}

export function setLoginRedirectPath(path: string | undefined) {
  localStorage.setItem("loginRedirectPath", path || "/");
}

export function getLoginRedirectPath(): string {
  return localStorage.getItem("loginRedirectPath") || "/";
}
