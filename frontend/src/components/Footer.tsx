export const Footer = () => {
  return (
    <div className="bg-primary">
      <div className="container flex flex-col md:flex-row justify-between gap-5 items-center py-10 text-white">
        <h1 className="text-3xl font-bold tracking-tight">Everyday-Eats</h1>
        <div className="flex gap-5">
          <p className="font-bold tracking-tight">Privacy Policy</p>
          <p className="font-bold tracking-tight">Terms Of Service</p>
        </div>
      </div>
    </div>
  );
};
