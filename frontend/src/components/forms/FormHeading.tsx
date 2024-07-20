type Props = {
  title: string;
  subTitle: string;
};

export const FormHeading = ({ title, subTitle }: Props) => {
  return (
    <>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground">{subTitle}</p>
    </>
  );
};
