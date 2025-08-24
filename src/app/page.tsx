import Image from "next/image";
import styles from "./page.module.css";
import { Header } from "./components/layout/Header";
import { Container } from "./components/layout/Container";
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
