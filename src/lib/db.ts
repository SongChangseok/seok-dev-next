// (실제로는 DB 연결 코드가 들어갑니다)
export async function getUserData() {
  // 1초 딜레이를 주어 서버 비동기 통신 흉내
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    name: "Warhammer Fan",
    faction: "Nurgle",
    role: "Frontend Developer",
    lastLogin: new Date().toISOString(),
  };
}
