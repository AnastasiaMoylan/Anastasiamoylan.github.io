import SectionHeading from "../components/ui/SectionHeading";

const principles = [
 {
    title: "Design flows, not screens",
    body: "I don't start with the screen. I start by walking the whole flow: who's doing what, where they're coming from, what happens when something breaks, how they get back on track. The stuff that looks great in a demo and falls apart in production almost always skipped that part.",
},
{
    title: "Design through implementation",
    body: "Design doesn't end at handoff. If engineering can't actually build something in the time or stack they've got, that's not a finished design. It's a decision nobody's made yet. I sit in on sprint reviews and QA on purpose, so those trade-offs get made out loud instead of getting discovered three days before launch.",
},
{
    title: "Design holistically, not in isolation",
    body: "A pattern rarely stays where you put it. Solve something new in one screen and move on, and someone inherits that inconsistency six months later without knowing why it's there. So new patterns get defined and documented into the system instead of quietly worked around.",
},
{
    title: "Make AI uncertainty visible, and every consequential action reversible",
    body: "People don't trust AI because it sounds confident. They trust it because they can check the work. Generated output needs to show its reasoning, not just hand over an answer. Loading states need to say what's actually happening, not just spin. And anything AI recommends, especially the high-stakes calls, needs a moment where someone can look at it, edit it, and pull it back if it's wrong.",
},
{
    title: "Critique in service of the decision, not the deliverable",
    body: "Critique goes sideways the moment it turns into defending a screen. I try to keep it on the solution instead: here's what we were trying to achieve, does this actually deliver it. Half the time the useful question isn't which option is better. It's whether either one delivers the right outcome.",
},
{
    title: "Coach judgment, not just output",
    body: "Telling someone what to fix teaches them to fix that one thing. Telling them why, including the research behind it, the constraint that boxed us in, or the exec who pushed back, teaches them to make the call themselves next time. That's the feedback I try to actually give.",
},
{
    title: "Continuous improvement, driven by evidence",
    body: "I've thrown out navigation I liked because usability testing said otherwise. Killed a feature after a POC didn't hold up. Swapped tabs for side-by-side once research showed people actually preferred it. None of that feels great in the moment, but if research can't change my mind, I'm not sure why I ran it.",
},
];

export default function PhilosophyPage() {
  return (
    <div className="py-16 pb-24">
      <div className="content-container">
        <SectionHeading
          eyebrow="Design philosophy"
          title="The whole system, not just the screen"
          subtitle="Seven principles I've tested against real engagements: not a manifesto, but a record of what has consistently produced better outcomes."
        />

        <div className="max-w-[52rem] mt-12 pb-12 border-b border-border">
          <blockquote className="text-[clamp(1.25rem,3vw,1.625rem)] font-medium text-foreground leading-[1.5] italic pl-6 border-l-[3px] border-primary">
            &ldquo; Good product design is what makes a system understandable: getting the flows right, designing the data well, and treating AI as core to the experience, not an afterthought. &rdquo;
          </blockquote>
        </div>

        <div className="flex flex-col gap-12 max-w-[52rem] mt-12">
          {principles.map(({ title, body }, i) => (
            <div key={title} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="text-xl font-bold text-foreground">{title}</h2>
              <p className="text-base text-muted-foreground leading-[1.75]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
