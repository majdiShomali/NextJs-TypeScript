interface DashboardPageProps {
  searchParams: {
    userId: string;
  };
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const userId =searchParams.userId

  return (
    <div>
      <h1>Super Secret Dashboard {userId}</h1>

    </div>
  );
}
