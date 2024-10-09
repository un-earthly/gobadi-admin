import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}
const FAQList: FAQProps[] = [
  {
    question: "এই সেবা কি ফ্রি?",
    answer: "না, প্রতিটি সেবা আলাদাভাবে মূল্য নির্ধারণ করা হয়।",
    value: "item-1",
  },
  {
    question: "কিভাবে আমি একটি অ্যাপয়েন্টমেন্ট নির্ধারণ করতে পারি?",
    answer:
      "আপনি প্রথমে আপনার পশুর জন্য সঠিক ভেটেরিনারি বিভাগ নির্বাচন করুন এবং প্রয়োজনীয় তথ্য পূরণ করুন। তারপর অ্যাপয়েন্টমেন্টের সময় নির্ধারণ করুন।",
    value: "item-2",
  },
  {
    question: "ভিডিও কল কিভাবে কাজ করে?",
    answer:
      "আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত হলে, আপনি ডাক্তারের সঙ্গে ভিডিও কলের মাধ্যমে যোগাযোগ করতে পারবেন।",
    value: "item-3",
  },
  {
    question: "আমি কি একাধিক পশুর জন্য পরিষেবা নিতে পারি?",
    answer: "হ্যাঁ, আপনি একাধিক পশুর জন্য আলাদা আলাদা অ্যাপয়েন্টমেন্ট নির্ধারণ করতে পারেন।",
    value: "item-4",
  },
  {
    question: "কিভাবে আমি আমার অ্যাপয়েন্টমেন্ট বাতিল করতে পারি?",
    answer:
      "আপনার অ্যাপয়েন্টমেন্ট বাতিল করার জন্য আমাদের সাথে যোগাযোগ করুন বা আপনার অ্যাকাউন্ট থেকে বাতিল করুন।",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        সাধারণত জিজ্ঞাসিত{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          প্রশ্নাবলী
        </span>
      </h2>


      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        এখনও কি কোনও প্রশ্ন আছে?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          আমাদের সাথে যোগাযোগ করুন
        </a>
      </h3>

    </section>
  );
};
