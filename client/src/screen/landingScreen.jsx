import React from "react";
import ReactDOM from 'react-dom';
import gsap from "gsap";
const NavBarInner = () => (
  <header className="fixed w-fit inset-x-0 top-0 z-[9999] py-3 ">
    <div className="max-w-7xl mx-auto px-6">
      <nav className="flex items-center justify-end p-3 rounded-2xl bg-white/6 bg-opacity-60 px-8 backdrop-blur-sm">
        <div className="hidden md:flex items-center gap-4">
          <a className="text-white/90 hover:underline">Get started</a>
          <a
            href="https://github.com/SamMegh/Vaani/blob/main/docs/PROJECT_DOCS.md"
            target="_blank"
            rel="noreferrer"
            className="text-white/80 hover:underline"
          >
            Docs
          </a>
          <a
            href="https://github.com/SamMegh/Vaani"
            target="_blank"
            rel="noreferrer"
            className="text-white/80 hover:underline"
          >
            GitHub
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              gsap.to(window, {
                duration: 1,
                ease: "power2.inOut",
                scrollTo: { y: "#contact" },
              });
            }}
            href=""
            className="px-4 py-2 rounded-2xl bg-white text-black font-semibold"
          >
            Contact
          </a>
        </div>

        <div className="md:hidden">
          {/* mobile simple menu link */}
          {/* todo: add login page here */}
          <a
            href=""
            className="text-white/90 px-3 py-2 bg-white/6 rounded"
          >
            Start
          </a>
        </div>
      </nav>
    </div>
  </header>
);

const NavBar = () => {
  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(<NavBarInner />, document.body);
};

function LandingScreen() {
  return (
    <>
      <NavBar />
      <main>
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Decorative background model (subtle, behind content) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src="/model.png"
              alt=""
              aria-hidden
              className="object-contain opacity-20 max-h-[100vh] mx-auto"
            />
          </div>

          <section className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Hero column */}
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 bg-white/8 rounded-full text-sm text-white/90">
                  New · Vaani 1.2
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-AlphaWood text-white leading-tight">
                  Meet Vaani — your friendly AI assistant
                </h1>

                <p className="text-lg text-gray-100/95 max-w-xl">
                  Vaani combines a clean interface, fast responses, and easy
                  sharing — built for real conversations. Start a chat, get AI
                  answers, and iterate with human-like context.
                </p>

                <div className="flex flex-wrap gap-4 mt-6">
                  {/* todo: add login page here */}
                  <a
                    href="#get-started"
                    className="inline-flex items-center gap-3 bg-white text-black px-5 py-3 rounded-xl font-semibold shadow-lg hover:scale-[0.995] transition"
                  >
                    Get started
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </a>

                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      gsap.to(window, {
                        duration: 1,
                        ease: "power2.inOut",
                        scrollTo: { y: "#learn-more" },
                      });
                    }}
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-4 py-3 rounded-xl hover:bg-white/5 transition"
                  >
                    Learn more
                  </a>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-white/80">Active users</div>
                    <div className="text-2xl font-bold text-white">1.2K+</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-white/80">Avg response</div>
                    <div className="text-2xl font-bold text-white">
                      <span>~0.9s</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-white/80">Integrations</div>
                    <div className="text-2xl font-bold text-white">Plugins</div>
                  </div>
                </div>
              </div>

              {/* Right column: Get started steps + preview */}
              <div className="space-y-6">
                <div className="rounded-2xl overflow-hidden h-[80vh] bg-white/6 p-3 backdrop-blur-sm">
                  <img
                    src="/model.png"
                    alt="Model preview"
                    className="w-full h-auto object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* what people say */}

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-8 py-16">
          <div className="p-8 rounded-2xl bg-white/6 backdrop-blur-sm shadow-lg">
            <h3 className="text-2xl text-white font-semibold mb-4">
              What people say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-white/80">
                  “Vaani helped our team automate support replies and cut
                  response time in half.”
                </p>
                <div className="mt-3 text-sm text-white/70">
                  — Alex, Support Lead
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-white/80">
                  “The context-aware replies feel natural — great for rapid
                  prototyping.”
                </p>
                <div className="mt-3 text-sm text-white/70">
                  — Priya, Product
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-white/80">
                  “Easy to share chats with teammates and iterate together —
                  saves time.”
                </p>
                <div className="mt-3 text-sm text-white/70">— Sam, Founder</div>
              </div>
            </div>
          </div>
        </section>
        {/* Learn more */}
        <section className="w-full bg-[rgba(255,255,255,0.02)]" id="learn-more">
          <div className="max-w-7xl mx-auto px-8 pt-28">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/6 to-white/4 backdrop-blur-sm shadow-lg">
              <h2 className="text-4xl sm:text-5xl text-white font-semibold mb-4">
                Learn more
              </h2>
              <p className="text-white/80 text-lg max-w-3xl">
                Discover Vaani's core capabilities, integrations, and how to
                extend it for your own workflows. The GitHub repository includes
                examples and documentation to help you get started quickly.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://github.com/SamMegh/Vaani"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3  sm:hover:bg-white rounded-md bg-white/90 text-black font-semibold shadow-lg"
                >
                  View on GitHub
                </a>
                <a
                  href="#docs"
                  className="inline-flex  sm:hover:bg-white/10 items-center gap-2 px-5 py-3 rounded-md border border-white/20 text-white"
                >
                  Read docs
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="p-8 rounded-2xl bg-white/6 sm:hover:bg-white/10 backdrop-blur-sm min-h-[160px]">
                <h3 className="text-white text-xl font-semibold mb-2">
                  Smart Summaries
                </h3>
                <p className="text-white/80">
                  Automatic summarization of long chats so you can catch up fast
                  and find answers quicker.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/6 sm:hover:bg-white/10 backdrop-blur-sm min-h-[160px]">
                <h3 className="text-white text-xl font-semibold mb-2">
                  Context-aware
                </h3>
                <p className="text-white/80">
                  Keeps conversation context across turns for more natural,
                  relevant replies.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/6 sm:hover:bg-white/10 backdrop-blur-sm min-h-[160px]">
                <h3 className="text-white text-xl font-semibold mb-2">
                  Shareable chats
                </h3>
                <p className="text-white/80">
                  Share chat rooms with collaborators via links or invite them
                  directly for teamwork.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/6 sm:hover:bg-white/10 backdrop-blur-sm min-h-[160px]">
                <h3 className="text-white text-xl font-semibold mb-2">
                  Extensible
                </h3>
                <p className="text-white/80">
                  Plugin-friendly architecture to add integrations and custom
                  behavior for advanced workflows.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/6 sm:hover:bg-white/10 backdrop-blur-sm min-h-[160px]">
                <h3 className="text-white text-xl font-semibold mb-2">
                  Privacy controls
                </h3>
                <p className="text-white/80">
                  Manage who can view and participate in chats with granular
                  permissions.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/6 sm:hover:bg-white/10 backdrop-blur-sm min-h-[160px]">
                <h3 className="text-white text-xl font-semibold mb-2">
                  Multi-platform
                </h3>
                <p className="text-white/80">
                  Works in desktop and mobile apps; can be packaged for electron
                  or deployed as web app.
                </p>
              </div>
            </div>

            <div className="mt-10 p-8 rounded-2xl bg-white/4 backdrop-blur-sm">
              <h4 className="text-white text-lg font-semibold mb-3">
                Quick example
              </h4>
              <pre className="bg-black/40 text-white p-4 rounded text-sm overflow-auto">
                {`// send a message
fetch('/chat/sendmessage', {
  method: 'POST',
  credentials: 'include',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ senderid: '<your-id>', name: 'You', msg: 'Hello', roomID: '<room-id>' })
});`}
              </pre>
            </div>
          </div>
          {/* Pricing */}
          {/* Pricing Section */}
          <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
            <div className="p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-xl border border-white/10">
              <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Pricing Plans
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Free Plan (Available) */}
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition">
                  <div className="text-xl font-semibold text-white">Free</div>
                  <div className="text-4xl font-bold text-white my-6">$0</div>
                  <ul className="text-white/70 space-y-3 mb-8">
                    <li>✔ Basic chats</li>
                    <li>✔ Limited history</li>
                    <li>✔ Community support</li>
                  </ul>
                  <button className="w-full py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
                    Get Started
                  </button>
                </div>

                {/* Pro Plan (Coming Soon) */}
                <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 opacity-60 cursor-not-allowed">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-sm font-semibold text-black px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                  <div className="text-xl font-semibold text-white">Pro</div>
                  <div className="text-4xl font-bold text-white my-6">
                    $9/mo
                  </div>
                  <ul className="text-white/70 space-y-3 mb-8">
                    <li>✔ Unlimited chats</li>
                    <li>✔ Extended history</li>
                    <li>✔ Email support</li>
                  </ul>
                  <button
                    className="w-full py-3 rounded-xl bg-gray-400/30 text-white font-semibold cursor-not-allowed"
                    disabled
                  >
                    Unavailable
                  </button>
                </div>

                {/* Enterprise Plan (Coming Soon) */}
                <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 opacity-60 cursor-not-allowed">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-sm font-semibold text-black px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                  <div className="text-xl font-semibold text-white">
                    Enterprise
                  </div>
                  <div className="text-4xl font-bold text-white my-6">
                    Custom
                  </div>
                  <ul className="text-white/70 space-y-3 mb-8">
                    <li>✔ On-premise options</li>
                    <li>✔ Dedicated support</li>
                    <li>✔ SSO & compliance</li>
                  </ul>
                  <button
                    className="w-full py-3 rounded-xl bg-gray-400/30 text-white font-semibold cursor-not-allowed"
                    disabled
                  >
                    Unavailable
                  </button>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* FAQ */}
        <section className="max-w-7xl mx-auto px-8 py-16">
          <div className="p-8 rounded-2xl bg-white/6 backdrop-blur-sm shadow-lg">
            <h3 className="text-2xl text-white font-semibold mb-4">
              Frequently asked questions
            </h3>
            <div className="space-y-4">
              <details className="bg-white/5 p-4 rounded">
                <summary className="text-white font-medium">
                  Is Vaani free?
                </summary>
                <p className="mt-2 text-white/80">
                  Yes — the Free tier provides basic features. Pro adds more
                  history and support.
                </p>
              </details>
              <details className="bg-white/5 p-4 rounded">
                <summary className="text-white font-medium">
                  How do I share a chat?
                </summary>
                <p className="mt-2 text-white/80">
                  Open the chat and use the Share button to generate a link or
                  invite collaborators.
                </p>
              </details>
              <details className="bg-white/5 p-4 rounded">
                <summary className="text-white font-medium">
                  Can I self-host?
                </summary>
                <p className="mt-2 text-white/80">
                  Enterprise customers can deploy on-premise; contact us for
                  details.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="max-w-7xl mx-auto px-8 py-20" id="contact">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/6 to-white/4 backdrop-blur-sm shadow-lg">
            <h3 className="text-2xl text-white font-semibold mb-4">Contact</h3>
            <p className="text-white/80 mb-6">
              Have questions or want a custom plan? Reach out or send a message
              below.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                const body = Object.fromEntries(data.entries());
                // simple mailto fallback
                const mailto = `mailto:hello@vaani.example?subject=${encodeURIComponent(
                  "Contact from landing page"
                )}&body=${encodeURIComponent(JSON.stringify(body, null, 2))}`;
                window.location.href = mailto;
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                name="name"
                placeholder="Your name"
                className="p-3 rounded bg-white/6 text-white outline-none"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="p-3 rounded bg-white/6 text-white outline-none"
              />
              <textarea
                name="message"
                placeholder="Message"
                className="md:col-span-2 p-3 rounded bg-white/6 text-white outline-none h-32"
              />
              <div className="md:col-span-2 flex items-center gap-4">
                <button
                  type="submit"
                  className="px-5 py-3 rounded bg-white text-black font-semibold"
                >
                  Send message
                </button>
                <a
                  href="mailto:sam.megh0305@gmail.com"
                  className="text-white/80"
                >
                  Or email sam.megh0305@gmail.com
                </a>
              </div>
            </form>
          </div>
        </section>
      </main>
      <footer className="w-full">
        <div className="w-full bg-[rgba(255,255,255,0.02)] py-8">
          {" "}
          {/* full width background */}
          <div className="max-w-7xl mx-auto px-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/6 to-white/4 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-white text-lg font-semibold">Vaani</div>
                <div className="text-white/80">&middot;</div>
                <div className="text-white/70">Build better conversations</div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="mailto:sam.megh0305@gmail.com"
                  className="text-white/90 underline"
                >
                  sam.megh0305@gmail.com
                </a>
                <a
                  href="https://github.com/SamMegh"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/80"
                >
                  GitHub
                </a>
                <div className="text-white/60">
                  © {new Date().getFullYear()} Sam Megh
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingScreen;
