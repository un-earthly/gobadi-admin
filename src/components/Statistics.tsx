export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: "5K+",
      description: "সন্তুষ্ট ব্যবহারকারী",
    },
    {
      quantity: "3K+",
      description: "নিবন্ধিত গ্রাহক",
    },
    {
      quantity: "150",
      description: "ডাউনলোড",
    },
    {
      quantity: "10",
      description: "সেবা",
    },
  ];


  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div
            key={description}
            className="space-y-2 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold ">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
