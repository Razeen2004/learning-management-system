import { About } from "@/components/about";
import { Banner } from "@/components/banner";
import { Courses } from "@/components/courses";
import { CTA } from "@/components/cta";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Banner />
        <About />
        <Features />
        <Courses />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}