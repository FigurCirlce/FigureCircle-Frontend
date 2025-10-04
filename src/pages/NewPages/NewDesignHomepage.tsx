import React, { useEffect } from "react";

const NewDesignHomepage: React.FC = () => {
  useEffect(() => {
    // Floating particles
    const particlesContainer = document.getElementById("particles");
    if (particlesContainer) {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-2 h-2 bg-white rounded-full opacity-20 animate-bounce";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 6 + "s";
        particle.style.animationDuration = Math.random() * 3 + 4 + "s";
        particlesContainer.appendChild(particle);
      }
    }

    // Scroll animations
    const elements = document.querySelectorAll(".scroll-animate");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    elements.forEach((el) => observer.observe(el));

    // Hero parallax effect
    const heroSection = document.querySelector(".hero-section") as HTMLElement;
    const handleScroll = () => {
      const scrolled = window.scrollY;
      heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background Particles */}
      <div id="particles" className="absolute inset-0 -z-10"></div>
      {/**Header */}
<header>
    <div>
        <div>
            Hiii
        </div>
    </div>
</header>
      {/* Hero Section */}
      <section className="hero-section flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl font-bold mb-4">Don't just learn skills.</h1>
        <h2 className="text-3xl mb-4">
          Learn the{" "}
          <span className="text-red-400">right skills</span> — with expert
          guidance.
        </h2>
        <p className="max-w-2xl mb-8 text-lg text-gray-300">
          Our mentors help you focus on the skills and strategies that matter for
          your dream role.
        </p>
        <a
          href="#"
          className="cta-button bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-transform transform hover:-translate-y-1 hover:scale-105"
        >
          Talk to a Mentor
        </a>
      </section>

      {/* Main Content */}
      <div className="main-container max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* Hero Image */}
        <section className="flex justify-center">
          <div className="text-7xl">🎯</div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 scroll-animate opacity-0 translate-y-6 transition-all duration-700">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Tell us your background & intent",
                desc: "Share your education, experience, and goals.",
              },
              {
                step: "2",
                title: "Get personalized role & skill recommendations",
                desc: "We suggest dream roles, courses, and skills you need to grow.",
              },
              {
                step: "3",
                title: "Work with experts to reach milestones",
                desc: "Mentors provide insights, roadmaps, and feedback tailored to you.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="scroll-animate opacity-0 translate-y-6 transition-all duration-700 bg-gray-800 p-6 rounded-xl shadow-md text-center"
              >
                <div className="text-2xl font-bold text-red-400 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 scroll-animate opacity-0 translate-y-6 transition-all duration-700">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "🎯",
                title: "Industry-specific skill roadmaps",
                desc: "Get targeted learning paths designed for your specific career goals and industry requirements.",
              },
              {
                icon: "💡",
                title: "Mentorship for strategic advice & insights",
                desc: "Connect with industry experts who provide personalized guidance and real-world insights.",
              },
              {
                icon: "📚",
                title: "Curated course & competition recommendations",
                desc: "Access hand-picked resources and opportunities that align with your learning objectives.",
              },
              {
                icon: "📈",
                title: "Profile feedback to improve resumes & portfolios",
                desc: "Get expert review and suggestions to make your professional profile stand out to employers.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="scroll-animate opacity-0 translate-y-6 transition-all duration-700 flex items-start gap-4 bg-gray-800 p-6 rounded-xl shadow-md"
              >
                <div className="text-4xl">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewDesignHomepage;
