import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import ReactGA from "react-ga4";
import { getPageMeta } from "../data/pageMeta";
import AppShell from "../components/layout/AppShell";
import HomePage from "../pages/HomePage";
import WorkPage from "../pages/WorkPage";
import CaseStudyPage from "../pages/CaseStudyPage";
import PhilosophyPage from "../pages/PhilosophyPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import ResumePage from "../pages/ResumePage";
import NotFoundPage from "../pages/NotFoundPage";

function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function DocumentHead() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = getPageMeta(pathname);
    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", meta.canonical);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", meta.canonical);
  }, [pathname]);
  return null;
}

export default function AppRouter() {
  return (
    <>
      <PageViewTracker />
      <ScrollToTop />
      <DocumentHead />
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="work/:slug" element={<CaseStudyPage />} />
          <Route path="philosophy" element={<PhilosophyPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
