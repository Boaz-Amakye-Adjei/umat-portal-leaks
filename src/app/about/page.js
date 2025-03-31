import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

export default function About() {
  return (
    <section className="h-full w-full min-h-[100svh] flex">
      <RightAside />
      <MiddleSection />
      <aside className="lg:w-[25%] border-white border-solid border h-[600px] hidden lg:block px-[20px] pt-[65px] sticky top-0">
        <Link href="/contact" className="text-blue-600">
          Contact Us
        </Link>
        <div className="pt-[35px] text-md">
          <h5>Social Media Links</h5>
          <div className="flex gap-2">
            <SocialLink Icon={RiTwitterXFill} bg="#000000" color="#ffffff" />
            <SocialLink Icon={BsYoutube} bg="#ffffff" color="#FF0000" />
            <SocialLink Icon={FaGithub} bg="#0d1117" color="#ffffff" />
            <SocialLink Icon={FaFacebook} bg="#ffffff" color="#1877F2" />
          </div>
        </div>
      </aside>
    </section>
  );
}

function SocialLink({ Icon, bg, color }) {
  return (
    <div className="flex gap-2 py-[10px]">
      <div
        className="w-10 h-10 rounded-full flex justify-center items-center"
        style={{ backgroundColor: bg }}
      >
        <Icon style={{ color: color }} />
      </div>
    </div>
  );
}

function AsideButton({ id, title }) {
  return (
    <Link className="p-2 w-full block" href={`#${id}`}>
      <div className="flex justify-between items-center">
        <p>{title}</p>
        <IoIosArrowForward />
      </div>
    </Link>
  );
}

function RightAside() {
  return (
    <aside className="sticky top-0 md:w-[30%] lg:w-[25%] border-white border-solid border h-[600px] hidden md:block p-[20px]">
      <div className="flex flex-col gap-[7px]">
        <AsideButton id="au" title="About us" />
        <AsideButton id="os" title="Our Story" />
        <AsideButton id="ta" title="Taking Action" />
        <AsideButton id="om" title="Our Mission" />
        <AsideButton id="hych" title="How You Can Help" />
        <AsideButton id="ft" title="Final Thoughts" />
      </div>
    </aside>
  );
}

function MiddleSection() {
  return (
    <article className="md:w-[70%] lg:w-[60%] p-[20px]">
      <Title title="About us" id="au" />
      <p>
        Welcome to UMaT Data Protection Initiative, a platform dedicated to
        safeguarding student information and raising awareness about data
        security.
      </p>

      <Title title="Our Story" id="os" />
      <p>
        As a cybersecurity student at the University of Mines and Technology
        &#40;UMaT&#41;, I embarked on a project to build a web scraper for the
        school&#39;s admission portal. My goal was simple: extract names and
        reference numbers for an authentication system I was developing for my
        UMaT Store website. However, during my initial investigation, I decided
        to inspect the network tab in my browser to see if I could directly
        access the required data through an API request.
      </p>
      <p className="mt-3">
        To my surprise, I discovered that the API not only provided the
        necessary admission details but also leaked a vast amount of personal
        student information—far beyond what was needed. This was a serious
        security vulnerability, exposing sensitive data to potential misuse.
      </p>

      <Title title="Taking Action" id="ta" />
      <p>
        Understanding the risks involved, I promptly reported the issue to my
        lecturer. Being proactive about cybersecurity is essential, especially
        in academic institutions handling sensitive student records. My
        lecturer, recognizing the severity of the issue, assigned me an
        important task: to create a website displaying the leaked information as
        a wake-up call for the administration to take immediate action.
      </p>

      <p className="mt-3">
        Despite reporting the issue, the vulnerability remained unfixed for an
        extended period. Realizing that students&#39; private data was still at
        risk, I took the initiative to launch this platform.
      </p>

      <Title title="Our Mission" id="om" />
      <ul className="list-decimal list-inside">
        <li>
          <strong>Awareness & Advocacy:</strong> Providing affected students
          with a direct link to the administration&#39;s email so they can voice
          their concerns and demand action to secure their data.
        </li>
        <li>
          <strong>Security Education & Prevention:</strong> Offering guidance on
          how individuals can protect their personal information online and
          prevent data leaks in the future.
        </li>
      </ul>

      <Title title="How You Can Help" id="hych" />
      <ul className="list-disc list-inside">
        <li>
          Submit a petition through our website, urging the administration to
          take immediate corrective measures.
        </li>
        <li>
          Use our direct email link to contact the school&#39;s IT department
          and administration, highlighting the importance of fixing the issue.
        </li>
        <li>
          Learn about data security best practices to safeguard your personal
          information.
        </li>
      </ul>

      <Title title="Final Thoughts" id="ft" />
      <p>
        In an era where cybersecurity threats are increasing, educational
        institutions must prioritize the protection of student data. This
        initiative is not about exploiting vulnerabilities but about holding
        institutions accountable for responsible data management.
      </p>

      <p className="mt-3">
        By joining hands, we can ensure that our university implements robust
        security measures to protect every student&#39;s personal information.
      </p>

      <p className="mt-3">
        Thank you for being part of this movement towards a safer digital space
        for all UMaT students.
      </p>

      <div className="flex gap-2 lg:hidden pt-[20px]">
        <SocialLink Icon={RiTwitterXFill} bg="#000000" color="#ffffff" />
        <SocialLink Icon={BsYoutube} bg="#ffffff" color="#FF0000" />
        <SocialLink Icon={FaGithub} bg="#0d1117" color="#ffffff" />
        <SocialLink Icon={FaFacebook} bg="#ffffff" color="#1877F2" />
      </div>
    </article>
  );
}

function Title({ id, title }) {
  return (
    <h2 id={id} className="py-[20px] capitalize font-bold text-2xl">
      {title}
    </h2>
  );
}
