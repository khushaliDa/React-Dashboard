import Card from "./common/card";
import { Users } from "lucide-react";
import useUsers from "../hooks/use-users";

const UserStatisticCards = () => {
  const { users } = useUsers();
  const stats = [
    {
      title: "Total Users",
      value: String(users.length),
      trend: `+${String(users.length)}`,
      isPositive: true,
      sub: "all time",
    },
    {
      title: "Active Users",
      value: String(users.filter((u) => u.status === "Active").length),
      trend: `+${String(users.filter((u) => u.status === "Active").length)}`,
      isPositive: true,
      sub: "this month",
    },
    {
      title: "Inactive Users",
      value: String(users.filter((u) => u.status === "Inactive").length),
      trend: `0%`,
      isPositive: true,
      sub: "no change",
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          title={stat.title}
          value={stat.value}
          trend={stat.trend}
          dir={stat.isPositive ? "up" : "down"}
          sub={stat.sub}
        />
      ))}
    </div>
  );
};

export default UserStatisticCards;
