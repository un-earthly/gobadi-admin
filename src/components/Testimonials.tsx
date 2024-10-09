import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}
const testimonials: TestimonialProps[] = [
  {
    image: "https://randomuser.me/api/portraits/men/93.jpg",
    name: "মাহমুদ হাসান",
    userName: "@mahmud_hasan",
    comment: "গবাদি পশু সেবার জন্য এই অ্যাপটি চমৎকার! চিকিৎসকরা খুবই সহযোগিতা করছেন।",
  },
  {
    image: "https://randomuser.me/api/portraits/women/93.jpg",
    name: "ফাতিমা রহমান",
    userName: "@fatima_rahman",
    comment:
      "আমি পশু চিকিৎসার জন্য যথেষ্ট সেবা পেয়েছি। সেবা পেতে দেরি হয়নি এবং চিকিৎসকেরা অভিজ্ঞ।",
  },
  {
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "সাবের কাদের",
    userName: "@sabir_kader",
    comment:
      "এটি সত্যিই একটি অসাধারণ পরিষেবা! অ্যাপের মাধ্যমে দ্রুত এপয়েন্টমেন্ট পেয়েছি।",
  },
  {
    image: "https://randomuser.me/api/portraits/men/100.jpg",
    name: "নাজমুল ইসলাম",
    userName: "@najmul_islam",
    comment:
      "গবাদি পশুর জন্য এই পরিষেবা অসাধারণ! সহজে যোগাযোগ করতে পারি এবং দ্রুত সেবা পাই।",
  },
  {
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    name: "রহিমা সুলতানা",
    userName: "@rahima_sultana",
    comment:
      "এটি আমার পোষ্যের জন্য সেরা পরিষেবা। চিকিৎসকরা খুবই সাহায্যকারী এবং মৃদুভাষী।",
  },
  {
    image: "https://randomuser.me/api/portraits/men/43.jpg",
    name: "ইমরান আলী",
    userName: "@imran_ali",
    comment:
      "সেবা নিতে খুবই সুবিধা। চিকিৎসকরা পেশাদার এবং আমার পোষ্যের যত্ন নিচ্ছেন।",
  },
];


export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        জানুন কেন
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          মানুষ ভালোবাসে{" "}
        </span>
        গবাদি অ্যাপটি
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        আমাদের পরিষেবাগুলি আপনার পোষ্যের জন্য সেরা যত্ন নিশ্চিত করে। আপনার
        পোষ্যের স্বাস্থ্য আমাদের জন্য প্রধান অগ্রাধিকার।
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={userName}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage
                    alt=""
                    src={image}
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  {/* <CardDescription>{userName}</CardDescription> */}
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
