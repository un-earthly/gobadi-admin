import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}
const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "ব্যবহারকারীর রেজিস্ট্রেশন",
    description:
      "পশু মালিক বা পরিষেবা প্রদানকারী হিসেবে নিবন্ধন করুন এবং সুবিধার অভিজ্ঞতা শুরু করুন।",
  },
  {
    icon: <MapIcon />,
    title: "ভেটেরিনারি বিভাগ নির্বাচন",
    description:
      "আপনার পশুর জন্য সঠিক ভেটেরিনারি বিভাগ নির্বাচন করুন এবং প্রয়োজনীয় তথ্য পূরণ করুন।",
  },
  {
    icon: <PlaneIcon />,
    title: "নির্ধারিত অ্যাপয়েন্টমেন্ট",
    description:
      "আপনার অ্যাপয়েন্টমেন্টের সময় নির্ধারণ করুন এবং নিশ্চিতকরণের জন্য অপেক্ষা করুন।",
  },
  {
    icon: <GiftIcon />,
    title: "ভিডিও/অডিও কল",
    description:
      "ডাক্তারের সঙ্গে ভিডিও বা অডিও কলের মাধ্যমে সরাসরি যোগাযোগ করুন।",
  },
];


export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        কিভাবে{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          কাজ করে{" "}
        </span>
        ধাপে ধাপে গাইড
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        গবাদি সেবা ব্যবহার করার জন্য ধাপে ধাপে নির্দেশিকা। আমাদের লক্ষ্য হল
        আপনার পোষ্যের যত্ন নেওয়া এবং সহজতম অভিজ্ঞতা প্রদান করা।
      </p>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
