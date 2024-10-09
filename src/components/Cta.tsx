import { Button } from "./ui/button";

export const Cta = () => {
  return (
    <section
      id="cta"
      className="bg-muted/50 py-16 my-24 sm:my-32"
    >
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            আপনার সকল
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {" "}
              আইডিয়া ও ধারণা{" "}
            </span>
            একটিমাত্র ইন্টারফেসে
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            গবাদি পশুর সেবা অ্যাপের মাধ্যমে আপনার পোষ্যের সেরা যত্ন নিন।
            এখনই আমাদের সাথে যোগ দিন এবং আপনার পোষ্যের স্বাস্থ্য
            নিশ্চিত করুন!
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button className="w-full md:mr-4 md:w-auto" >
            <a href="#features">
              বৈশিষ্ট্য দেখুন
            </a>
          </Button>
          <Button
            variant="outline"
            className="w-full md:w-auto"
            // onClick={() => window.open("https://link-to-your-app.com", "_blank")}
          >
            অ্যাপ ডাউনলোড করুন
          </Button>
        </div>
      </div>
    </section>
  );
};
