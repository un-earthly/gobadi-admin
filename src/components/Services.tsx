import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "../assets/cube-leg.png";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}
const serviceList: ServiceProps[] = [
  {
    title: "পশু যত্ন",
    description:
      "গবাদি পশুর জন্য বিশেষ যত্ন সেবা, যা আপনার পোষ্যের স্বাস্থ্য এবং সুরক্ষার জন্য ডিজাইন করা হয়েছে।",
    icon: <ChartIcon />, // Consider updating the icon to reflect the context
  },
  {
    title: "অ্যাপয়েন্টমেন্ট ব্যবস্থাপনা",
    description:
      "আপনার পশু ডাক্তারদের সাথে অ্যাপয়েন্টমেন্ট সেটআপ এবং পরিচালনা করুন, সুবিধাজনক সময়ে সেবা নিন।",
    icon: <WalletIcon />, // Consider updating the icon to reflect the context
  },
  {
    title: "ভিডিও কল সেবা",
    description:
      "ডাক্তারদের সাথে সরাসরি ভিডিও কলের মাধ্যমে পোষ্যের সমস্যা নিয়ে আলোচনা করুন।",
    icon: <MagnifierIcon />, // Consider updating the icon to reflect the context
  },
];

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              গ্রাহক-কেন্দ্রিক{" "}
            </span>
            সেবা
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            আমাদের লক্ষ্য হল আপনার পোষ্যের যত্ন নেওয়া। গবাদি সেবা প্রদান করে
            আমরা আপনার বিশ্বাস ও সন্তুষ্টি অর্জনের জন্য প্রতিশ্রুতিবদ্ধ।
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={cubeLeg}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="About services"
        />
      </div>
    </section>
  );
};
