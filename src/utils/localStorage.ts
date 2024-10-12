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
