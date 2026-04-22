// workshop-sections.jsx
// First-Year Writing & AI — Faculty Workshop
// All section components, exported to window

const { useState, useEffect, useRef, useContext, createContext } = React;

// ─── FACILITATOR CONTEXT ───────────────────────────────────────────────────
const FacilitatorContext = createContext(false);

function FacilitatorNote({ time, children }) {
  const show = useContext(FacilitatorContext);
  if (!show) return null;
  return (
    <div style={{
      borderLeft: "3px solid var(--amber)", background: "rgba(232,151,10,0.05)",
      padding: "14px 18px", marginBottom: 28, marginTop: -8
    }}>
      <div style={{
        fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em",
        textTransform: "uppercase", color: "var(--amber)", marginBottom: 8,
        display: "flex", gap: 12
      }}>
        <span>Facilitator guide</span>
        {time && <span style={{ color: "var(--text-muted)" }}>· {time}</span>}
      </div>
      <div style={{
        fontFamily: "var(--mono)", fontSize: 12, lineHeight: 1.75,
        color: "var(--text-muted)"
      }}>{children}</div>
    </div>
  );
}

// ─── DATA ──────────────────────────────────────────────────────────────────

const CAPABILITIES_DATA = {
  can: [
    { label: "Produce fluent, error-free prose", note: "At scale, instantly, on any topic" },
    { label: "Adapt tone, voice, and register on command", note: "Formal, casual, academic, confessional" },
    { label: "Generate structured arguments", note: "With thesis, evidence, and counterargument" },
    { label: "Summarize and synthesize large texts", note: "Accurately, if not always critically" },
    { label: "Produce citations and bibliographies", note: "That may or may not actually exist" },
    { label: "Revise prose based on stated feedback", note: "Instantly and without complaint" },
    { label: "Mimic specific styles or voices", note: "Convincingly enough to pass many readers" },
    { label: "Pass most AI detection tools", note: "Especially when lightly edited by the student" },
  ],
  cannot: [
    { label: "Write from lived experience", note: "It has no body, no history, no specific Tuesday" },
    { label: "Make an argument it has stakes in", note: "It cannot be wrong in a way that costs it anything" },
    { label: "Take a genuine stylistic risk", note: "Its defaults trend toward the unmarked center" },
    { label: "Sustain real intellectual uncertainty", note: "It performs doubt; it does not feel it" },
    { label: "Know who it is writing to", note: "It has no rhetorical situation" },
    { label: "Produce accurate citations reliably", note: "It confabulates sources with total confidence" },
    { label: "Care whether the writing succeeds", note: "There is no writer behind it" },
    { label: "Learn from writing this essay", note: "The cognitive work stays with the machine" },
  ]
};

const SPOT_ROUNDS = [
  {
    topic: "On encountering an argument that changed your mind",
    passages: [
      { label: "A", text: "My uncle voted for the first time in 2016. He'd been in this country for thirty years and finally got his citizenship the year before. I assumed his vote would go the same way as mine — I'd heard him complain about the same things I complained about. But he voted for Trump, and at Thanksgiving he told me why, and I sat there with my fork in my hand not knowing what to say, because some of what he said made a terrible kind of sense. I didn't change my vote. But I had to stop using the word 'obviously' for a while.", isAI: false },
      { label: "B", text: "Throughout our lives, we develop beliefs that feel certain and immovable. One such moment of intellectual challenge came when I encountered an argument about the nature of free will. I had always believed humans possess complete autonomy in their decision-making. However, after reading a compelling essay on determinism, I was forced to reconsider my assumptions. The author argued persuasively that our choices are shaped by factors beyond our control. This encounter reminded me that remaining open to challenging ideas is essential for intellectual growth.", isAI: true }
    ],
    aiTells: "Passage B uses abstract category nouns — 'intellectual challenge,' 'complete autonomy,' 'intellectual growth' — and follows a predetermined arc: belief → challenge → lesson. There are no proper nouns, no scene, no detail that couldn't apply to any person in any decade. The closing sentence earns nothing; it just restates the genre's expected conclusion.",
    humanTells: "Passage A commits to a specific scene: Thanksgiving, a fork, 2016, a family member's actual political choice. The final sentence — having to stop using one specific word — is precise and earned. It refuses the neat lesson. The political specificity is a risk."
  },
  {
    topic: "On grief",
    passages: [
      { label: "A", text: "Grief is one of the most profound and universal human experiences. When we lose someone we love, we may feel a wide range of emotions including sadness, anger, denial, and eventually acceptance. The grieving process is deeply personal and can take many different forms. Writing about grief can be a therapeutic way to process these complex feelings and honor the memory of those we have lost.", isAI: true },
      { label: "B", text: "Grief is strange in the way it arrives. My grandmother died on a Tuesday in March, and I remember that the sky was doing something ugly — that particular gray that isn't just overcast but feels personally hostile. I couldn't write anything for six weeks. When I finally tried, I wrote about the sky.", isAI: false }
    ],
    aiTells: "Passage A is grief at maximum categorical distance. 'Profound and universal,' 'wide range of emotions,' 'therapeutic way to process' — this is summary, not experience. The Kübler-Ross stages appear implicitly. It describes grief the way an encyclopedia would: accurately, from outside.",
    humanTells: "Passage B gives you one Tuesday, one sky. 'Does something ugly' is a strange committed metaphor — the writer takes a risk. Six weeks of silence followed by writing about the sky rather than the grandmother: that structural choice carries more meaning than Passage A's entire paragraph."
  },
  {
    topic: "On revision",
    passages: [
      { label: "A", text: "The best thing my writing teacher ever told me about revision was: 'This draft is what you meant to say. Now figure out what you actually said.' I didn't understand it until the third time I read my own essay out loud and heard a sentence I couldn't explain.", isAI: false },
      { label: "B", text: "Revision is a critical component of the writing process that allows writers to improve their work through reflection and careful editing. Unlike simple proofreading, which focuses on surface-level errors, true revision involves rethinking ideas, reorganizing structure, and reconsidering the overall purpose of a piece. Effective revision requires writers to distance themselves from their work and approach it with fresh eyes, often after taking a break from the draft.", isAI: true }
    ],
    aiTells: "Passage B is accurate as a textbook definition — 'unlike simple proofreading,' 'fresh eyes,' 'distance themselves' are all reasonable points. But it reads as description from outside the act of writing. Nothing is ventured; nothing is committed to. It could appear in any handbook from any decade.",
    humanTells: "Passage A has a specific teacher, a specific odd quote, a specific count ('the third time'), and a specific strange experience ('a sentence I couldn't explain'). The commitment to the particular — especially that last clause — is what makes it human."
  }
];

const STRUGGLES_PROMPTS = [
  "Write about a smell that transports you to a specific memory of someone you've lost",
  "Describe a moment of genuine shame you have never told anyone",
  "Make an argument you don't personally believe but find genuinely compelling",
  "Write about feeling politically afraid in a country you thought was yours",
  "Describe the first time you understood that a parent was also a person with limitations",
];

const STUDENT_PARAGRAPH = `I've been thinking about the word "obvious" lately. My dad uses it constantly — "obviously you should go to college," "obviously you need health insurance" — and I've noticed that everything he calls obvious is something that required money and luck and timing that he doesn't think of as luck. I'm not angry at him. I think he genuinely can't see it. But I've started noticing when I use the word myself, and I've started asking: obvious to whom? Because sometimes I think "obvious" is just the word for "this is how things worked out for me."`;

const SCENARIOS_DATA = [
  {
    id: "deadline", title: "The Deadline", label: "01",
    context: "Alex is a first-generation college student who works 30 hours a week. The night before a 4-page essay was due, overwhelmed and behind, Alex used ChatGPT to generate a complete draft, then edited it for about an hour. The grade came back: B+. Instructor comment: 'Good structure, though the argument could go deeper.'",
    questions: ["What did Alex learn from writing this essay?", "Is the B+ an accurate assessment of Alex's writing ability?", "Does the context — work hours, first-gen status — change your response? Should it?", "If Alex comes to office hours next week, what do you say?"]
  },
  {
    id: "language", title: "The Language Question", label: "02",
    context: "Priya is a multilingual student whose first language is Tamil, second Hindi, third English. She writes drafts in strongly-accented English prose, then uses AI to 'polish' the language before submitting. Her instructor writes: 'Formally correct, but the writing has lost your voice.' Priya finds this feedback baffling — correcting her English was the point.",
    questions: ["What assumptions are embedded in 'you've lost your voice'?", "Is there a difference between correcting grammar and erasing voice?", "Who defines 'good academic prose' — and is that definition equitable?", "Would you give Priya the same feedback? What would you do differently?"]
  },
  {
    id: "collaborator", title: "The Thinking Partner", label: "03",
    context: "Marcus used AI not to write, but to think. He asked it to steelman the position he opposed, challenged its answers, used it to generate arguments he then refuted. His final essay is entirely in his own words, and his thinking genuinely developed through the process. He considers this legitimate intellectual work.",
    questions: ["Is Marcus right that this is his own work? What theory of authorship are you drawing on?", "How does this differ from talking through an argument with a classmate or tutor?", "What cognitive work did Marcus do? What did he outsource?", "Would you allow or prohibit this use — and could you actually enforce either?"]
  },
  {
    id: "refusal", title: "The Principled Refusal", label: "04",
    context: "Sofia refuses to use AI tools — not because policy requires it, but because she believes something important happens when she struggles through her own prose. She is spending two to three times as long on assignments as her AI-assisted peers. She is aware of this disparity and does not want to change.",
    questions: ["Is Sofia's position principled, romantic, or both?", "Does her refusal put her at a disadvantage — and if so, whose problem is that?", "What would you say to Sofia if she came to office hours?", "Does Sofia's choice reveal anything about your own relationship to the technology?"]
  }
];

const FRAMEWORKS_DATA = [
  {
    title: "Prohibition", accent: "var(--red)",
    rationale: "Writing is a cognitive process. The productive struggle of drafting and revising — finding one's argument by writing through it — is not incidental to learning. It is the learning. AI use removes this.",
    policy: '"AI writing tools are not permitted at any stage of the writing process in this course. All work must be generated by you, without AI assistance."',
    strengths: ["Clear, enforceable expectations", "Protects the cognitive work of writing", "Preserves assessable authorship"],
    tensions: ["Unenforceable in practice at scale", "May disadvantage students who need scaffolding", "Avoids rather than addresses the technology"]
  },
  {
    title: "Disclosure", accent: "var(--amber)",
    rationale: "Students will encounter AI in every professional context they enter. Requiring transparency about AI use develops critical awareness and creates space for honest conversation about what AI contributed and what the student actually learned.",
    policy: '"If you use any AI tool in drafting or revising your work, you must disclose this in a brief process note explaining how it was used and how you responded to it."',
    strengths: ["Honest about the present reality", "Generates reflection on process", "Preserves instructor-student trust"],
    tensions: ["Students may not know what counts as disclosure", "Doesn't address whether the learning occurred", "Can become a pro forma box to check"]
  },
  {
    title: "Critical Integration", accent: "oklch(65% 0.12 150)",
    rationale: "AI becomes the object of analysis rather than a covert assistant. Students use AI to generate text, then critique it — comparing it to their own work, analyzing its rhetorical assumptions, and articulating what it refuses to do.",
    policy: '"Assignments in this unit ask you to generate AI text and analyze it critically. What did it do well? What did it refuse to do? What does its output reveal about what writing is actually for?"',
    strengths: ["Makes the technology legible", "Builds transferable critical skills", "Turns evasion into engagement"],
    tensions: ["Requires faculty AI literacy", "Can inadvertently normalize use", "Depends on genuine engagement, not extraction"]
  },
  {
    title: "Redesign", accent: "oklch(65% 0.12 260)",
    rationale: "Design assessments AI cannot complete: writing from embodied experience, arguments requiring specific course knowledge, process portfolios, in-class writing, oral defenses, iterative drafts with required revision narratives.",
    policy: '"This course uses writing tasks that require your specific experience, knowledge, and history. AI cannot write your fieldwork reflection, your close reading of a text we discussed, or your revision narrative."',
    strengths: ["Addresses root cause", "Builds richer, more meaningful assignments", "Removes the detection problem"],
    tensions: ["Labor-intensive to redesign at scale", "Not all genres can be AI-proofed", "Requires rethinking what we are actually assessing"]
  }
];

// ─── SHARED UI ─────────────────────────────────────────────────────────────

function SectionTag({ children, id }) {
  return (
    <div id={id} style={{
      fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em",
      textTransform: "uppercase", color: "var(--amber)", marginBottom: 20,
      display: "flex", alignItems: "center", gap: 10
    }}>
      <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--amber)" }} />
      {children}
    </div>
  );
}

function Rule({ opacity = 1, color = "var(--border)" }) {
  return <div style={{ height: 1, background: color, opacity, margin: "0" }} />;
}

// ─── SITE NAV ─────────────────────────────────────────────────────────────

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const sections = [
    { id: "capabilities", label: "Capabilities" },
    { id: "interactions", label: "Interactions" },
    { id: "scenarios", label: "Scenarios" },
    { id: "frameworks", label: "Frameworks" },
    { id: "position", label: "Your Position" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,14,12,0.97)" : "transparent",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "background 0.3s, border-color 0.3s",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      padding: "0 40px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0,
          fontFamily: "var(--display)", fontSize: 18, color: "var(--text)", letterSpacing: "-0.01em" }}>
        Writing &amp; Machines
      </button>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => scrollTo(s.id)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0,
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "var(--text-muted)",
              transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "var(--text)"}
            onMouseLeave={e => e.target.style.color = "var(--text-muted)"}>
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────

function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section data-screen-label="00 Hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "flex-end", padding: "0 40px 80px",
      position: "relative", overflow: "hidden"
    }}>
      {/* Background rule grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, var(--border) 79px, var(--border) 80px)",
        opacity: 0.4
      }} />

      <div style={{ position: "relative", maxWidth: 960 }}>
        <div style={{
          fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.16em",
          textTransform: "uppercase", color: "var(--amber)", marginBottom: 32
        }}>
          A Workshop for First-Year Writing Faculty · 2024–25
        </div>

        <h1 style={{
          fontFamily: "var(--display)", fontSize: "clamp(52px, 7vw, 96px)",
          fontWeight: 400, lineHeight: 1.0, letterSpacing: "-0.02em",
          color: "var(--text)", margin: "0 0 8px",
          textWrap: "balance"
        }}>
          Writing &amp;
        </h1>
        <h1 style={{
          fontFamily: "var(--display)", fontStyle: "italic",
          fontSize: "clamp(52px, 7vw, 96px)",
          fontWeight: 400, lineHeight: 1.0, letterSpacing: "-0.02em",
          color: "var(--amber)", margin: "0 0 48px",
        }}>
          Machines
        </h1>

        <div style={{ display: "flex", gap: 60, flexWrap: "wrap", marginBottom: 64 }}>
          <div style={{ maxWidth: 440 }}>
            <p style={{
              fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.65,
              color: "var(--text)", margin: 0, fontWeight: 300
            }}>
              Your students are already using it. The question isn't whether AI will
              change first-year writing — it already has.
            </p>
          </div>
          <div style={{ maxWidth: 380 }}>
            <p style={{
              fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.7,
              color: "var(--text-muted)", margin: 0
            }}>
              This workshop doesn't ask you to love it or ban it. It asks you to{" "}
              <em>understand what it is</em> — and what it isn't — well enough to
              make a principled decision about your classroom.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          {[
            { id: "capabilities", label: "01 — Capabilities" },
            { id: "interactions", label: "02 — Interactions" },
            { id: "scenarios", label: "03 — Scenarios" },
            { id: "frameworks", label: "04 — Frameworks" },
            { id: "position", label: "05 — Your Position" },
          ].map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{
              background: "none", border: "1px solid var(--border)",
              color: "var(--text-muted)", fontFamily: "var(--mono)",
              fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "10px 20px", cursor: "pointer",
              transition: "all 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--amber)"; e.currentTarget.style.color = "var(--amber)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CAPABILITY MAP ────────────────────────────────────────────────────────

function CapabilitySection() {
  return (
    <section id="capabilities" data-screen-label="01 Capabilities"
      style={{ padding: "100px 40px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <SectionTag>01 — Capability Map</SectionTag>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 60 }}>
          <h2 style={{
            fontFamily: "var(--display)", fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text)",
            margin: 0, flex: "1 1 300px", textWrap: "balance"
          }}>
            What AI does — and doesn't do — in a writing context
          </h2>
          <p style={{
            fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.7,
            color: "var(--text-muted)", margin: 0, flex: "1 1 300px",
            maxWidth: 440, alignSelf: "flex-end"
          }}>
            These aren't moral judgments about the technology. They're descriptions of its actual capabilities. Understanding the difference is the first step toward any coherent response.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          {/* CAN column */}
          <div style={{ borderRight: "1px solid var(--border)" }}>
            <div style={{
              padding: "16px 32px 16px 0",
              borderBottom: "1px solid var(--border)",
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "var(--text-muted)"
            }}>What AI does well</div>
            {CAPABILITIES_DATA.can.map((item, i) => (
              <div key={i} style={{
                padding: "20px 32px 20px 0",
                borderBottom: i < CAPABILITIES_DATA.can.length - 1 ? "1px solid var(--border)" : "none"
              }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 17, color: "var(--text)", marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {item.note}
                </div>
              </div>
            ))}
          </div>

          {/* CANNOT column */}
          <div>
            <div style={{
              padding: "16px 0 16px 32px",
              borderBottom: "1px solid var(--border)",
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "var(--red)"
            }}>What AI cannot do</div>
            {CAPABILITIES_DATA.cannot.map((item, i) => (
              <div key={i} style={{
                padding: "20px 0 20px 32px",
                borderBottom: i < CAPABILITIES_DATA.cannot.length - 1 ? "1px solid var(--border)" : "none"
              }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 17, color: "var(--text)", marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {item.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        <FacilitatorNote time="20 min">
          Ask participants to read the left column silently first, then predict what will appear on the right before revealing it. What did they expect? What surprised them?{"\n\n"}
          The closing quotation ("writing without a writer") often generates the richest discussion — ask: what would it mean for your course if the writing had no writer behind it?
        </FacilitatorNote>

        <div style={{
          marginTop: 48, padding: "24px 28px",
          borderLeft: "3px solid var(--red)",
          background: "rgba(194, 64, 53, 0.06)"
        }}>
          <p style={{
            fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.7,
            color: "var(--text)", margin: 0, fontStyle: "italic"
          }}>
            "AI writing is not bad writing. It is writing without a writer — which means it is writing without risk, without stakes, without anything on the line. Whether that matters depends entirely on what you think writing is for."
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── SPOT THE AI ──────────────────────────────────────────────────────────

function SpotTheAI() {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = SPOT_ROUNDS[round];
  const showFacilitator = useContext(FacilitatorContext);

  const handleSelect = (label) => {
    if (revealed) return;
    setSelected(label);
  };

  const handleReveal = () => {
    if (!selected) return;
    const correct = current.passages.find(p => p.isAI)?.label;
    if (selected === correct) setScore(s => s + 1);
    setRevealed(true);
  };

  const handleNext = () => {
    if (round + 1 >= SPOT_ROUNDS.length) {
      setDone(true);
    } else {
      setRound(r => r + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const reset = () => { setRound(0); setSelected(null); setRevealed(false); setScore(0); setDone(false); };

  if (done) {
    return (
      <div style={{ maxWidth: 640 }}>
        <div style={{
          fontFamily: "var(--mono)", fontSize: 48, color: "var(--amber)",
          marginBottom: 16
        }}>{score}/{SPOT_ROUNDS.length}</div>
        <p style={{
          fontFamily: "var(--serif)", fontSize: 18, lineHeight: 1.7,
          color: "var(--text)", marginBottom: 24
        }}>
          {score === 3
            ? "You identified all three AI passages. Notice what gave them away — the same patterns appear in student submissions."
            : score === 2
            ? "You identified two of three. The one you missed is worth a closer look — what made it harder to place?"
            : "The difficulty of this exercise is the point. If it's hard for you, it's harder for a student who wrote under pressure."}
        </p>
        <p style={{
          fontFamily: "var(--serif)", fontSize: 15, lineHeight: 1.7,
          color: "var(--text-muted)", marginBottom: 32
        }}>
          Detection tools flag around 20% of AI text — and have known false positive rates that disproportionately affect multilingual writers. The question isn't whether you can detect it. It's what you want writing to do.
        </p>
        <button onClick={reset} style={{
          background: "none", border: "1px solid var(--border)",
          color: "var(--text-muted)", fontFamily: "var(--mono)",
          fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "10px 20px", cursor: "pointer"
        }}>Restart</button>
      </div>
    );
  }

  const aiPassage = current.passages.find(p => p.isAI);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-muted)" }}>
          Round {round + 1} of {SPOT_ROUNDS.length}
        </div>
        <div style={{
          fontFamily: "var(--mono)", fontSize: 12, color: "var(--amber)",
          display: "flex", gap: 6
        }}>
          {SPOT_ROUNDS.map((_, i) => (
            <span key={i} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: i < round ? "var(--amber)" : i === round ? "var(--amber)" : "var(--border)",
              opacity: i === round ? 1 : i < round ? 0.6 : 0.3
            }} />
          ))}
        </div>
      </div>

      <div style={{
        fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 17,
        color: "var(--text-muted)", marginBottom: 28
      }}>
        Topic: {current.topic}
      </div>

      <p style={{
        fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-muted)",
        letterSpacing: "0.06em", marginBottom: 20
      }}>
        Which passage was written by an AI? Click to select, then reveal.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {current.passages.map(p => {
          const isSelected = selected === p.label;
          const isAI = p.isAI;
          const bgColor = revealed
            ? isAI ? "rgba(194,64,53,0.08)" : "rgba(80,160,80,0.06)"
            : isSelected ? "rgba(232,151,10,0.06)" : "var(--surface)";
          const borderColor = revealed
            ? isAI ? "var(--red)" : "oklch(60% 0.14 150)"
            : isSelected ? "var(--amber)" : "var(--border)";

          return (
            <div key={p.label} onClick={() => handleSelect(p.label)} style={{
              padding: "24px", border: `1px solid ${borderColor}`,
              background: bgColor, cursor: revealed ? "default" : "pointer",
              transition: "all 0.2s", position: "relative"
            }}>
              <div style={{
                position: "absolute", top: 12, right: 14,
                fontFamily: "var(--mono)", fontSize: 11,
                color: revealed ? (isAI ? "var(--red)" : "oklch(60% 0.14 150)") : "var(--text-muted)",
                letterSpacing: "0.1em"
              }}>
                {revealed ? (isAI ? "AI ↑" : "Human ↑") : p.label}
              </div>
              <p style={{
                fontFamily: isAI && revealed ? "var(--mono)" : "var(--serif)",
                fontSize: 15, lineHeight: 1.75, color: "var(--text)", margin: 0,
                color: isAI && revealed ? "var(--ai-text)" : "var(--text)"
              }}>
                {p.text}
              </p>
            </div>
          );
        })}
      </div>

      {!revealed ? (
        <button onClick={handleReveal} disabled={!selected} style={{
          background: selected ? "var(--amber)" : "transparent",
          border: `1px solid ${selected ? "var(--amber)" : "var(--border)"}`,
          color: selected ? "#0f0e0c" : "var(--text-muted)",
          fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
          textTransform: "uppercase", padding: "12px 28px", cursor: selected ? "pointer" : "default",
          transition: "all 0.2s"
        }}>
          Reveal Answer
        </button>
      ) : (
        <div>
          <div style={{
            padding: "20px 24px", background: "var(--surface)",
            border: "1px solid var(--border)", marginBottom: 16
          }}>
            <div style={{
              fontFamily: "var(--mono)", fontSize: 11, color: "var(--red)",
              letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10
            }}>AI tells</div>
            <p style={{ fontFamily: "var(--serif)", fontSize: 15, lineHeight: 1.7, color: "var(--text)", margin: "0 0 16px" }}>
              {current.aiTells}
            </p>
            <div style={{
              fontFamily: "var(--mono)", fontSize: 11, color: "oklch(60% 0.14 150)",
              letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10
            }}>Human markers</div>
            <p style={{ fontFamily: "var(--serif)", fontSize: 15, lineHeight: 1.7, color: "var(--text)", margin: 0 }}>
              {current.humanTells}
            </p>
          </div>
          <button onClick={handleNext} style={{
            background: "var(--amber)", border: "none",
            color: "#0f0e0c", fontFamily: "var(--mono)", fontSize: 11,
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "12px 28px", cursor: "pointer"
          }}>
            {round + 1 < SPOT_ROUNDS.length ? "Next Round →" : "See Results →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── SIDE BY SIDE ─────────────────────────────────────────────────────────

function SideBySide() {
  const [showNotes, setShowNotes] = useState(false);

  const human = {
    text: "My uncle voted for the first time in 2016. He'd been in this country for thirty years and finally got his citizenship the year before. I assumed his vote would go the same way as mine — I'd heard him complain about the same things I complained about. But he voted for Trump, and at Thanksgiving he told me why, and I sat there with my fork in my hand not knowing what to say, because some of what he said made a terrible kind of sense. I didn't change my vote. But I had to stop using the word 'obviously' for a while.\n\nI keep thinking about what it means to be obviously right. Not just politically. In any conversation. 'Obviously' is a word that assumes everyone in the room has lived the same life, and usually it assumes that life is the one you've had. My uncle's life has not been mine. His 'obviously' is different from mine, and both of us were sure we were the one being reasonable.",
    notes: ["Specific time, place, person — earned detail", "The fork is a strange, precise gesture that costs something", "'Terrible kind of sense' — genuine intellectual discomfort", "Refuses the neat political lesson", "The second paragraph earns a larger claim from the specific scene"]
  };

  const ai = {
    text: "Encountering a differing perspective can be a powerful catalyst for personal growth and intellectual development. When we engage with viewpoints that challenge our existing beliefs, we are forced to examine our assumptions and consider new possibilities. This kind of open-minded dialogue is essential in a democratic society where people of different backgrounds and experiences must find ways to coexist and collaborate.\n\nOne of the most valuable skills we can develop is the ability to listen actively and empathetically to those who hold different views. Rather than dismissing opposing perspectives, we should seek to understand the experiences and reasoning that shape them. This does not mean we must abandon our own values, but it does require a willingness to engage seriously with ideas that may initially seem uncomfortable or unfamiliar.",
    notes: ["Abstract nouns where a scene should be: 'catalyst,' 'intellectual development'", "No specificity — could be about any disagreement from any decade", "'Democratic society' — political context without political risk", "The lesson is announced, not earned", "Second paragraph advises the reader how to think rather than showing thinking happening"]
  };

  return (
    <div>
      <div style={{
        fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 17,
        color: "var(--text-muted)", marginBottom: 24
      }}>
        Prompt: "Write about a time you encountered an argument that challenged something you'd always believed."
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, marginBottom: 24 }}>
        {[
          { label: "Human", data: human, isAI: false },
          { label: "AI-generated", data: ai, isAI: true }
        ].map(({ label, data, isAI }) => (
          <div key={label} style={{
            padding: "28px",
            borderLeft: isAI ? "1px solid var(--border)" : "none",
            background: isAI ? "rgba(140,160,190,0.04)" : "transparent"
          }}>
            <div style={{
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em",
              textTransform: "uppercase", marginBottom: 20,
              color: isAI ? "var(--ai-text)" : "oklch(60% 0.14 150)",
              display: "flex", alignItems: "center", gap: 8
            }}>
              <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />
              {label}
            </div>
            {data.text.split("\n\n").map((para, i) => (
              <p key={i} style={{
                fontFamily: isAI ? "var(--mono)" : "var(--serif)",
                fontSize: isAI ? 14 : 16,
                lineHeight: isAI ? 1.8 : 1.75,
                color: isAI ? "var(--ai-text)" : "var(--text)",
                marginBottom: 16, marginTop: 0
              }}>{para}</p>
            ))}

            {showNotes && (
              <div style={{ marginTop: 20, borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                <div style={{
                  fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12
                }}>Observations</div>
                {data.notes.map((note, i) => (
                  <div key={i} style={{
                    fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-muted)",
                    lineHeight: 1.6, paddingLeft: 12, borderLeft: "2px solid var(--border)",
                    marginBottom: 8
                  }}>
                    {note}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => setShowNotes(n => !n)} style={{
        background: "none", border: "1px solid var(--border)",
        color: "var(--text-muted)", fontFamily: "var(--mono)",
        fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
        padding: "10px 20px", cursor: "pointer"
      }}>
        {showNotes ? "Hide Annotations" : "Show Annotations"}
      </button>
    </div>
  );
}

// ─── AI STRUGGLES ─────────────────────────────────────────────────────────

function AIStruggles() {
  const [prompt, setPrompt] = useState(STRUGGLES_PROMPTS[0]);
  const [custom, setCustom] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [notes, setNotes] = useState("");

  const generate = async () => {
    setLoading(true);
    setOutput("");
    setShowReflection(false);
    const p = useCustom ? custom : prompt;
    try {
      const result = await window.claude.complete({
        messages: [{
          role: "user",
          content: `Write a short personal essay (3 paragraphs) responding to this prompt as a first-year college student would, in first person: "${p}"`
        }]
      });
      setOutput(result);
      setShowReflection(true);
    } catch (e) {
      setOutput("(Generation failed — please try again)");
    }
    setLoading(false);
  };

  return (
    <div>
      <p style={{
        fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.7,
        color: "var(--text-muted)", marginBottom: 24, marginTop: 0
      }}>
        Select a prompt that requires embodied knowledge, lived experience, or genuine risk.
        Generate the AI response. Then use the reflection questions below to examine what's missing.
      </p>

      <div style={{ marginBottom: 20 }}>
        {STRUGGLES_PROMPTS.map((p, i) => (
          <div key={i} onClick={() => { setPrompt(p); setUseCustom(false); }} style={{
            padding: "12px 16px", marginBottom: 4,
            border: `1px solid ${!useCustom && prompt === p ? "var(--amber)" : "var(--border)"}`,
            background: !useCustom && prompt === p ? "rgba(232,151,10,0.05)" : "transparent",
            cursor: "pointer", fontFamily: "var(--serif)", fontSize: 15, color: "var(--text)",
            lineHeight: 1.5, transition: "all 0.15s"
          }}>
            {p}
          </div>
        ))}
        <div onClick={() => setUseCustom(true)} style={{
          padding: "12px 16px", marginBottom: 8,
          border: `1px solid ${useCustom ? "var(--amber)" : "var(--border)"}`,
          cursor: "pointer"
        }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-muted)", marginBottom: useCustom ? 8 : 0 }}>
            Custom prompt
          </div>
          {useCustom && (
            <textarea value={custom} onChange={e => setCustom(e.target.value)}
              placeholder="Write your own prompt..."
              onClick={e => e.stopPropagation()}
              style={{
                width: "100%", background: "transparent", border: "none",
                color: "var(--text)", fontFamily: "var(--serif)", fontSize: 15,
                lineHeight: 1.6, resize: "vertical", minHeight: 60,
                outline: "none", boxSizing: "border-box"
              }} />
          )}
        </div>
      </div>

      <button onClick={generate} disabled={loading || (useCustom && !custom.trim())} style={{
        background: loading ? "transparent" : "var(--amber)", border: `1px solid var(--amber)`,
        color: loading ? "var(--amber)" : "#0f0e0c",
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
        textTransform: "uppercase", padding: "12px 28px", cursor: "pointer",
        marginBottom: 28, transition: "all 0.2s"
      }}>
        {loading ? "Generating..." : "Generate AI Response"}
      </button>

      {output && (
        <div style={{ marginBottom: 28 }}>
          <div style={{
            fontFamily: "var(--mono)", fontSize: 11, color: "var(--ai-text)",
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12,
            display: "flex", alignItems: "center", gap: 8
          }}>
            <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />
            AI-generated response
          </div>
          <div style={{
            padding: "24px", background: "rgba(140,160,190,0.04)",
            border: "1px solid rgba(140,160,190,0.15)"
          }}>
            {output.split("\n\n").filter(Boolean).map((para, i) => (
              <p key={i} style={{
                fontFamily: "var(--mono)", fontSize: 14, lineHeight: 1.85,
                color: "var(--ai-text)", margin: "0 0 16px"
              }}>{para}</p>
            ))}
          </div>
        </div>
      )}

      {showReflection && (
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 28 }}>
          <div style={{
            fontFamily: "var(--mono)", fontSize: 11, color: "var(--amber)",
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16
          }}>
            Reflection questions
          </div>
          {[
            "What's absent from this writing that would be present if a student had actually experienced this?",
            "What work does this writing refuse to do? What risks does it avoid?",
            "If a student submitted this, what would they have learned from writing it?",
            "What would you say to this student in the margin that would mean something?"
          ].map((q, i) => (
            <p key={i} style={{
              fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.7,
              color: "var(--text)", margin: "0 0 12px",
              paddingLeft: 16, borderLeft: "2px solid var(--border)"
            }}>
              {q}
            </p>
          ))}
          <textarea value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="Write your observations here..."
            style={{
              width: "100%", marginTop: 16, background: "var(--surface)",
              border: "1px solid var(--border)", color: "var(--text)",
              fontFamily: "var(--serif)", fontSize: 15, lineHeight: 1.7,
              padding: "16px", boxSizing: "border-box", resize: "vertical",
              minHeight: 100, outline: "none"
            }} />
        </div>
      )}
    </div>
  );
}

// ─── FEEDBACK EVALUATOR ────────────────────────────────────────────────────

function FeedbackEvaluator() {
  const [aiFeedback, setAiFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [yourFeedback, setYourFeedback] = useState("");
  const [showYours, setShowYours] = useState(false);

  const getFeedback = async () => {
    setLoading(true);
    setAiFeedback("");
    setShowYours(false);
    try {
      const result = await window.claude.complete({
        messages: [{
          role: "user",
          content: `You are a writing instructor giving feedback on a first-year student's paragraph. Give specific, encouraging feedback with concrete suggestions for improvement. Here is the student's paragraph:\n\n"${STUDENT_PARAGRAPH}"`
        }]
      });
      setAiFeedback(result);
      setShowYours(true);
    } catch (e) {
      setAiFeedback("(Generation failed — please try again)");
    }
    setLoading(false);
  };

  return (
    <div>
      <p style={{
        fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.7,
        color: "var(--text-muted)", marginBottom: 24, marginTop: 0
      }}>
        Read this student paragraph. Then generate AI feedback on it. Then consider: what did the feedback actually do?
      </p>

      <div style={{
        padding: "28px", background: "var(--surface)",
        border: "1px solid var(--border)", marginBottom: 24
      }}>
        <div style={{
          fontFamily: "var(--mono)", fontSize: 11, color: "oklch(60% 0.14 150)",
          letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16
        }}>Student paragraph</div>
        <p style={{
          fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.8,
          color: "var(--text)", margin: 0, fontStyle: "italic"
        }}>
          {STUDENT_PARAGRAPH}
        </p>
      </div>

      {!aiFeedback && (
        <button onClick={getFeedback} disabled={loading} style={{
          background: loading ? "transparent" : "var(--amber)",
          border: "1px solid var(--amber)",
          color: loading ? "var(--amber)" : "#0f0e0c",
          fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
          textTransform: "uppercase", padding: "12px 28px", cursor: "pointer",
          marginBottom: 28, transition: "all 0.2s"
        }}>
          {loading ? "Generating feedback..." : "Generate AI Feedback"}
        </button>
      )}

      {aiFeedback && (
        <div style={{ marginBottom: 28 }}>
          <div style={{
            fontFamily: "var(--mono)", fontSize: 11, color: "var(--ai-text)",
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12,
            display: "flex", alignItems: "center", gap: 8
          }}>
            <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />
            AI-generated feedback
          </div>
          <div style={{
            padding: "24px", background: "rgba(140,160,190,0.04)",
            border: "1px solid rgba(140,160,190,0.15)", marginBottom: 24
          }}>
            {aiFeedback.split("\n\n").filter(Boolean).map((para, i) => (
              <p key={i} style={{
                fontFamily: "var(--mono)", fontSize: 14, lineHeight: 1.85,
                color: "var(--ai-text)", margin: "0 0 12px"
              }}>{para}</p>
            ))}
          </div>

          <div style={{
            padding: "20px 24px",
            borderLeft: "3px solid var(--red)",
            background: "rgba(194,64,53,0.06)", marginBottom: 24
          }}>
            <div style={{
              fontFamily: "var(--mono)", fontSize: 11, color: "var(--red)",
              letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12
            }}>Evaluate the feedback</div>
            {[
              "Could this feedback have been written about any essay on any topic?",
              "Does it engage with the student's specific argument — the word 'obvious,' the father, the question of who gets to call something common sense?",
              "What would a student understand about their own thinking after reading this?",
              "What does AI feedback optimize for — and what does it not know how to value?"
            ].map((q, i) => (
              <p key={i} style={{
                fontFamily: "var(--serif)", fontSize: 15, lineHeight: 1.7,
                color: "var(--text)", margin: "0 0 8px"
              }}>
                {i + 1}. {q}
              </p>
            ))}
          </div>
        </div>
      )}

      {showYours && (
        <div>
          <div style={{
            fontFamily: "var(--mono)", fontSize: 11, color: "oklch(60% 0.14 150)",
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12
          }}>
            What would YOU say to this student?
          </div>
          <textarea value={yourFeedback} onChange={e => setYourFeedback(e.target.value)}
            placeholder="Write your own feedback here — the comment you'd actually put on this paper..."
            style={{
              width: "100%", background: "var(--surface)",
              border: "1px solid var(--border)", color: "var(--text)",
              fontFamily: "var(--serif)", fontSize: 15, lineHeight: 1.7,
              padding: "16px", boxSizing: "border-box",
              resize: "vertical", minHeight: 120, outline: "none"
            }} />
        </div>
      )}
    </div>
  );
}

// ─── INTERACTIONS SECTION ──────────────────────────────────────────────────

function InteractionsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Spot the AI", desc: "Can you tell the difference?", component: <SpotTheAI /> },
    { label: "Side by Side", desc: "Human vs. AI on the same prompt", component: <SideBySide /> },
    { label: "AI Struggles", desc: "Watch AI attempt embodied experience", component: <AIStruggles /> },
    { label: "Evaluate Feedback", desc: "Is AI feedback actually useful?", component: <FeedbackEvaluator /> },
  ];

  return (
    <section id="interactions" data-screen-label="02 Interactions"
      style={{ padding: "100px 40px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <SectionTag>02 — Provocative Interactions</SectionTag>
        <h2 style={{
          fontFamily: "var(--display)", fontSize: "clamp(32px, 4vw, 52px)",
          fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text)",
          margin: "0 0 48px", maxWidth: 600, textWrap: "balance"
        }}>
          Four exercises that make AI's affordances visible
        </h2>

        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)", marginBottom: 48 }}>
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "16px 24px", position: "relative",
              borderBottom: activeTab === i ? "2px solid var(--amber)" : "2px solid transparent",
              marginBottom: -1
            }}>
              <div style={{
                fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: activeTab === i ? "var(--amber)" : "var(--text-muted)",
                marginBottom: 4, transition: "color 0.2s"
              }}>{tab.label}</div>
              <div style={{
                fontFamily: "var(--serif)", fontSize: 12,
                color: activeTab === i ? "var(--text-muted)" : "transparent",
                transition: "color 0.2s"
              }}>{tab.desc}</div>
            </button>
          ))}
        </div>

        <div style={{ minHeight: 400 }}>
          {tabs[activeTab].component}
        </div>
      </div>
    </section>
  );
}

// ─── SCENARIOS ────────────────────────────────────────────────────────────

function ScenariosSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="scenarios" data-screen-label="03 Scenarios"
      style={{ padding: "100px 40px", borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <SectionTag>03 — Student Scenarios</SectionTag>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 56 }}>
          <h2 style={{
            fontFamily: "var(--display)", fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text)",
            margin: 0, flex: "1 1 300px", textWrap: "balance"
          }}>
            Four students. Four different choices. No easy answers.
          </h2>
          <p style={{
            fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.7,
            color: "var(--text-muted)", margin: 0, flex: "1 1 300px",
            maxWidth: 440, alignSelf: "flex-end"
          }}>
            These scenarios are composites drawn from real situations in writing classrooms. They don't resolve neatly. That's the point.
          </p>
        </div>
        <FacilitatorNote time="30–45 min">
          Assign one scenario per small group. Ask each group to discuss from three perspectives: the student, the instructor, the writing program. Report out: where was there consensus? Where wasn't there?{"\n\n"}The Priya scenario generates the richest equity conversation. The Marcus scenario generates the most disagreement about authorship. The Sofia scenario is most likely to reveal participants' own unexamined assumptions.
        </FacilitatorNote>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 1, background: "var(--border)" }}>
          {SCENARIOS_DATA.map((scenario) => (
            <div key={scenario.id} style={{ background: "var(--surface)" }}>
              <div style={{ padding: "32px 28px" }}>
                <div style={{
                  fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-muted)",
                  letterSpacing: "0.1em", marginBottom: 16
                }}>{scenario.label}</div>
                <h3 style={{
                  fontFamily: "var(--display)", fontSize: 26, fontWeight: 400,
                  letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 16px"
                }}>{scenario.title}</h3>
                <p style={{
                  fontFamily: "var(--serif)", fontSize: 14, lineHeight: 1.7,
                  color: "var(--text-muted)", margin: 0
                }}>{scenario.context}</p>
              </div>
              <div style={{ borderTop: "1px solid var(--border)" }}>
                <button onClick={() => setOpen(open === scenario.id ? null : scenario.id)}
                  style={{
                    width: "100%", padding: "14px 28px",
                    background: "none", border: "none", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-muted)",
                    letterSpacing: "0.1em", textTransform: "uppercase"
                  }}>
                  Discussion questions
                  <span style={{
                    transform: open === scenario.id ? "rotate(45deg)" : "none",
                    transition: "transform 0.2s", fontSize: 16, lineHeight: 1
                  }}>+</span>
                </button>
                {open === scenario.id && (
                  <div style={{ padding: "0 28px 24px" }}>
                    {scenario.questions.map((q, i) => (
                      <p key={i} style={{
                        fontFamily: "var(--serif)", fontSize: 14, lineHeight: 1.7,
                        color: "var(--text)", margin: "0 0 10px",
                        paddingLeft: 12, borderLeft: "2px solid var(--amber)"
                      }}>
                        {q}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FRAMEWORKS ————————————————————————————————————————————————

function FrameworksSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="frameworks" data-screen-label="04 Frameworks"
      style={{ padding: "100px 40px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <SectionTag>04 — Pedagogical Frameworks</SectionTag>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 56 }}>
          <h2 style={{
            fontFamily: "var(--display)", fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text)",
            margin: 0, flex: "1 1 300px", textWrap: "balance"
          }}>
            Four coherent positions on AI in the writing classroom
          </h2>
          <p style={{
            fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.7,
            color: "var(--text-muted)", margin: 0, flex: "1 1 300px",
            maxWidth: 440, alignSelf: "flex-end"
          }}>
            Each has a real rationale. Each has real tensions. The goal isn't to choose the correct one — it's to choose one you can defend with integrity.
          </p>
        </div>
        <FacilitatorNote time="20 min">
          Before showing this section, ask participants to write a one-sentence policy for their course right now. Compare to the four frameworks.{"\n\n"}The Redesign framework often feels most appealing — surface the labor question: what does it actually take to redesign assignments at scale, especially for those teaching 4 sections? The Prohibition framework often feels most principled but least sustainable — ask: what happens the first time a student submits AI text anyway?
        </FacilitatorNote>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 1, background: "var(--border)" }}>
          {FRAMEWORKS_DATA.map((fw) => (
            <div key={fw.title} style={{
              background: "var(--bg)", display: "flex", flexDirection: "column"
            }}>
              <div style={{ padding: "28px", flex: 1 }}>
                <div style={{
                  width: 32, height: 3, background: fw.accent,
                  marginBottom: 20
                }} />
                <h3 style={{
                  fontFamily: "var(--display)", fontSize: 28, fontWeight: 400,
                  letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 16px"
                }}>{fw.title}</h3>
                <p style={{
                  fontFamily: "var(--serif)", fontSize: 14, lineHeight: 1.7,
                  color: "var(--text-muted)", margin: "0 0 20px"
                }}>{fw.rationale}</p>

                <div style={{
                  padding: "12px 16px", background: "var(--surface)",
                  border: "1px solid var(--border)", marginBottom: 20
                }}>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-muted)",
                    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8
                  }}>Example policy language</div>
                  <p style={{
                    fontFamily: "var(--mono)", fontSize: 12, lineHeight: 1.65,
                    color: "var(--text)", margin: 0, fontStyle: "italic"
                  }}>{fw.policy}</p>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border)" }}>
                <button onClick={() => setExpanded(expanded === fw.title ? null : fw.title)}
                  style={{
                    width: "100%", padding: "14px 28px", background: "none", border: "none",
                    cursor: "pointer", display: "flex", justifyContent: "space-between",
                    alignItems: "center", fontFamily: "var(--mono)", fontSize: 11,
                    color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase"
                  }}>
                  Strengths &amp; tensions
                  <span style={{
                    transform: expanded === fw.title ? "rotate(45deg)" : "none",
                    transition: "transform 0.2s", fontSize: 16
                  }}>+</span>
                </button>
                {expanded === fw.title && (
                  <div style={{ padding: "0 28px 24px" }}>
                    <div style={{
                      fontFamily: "var(--mono)", fontSize: 10, color: "oklch(60% 0.14 150)",
                      letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8
                    }}>Strengths</div>
                    {fw.strengths.map((s, i) => (
                      <p key={i} style={{
                        fontFamily: "var(--serif)", fontSize: 13, lineHeight: 1.6,
                        color: "var(--text-muted)", margin: "0 0 4px",
                        paddingLeft: 10, borderLeft: "2px solid oklch(60% 0.14 150)"
                      }}>{s}</p>
                    ))}
                    <div style={{
                      fontFamily: "var(--mono)", fontSize: 10, color: "var(--red)",
                      letterSpacing: "0.1em", textTransform: "uppercase", margin: "12px 0 8px"
                    }}>Tensions</div>
                    {fw.tensions.map((t, i) => (
                      <p key={i} style={{
                        fontFamily: "var(--serif)", fontSize: 13, lineHeight: 1.6,
                        color: "var(--text-muted)", margin: "0 0 4px",
                        paddingLeft: 10, borderLeft: "2px solid var(--red)"
                      }}>{t}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── POSITION BUILDER ─────────────────────────────────────────────────────

function PositionSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    writingFor: [],
    writingForOther: "",
    concerns: [],
    concernsOther: "",
    framework: "",
    frameworkNote: "",
    statement: ""
  });
  const [generated, setGenerated] = useState(false);

  const writingForOptions = [
    "Developing students' capacity to think",
    "Teaching students to communicate in professional contexts",
    "Fostering voice, identity, and self-expression",
    "Transmitting discipline-specific conventions",
    "Building habits of revision and reflection",
    "Preparing students for citizenship and public discourse"
  ];

  const concernOptions = [
    "Students bypassing the cognitive work of drafting",
    "Inability to distinguish AI from student writing",
    "Erosion of student voice and authority",
    "Equity concerns — unequal access to AI tools",
    "Academic integrity and institutional policy",
    "Students not developing skills they'll need",
    "AI feedback replacing genuine instructor response"
  ];

  const toggle = (field, val) => {
    setAnswers(a => ({
      ...a,
      [field]: a[field].includes(val)
        ? a[field].filter(v => v !== val)
        : [...a[field], val]
    }));
  };

  const buildStatement = () => {
    const { writingFor, writingForOther, concerns, concernsOther, framework, frameworkNote } = answers;
    const allWritingFor = [...writingFor, ...(writingForOther ? [writingForOther] : [])];
    const allConcerns = [...concerns, ...(concernsOther ? [concernsOther] : [])];

    let stmt = `I teach first-year writing because I believe writing is a practice that ${allWritingFor.length > 0 ? allWritingFor.map(s => s.toLowerCase()).join(", and ") : "develops students as thinkers and communicators"}.\n\n`;

    if (allConcerns.length > 0) {
      stmt += `My primary concerns about AI in my classroom center on ${allConcerns.map(s => s.toLowerCase()).join("; ")}.\n\n`;
    }

    if (framework) {
      const fw = FRAMEWORKS_DATA.find(f => f.title === framework);
      stmt += `Given these beliefs and concerns, my approach this term will be one of ${framework.toLowerCase()}. `;
      if (fw) stmt += fw.rationale + "\n\n";
    }

    stmt += `[Continue drafting your position here — address: What will you tell students on the first day? What will your policy actually permit or prohibit? What will you do when you encounter a case that tests your position?]`;

    setAnswers(a => ({ ...a, statement: stmt }));
    setGenerated(true);
    setStep(3);
  };

  const STEPS = [
    {
      label: "What is writing for?",
      content: (
        <div>
          <p style={{
            fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.7,
            color: "var(--text-muted)", marginBottom: 24, marginTop: 0
          }}>
            Select all that apply to your course. Your answer here will shape everything that follows — including which AI concerns are most urgent for you.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            {writingForOptions.map(opt => {
              const sel = answers.writingFor.includes(opt);
              return (
                <div key={opt} onClick={() => toggle("writingFor", opt)} style={{
                  padding: "14px 16px", border: `1px solid ${sel ? "var(--amber)" : "var(--border)"}`,
                  background: sel ? "rgba(232,151,10,0.06)" : "transparent",
                  cursor: "pointer", fontFamily: "var(--serif)", fontSize: 15,
                  color: sel ? "var(--text)" : "var(--text-muted)", lineHeight: 1.5,
                  transition: "all 0.15s"
                }}>
                  {opt}
                </div>
              );
            })}
          </div>
          <input value={answers.writingForOther}
            onChange={e => setAnswers(a => ({ ...a, writingForOther: e.target.value }))}
            placeholder="Other: writing in my course is for..."
            style={{
              width: "100%", background: "transparent", border: "1px solid var(--border)",
              color: "var(--text)", fontFamily: "var(--serif)", fontSize: 15,
              padding: "12px 16px", boxSizing: "border-box", outline: "none"
            }} />
        </div>
      )
    },
    {
      label: "What are your concerns?",
      content: (
        <div>
          <p style={{
            fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.7,
            color: "var(--text-muted)", marginBottom: 24, marginTop: 0
          }}>
            Select the concerns that feel most urgent in your specific context. You don't need to select all of them — focus on what would actually change how you teach.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            {concernOptions.map(opt => {
              const sel = answers.concerns.includes(opt);
              return (
                <div key={opt} onClick={() => toggle("concerns", opt)} style={{
                  padding: "14px 16px", border: `1px solid ${sel ? "var(--red)" : "var(--border)"}`,
                  background: sel ? "rgba(194,64,53,0.06)" : "transparent",
                  cursor: "pointer", fontFamily: "var(--serif)", fontSize: 15,
                  color: sel ? "var(--text)" : "var(--text-muted)", lineHeight: 1.5,
                  transition: "all 0.15s"
                }}>
                  {opt}
                </div>
              );
            })}
          </div>
          <input value={answers.concernsOther}
            onChange={e => setAnswers(a => ({ ...a, concernsOther: e.target.value }))}
            placeholder="Other concern: ..."
            style={{
              width: "100%", background: "transparent", border: "1px solid var(--border)",
              color: "var(--text)", fontFamily: "var(--serif)", fontSize: 15,
              padding: "12px 16px", boxSizing: "border-box", outline: "none"
            }} />
        </div>
      )
    },
    {
      label: "Which framework fits?",
      content: (
        <div>
          <p style={{
            fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.7,
            color: "var(--text-muted)", marginBottom: 24, marginTop: 0
          }}>
            Based on your beliefs and concerns, which approach feels most aligned with your values? You can revise this — the goal is to have a position you can articulate, not a permanent commitment.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {FRAMEWORKS_DATA.map(fw => {
              const sel = answers.framework === fw.title;
              return (
                <div key={fw.title} onClick={() => setAnswers(a => ({ ...a, framework: fw.title }))} style={{
                  padding: "16px 20px", border: `1px solid ${sel ? fw.accent : "var(--border)"}`,
                  background: sel ? "rgba(255,255,255,0.03)" : "transparent",
                  cursor: "pointer", transition: "all 0.15s",
                  display: "flex", alignItems: "flex-start", gap: 16
                }}>
                  <div style={{ width: 4, height: 40, background: fw.accent, flexShrink: 0, marginTop: 4 }} />
                  <div>
                    <div style={{
                      fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: sel ? "var(--text)" : "var(--text-muted)",
                      marginBottom: 6
                    }}>{fw.title}</div>
                    <div style={{
                      fontFamily: "var(--serif)", fontSize: 14, lineHeight: 1.65,
                      color: "var(--text-muted)"
                    }}>{fw.rationale}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <textarea value={answers.frameworkNote}
            onChange={e => setAnswers(a => ({ ...a, frameworkNote: e.target.value }))}
            placeholder="What draws you to this approach? What makes you uncertain about it?"
            style={{
              width: "100%", background: "transparent", border: "1px solid var(--border)",
              color: "var(--text)", fontFamily: "var(--serif)", fontSize: 15, lineHeight: 1.7,
              padding: "14px 16px", boxSizing: "border-box", outline: "none",
              resize: "vertical", minHeight: 80
            }} />
        </div>
      )
    },
    {
      label: "Draft your position",
      content: (
        <div>
          <p style={{
            fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.7,
            color: "var(--text-muted)", marginBottom: 20, marginTop: 0
          }}>
            Below is a starting draft assembled from your answers. It is not a finished statement — it is a scaffold. Edit it, push back on it, complete the bracketed sections, or delete it entirely and write your own.
          </p>
          <textarea value={answers.statement}
            onChange={e => setAnswers(a => ({ ...a, statement: e.target.value }))}
            style={{
              width: "100%", background: "var(--surface)",
              border: "1px solid var(--border)", color: "var(--text)",
              fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.8,
              padding: "20px", boxSizing: "border-box",
              resize: "vertical", minHeight: 320, outline: "none"
            }} />
          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            <button onClick={() => {
              const el = document.createElement("textarea");
              el.value = answers.statement;
              document.body.appendChild(el);
              el.select();
              document.execCommand("copy");
              document.body.removeChild(el);
            }} style={{
              background: "none", border: "1px solid var(--border)",
              color: "var(--text-muted)", fontFamily: "var(--mono)",
              fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "10px 20px", cursor: "pointer"
            }}>
              Copy to Clipboard
            </button>
            <button onClick={() => { setStep(0); setGenerated(false); setAnswers({ writingFor: [], writingForOther: "", concerns: [], concernsOther: "", framework: "", frameworkNote: "", statement: "" }); }}
              style={{
                background: "none", border: "1px solid var(--border)",
                color: "var(--text-muted)", fontFamily: "var(--mono)",
                fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "10px 20px", cursor: "pointer"
              }}>
              Start Over
            </button>
          </div>
        </div>
      )
    }
  ];

  const canProceed = () => {
    if (step === 0) return answers.writingFor.length > 0 || answers.writingForOther;
    if (step === 1) return answers.concerns.length > 0 || answers.concernsOther;
    if (step === 2) return answers.framework;
    return true;
  };

  return (
    <section id="position" data-screen-label="05 Position Builder"
      style={{ padding: "100px 40px", borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <SectionTag>05 — Position Builder</SectionTag>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 56 }}>
          <h2 style={{
            fontFamily: "var(--display)", fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text)",
            margin: 0, flex: "1 1 300px", textWrap: "balance"
          }}>
            Draft your position
          </h2>
          <p style={{
            fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.7,
            color: "var(--text-muted)", margin: 0, flex: "1 1 300px",
            maxWidth: 440, alignSelf: "flex-end"
          }}>
            A position statement isn't a permanent commitment — it's a document that makes your reasoning visible to yourself and your students. Three questions, then a draft you own.
          </p>
        </div>
        <FacilitatorNote time="30 min (or async)">
          Works well as a closing activity or between-session homework. Consider sharing completed statements in a shared doc — the variation across participants is itself a teaching moment about the lack of consensus in the field.{"\n\n"}Remind participants that the draft the tool produces is assembled from their own answers, not generated by AI. They own it.
        </FacilitatorNote>

        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 0 }}>
          {/* Step nav */}
          <div style={{ borderRight: "1px solid var(--border)", paddingRight: 32 }}>
            {STEPS.map((s, i) => (
              <div key={i} onClick={() => { if (i <= step || generated) setStep(i); }}
                style={{
                  padding: "16px 0", borderBottom: "1px solid var(--border)",
                  cursor: i <= step || generated ? "pointer" : "default",
                  opacity: i > step && !generated ? 0.35 : 1
                }}>
                <div style={{
                  fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: step === i ? "var(--amber)" : "var(--text-muted)",
                  marginBottom: 4
                }}>0{i + 1}</div>
                <div style={{
                  fontFamily: "var(--serif)", fontSize: 14,
                  color: step === i ? "var(--text)" : "var(--text-muted)",
                  lineHeight: 1.4
                }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Step content */}
          <div style={{ paddingLeft: 48 }}>
            <div style={{
              fontFamily: "var(--display)", fontSize: 26, fontWeight: 400,
              color: "var(--text)", marginBottom: 28, letterSpacing: "-0.01em"
            }}>
              {STEPS[step].label}
            </div>
            {STEPS[step].content}
            {step < 3 && (
              <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
                {step < 2 ? (
                  <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} style={{
                    background: canProceed() ? "var(--amber)" : "transparent",
                    border: `1px solid ${canProceed() ? "var(--amber)" : "var(--border)"}`,
                    color: canProceed() ? "#0f0e0c" : "var(--text-muted)",
                    fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
                    textTransform: "uppercase", padding: "12px 28px",
                    cursor: canProceed() ? "pointer" : "default", transition: "all 0.2s"
                  }}>
                    Continue →
                  </button>
                ) : (
                  <button onClick={buildStatement} disabled={!canProceed()} style={{
                    background: canProceed() ? "var(--amber)" : "transparent",
                    border: `1px solid ${canProceed() ? "var(--amber)" : "var(--border)"}`,
                    color: canProceed() ? "#0f0e0c" : "var(--text-muted)",
                    fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em",
                    textTransform: "uppercase", padding: "12px 28px",
                    cursor: canProceed() ? "pointer" : "default", transition: "all 0.2s"
                  }}>
                    Build My Draft →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      padding: "48px 40px", borderTop: "1px solid var(--border)",
      display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      flexWrap: "wrap", gap: 24
    }}>
      <div>
        <div style={{
          fontFamily: "var(--display)", fontSize: 20,
          color: "var(--text)", marginBottom: 8
        }}>Writing &amp; Machines</div>
        <div style={{
          fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-muted)",
          letterSpacing: "0.1em"
        }}>A faculty workshop for the present tense</div>
      </div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-muted)", lineHeight: 1.8 }}>
        <div>Rooted in the WPA Outcomes Statement (4th ed.)</div>
        <div>NCTE Position Statement on AI in English Education</div>
        <div>Council of Writing Program Administrators</div>
      </div>
    </footer>
  );
}

// ─── EXPORTS ──────────────────────────────────────────────────────────────

Object.assign(window, {
  SiteNav, HeroSection, CapabilitySection, InteractionsSection,
  ScenariosSection, FrameworksSection, PositionSection, Footer,
  FacilitatorContext
});
