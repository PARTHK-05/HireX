import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Sparkles,
  Video,
  Code2,
  Globe,
  PlayCircle,
} from "lucide-react";
import FeaturesCard from "../components/FeaturesCard";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 pb-10">
      {/* NAV */}
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide">
                HireX
              </h1>
              <p className="text-xs text-base-content/60">Code Together</p>
            </div>
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-2xl text-white font-semibold flex items-center gap-2 hover:scale-105 transition">
                Get Started
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {/* Herro */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full font-semibold w-fit">
            <Sparkles className="size-4" />
            Real-time Collaboration
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Code Together,
            </span>
            <br />
            Learn Together
          </h1>

          <p className="text-lg text-base-content/70 max-w-xl">
            The ultimate platform for collaborative coding interviews and pair
            programming. Connect face-to-face, code in real-time, and ace your
            technical interviews.
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            <Feature icon={<Video />} label="Live Video Chat" />
            <Feature icon={<Code2 />} label="Code Editor" />
            <Feature icon={<Globe />} label="Multi-Language" />
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <SignInButton mode="modal">
              <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-2xl text-white font-semibold flex items-center gap-2 hover:scale-105 transition">
                Start Coding Now
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </SignInButton>

            <button className="px-6 py-3 border border-base-content/20 rounded-2xl flex items-center gap-2 hover:bg-base-200 transition">
              <PlayCircle className="size-5" />
              Watch Demo
            </button>
          </div>

          <div className="flex gap-10 mt-10">
            <Stat value="10K+" label="Active Users" />
            <Stat value="50K+" label="Sessions" />
            <Stat value="99.9%" label="Uptime" />
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 blur-3xl rounded-full" />
          <img
            src="/hero.png"
            alt="Collaborative Coding"
            className="relative z-10 w-full max-w-xl mx-auto drop-shadow-2xl rounded-2xl"
          />
        </div>
      </section>

      {/* Features */}
      <div className="max-w-7xl mx-auto  flex flex-col justify-center items-center gap-10 px-10">
        <div className="w-full flex flex-col justify-center items-center gap-3">
          <h1 className="text-4xl">Everything You Need to <span className="font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide">Succeed</span></h1>
          <h3>Powerful Features designed to make your coding interview seamless and productive</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeaturesCard icon={<Video />} title="HD Video Call" description="Crystal clear video and audio for seamless communication during interviews." />
          <FeaturesCard icon={<Code2 />} title="Live Code Editor" description="Collaborative real-time coding with syntax highlighting and instant updates." />
          <FeaturesCard icon={<Globe />} title="Multi-Language Support" description="Code in multiple programming languages with smooth switching." />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

const Feature = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-4 py-2 border border-base-content/20 rounded-full text-sm font-medium">
    {icon}
    {label}
  </div>
);

const Stat = ({ value, label }) => (
  <div>
    <h3 className="text-4xl font-black">{value}</h3>
    <p className="text-lg text-base-content/60">{label}</p>
  </div>
);
