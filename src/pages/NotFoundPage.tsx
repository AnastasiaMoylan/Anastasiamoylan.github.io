import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="py-24 text-center">
      <div className="content-container">
        <p className="text-[5rem] font-bold text-secondary leading-none mb-4">404</p>
        <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-foreground mb-4">
          Page not found
        </h1>
        <p className="text-[1.0625rem] text-muted-foreground mb-10 max-w-[32rem] mx-auto">
          That page doesn&apos;t exist, but there&apos;s plenty here worth looking at.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button to="/" variant="primary">Go to Home</Button>
          <Button to="/work" variant="outline">View Case Studies</Button>
        </div>
      </div>
    </div>
  );
}
