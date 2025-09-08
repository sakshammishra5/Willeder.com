import { Service } from "./components/service/Service";
import { Hero } from "./components/hero/Hero";
import { SampleBlog } from "./components/sampleBlog/SampleBlog";

export default function Home() {
  return (
   <>
   
    <Hero/>
    <Service/>
    <SampleBlog/>
   </>
  );
}
