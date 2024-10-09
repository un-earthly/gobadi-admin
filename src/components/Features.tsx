import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../assets/growth.png";
import image3 from "../assets/reflecting.png";
import image4 from "../assets/looking-ahead.png";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "মোবাইল ডিভাইসে অভিজ্ঞান", // Mobile Experience
    description:
      "গবাদি একটি মোবাইল অ্যাপ্লিকেশন, যা মোবাইল জন্য সম্পূর্ণরূপে ব্যবহার উপযোগী। আপনি যেকোনো ডিভাইস থেকে সহজেই গবাদি পশুর সেবা পেতে পারেন।",
    image: image4,
  },

  {
    title: "সহজ ও বোধগম্য ব্যবহারকারীর ইন্টারফেস", // Intuitive user interface
    description:
      "আমাদের অ্যাপ্লিকেশনটি এমনভাবে ডিজাইন করা হয়েছে যাতে যেকোনো ব্যবহারকারী সহজে পশু সেবা নিতে পারেন।",
    image: image3,
  },
  {
    title: "কৃত্রিম বুদ্ধিমত্তা দ্বারা চালিত পরামর্শ", // AI-Powered insights
    description:
      "আমাদের প্ল্যাটফর্মটি কৃত্রিম বুদ্ধিমত্তা দ্বারা চালিত, যা আপনার গবাদি পশুর যত্ন এবং চিকিৎসার জন্য সঠিক পরামর্শ প্রদান করে।",
    image: image,
  },
];


const featureList: string[] = [
  "ডার্ক/লাইট থিম", // Dark/Light theme
  "ব্যবহারকারীর মতামত", // Reviews
  "সেবা বৈশিষ্ট্য", // Service Features
  "মূল্য নির্ধারণ", // Pricing
  "সহজ ও পরিস্কার নকশা", // Minimalist
  "প্রদানকারী নির্ধারণ", // Select Providers
  "অ্যাপয়েন্টমেন্ট সময়সূচী", // Appointment Scheduling
  "গবাদি পশুর রোগ শনাক্তকরণ", // Cattle Disease Diagnosis
  "চিকিৎসা ও পরামর্শ", // Treatment and Consultation
  "স্বাস্থ্য প্রতিবেদন ও আপডেট", // Health Reports & Updates
];


export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        আমাদের{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          শ্রেষ্ঠ বৈশিষ্ট্যসমূহ
        </span>
      </h2>


      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
