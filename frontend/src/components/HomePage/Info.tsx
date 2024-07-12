export const Info = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="w-full shadow-md rounded-md py-10 text-center bg-white z-50 -mt-16">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary/90">
          Tuck into a takeaway today
        </h1>
        <p className="text-xl mt-5">Food is just a click away!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src="/landing.png" alt="landing" />
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Order takeaways even faster!
          </h1>
          <p className="text-base text-muted-foreground">
            Download the Everyday-Eats App for fater ordering and personalised
            recommendations
          </p>
          <img src="/appDownload.png" alt="" />
        </div>
      </div>
    </div>
  );
};
