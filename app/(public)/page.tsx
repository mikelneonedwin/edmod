import { Button } from "@/components/ui/button";
import { features } from "@/constants/home";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Challenge Your Knowledge
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Test your skills with timed quizzes. Choose between Survival
                  Mode for endless challenges or Number Game Mode for
                  progressive difficulty.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/sign-in">
                  <Button className="bg-white text-black hover:bg-gray-200">
                    Start Playing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center space-y-4">
                <feature.icon className="h-8 w-8 text-white"  />
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-center text-gray-400">
                  {feature.content}
                </p>
              </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
