interface UserCardProps {
  data: {
    name: string;
    faction: string;
    role: string;
  };
}

export default function UserCard({ data }: UserCardProps) {
  // console.log("이 로그는 브라우저가 아닌 서버 터미널에 찍힙니다");

  return (
    <div className="border p-6 rounded shadow-lg bg-white mt-4">
      <h2 className="text-xl font-bold">{data.name}</h2>
      <p className="text-gray-600">Faction: {data.faction}</p>
      <p className="text-gray-500 text-sm">{data.role}</p>
    </div>
  );
}
