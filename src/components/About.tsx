import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt="Veterinary Service"
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  আমাদের{" "}
                </span>
                প্রতিষ্ঠান সম্পর্কে
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                গবাদি সেবা আপনার পোষ্যদের জন্য একটি নিবেদিত সেবা, যেখানে
                আমরা তাদের যত্ন নেওয়া এবং স্বাস্থ্যসম্মত জীবনযাত্রার জন্য
                সর্বাধিক প্রচেষ্টা করি। আমাদের দক্ষ দল আপনাকে সেরা সেবা
                প্রদানের জন্য প্রস্তুত রয়েছে।
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
