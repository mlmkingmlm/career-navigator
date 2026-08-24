import { lazy, Suspense } from "react";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { UserProvider } from "./contexts/UserContext";
import LandingNavbar from "./components/LandingNavbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomeSkeleton from "./components/skeleton/HomeSkeleton";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const ResumeScreening = lazy(() => import("./pages/ResumeScreening"));
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));
const ResourceChat = lazy(() => import("./pages/ResourceChat"));
const SkillGap = lazy(() => import("./pages/SkillGap"));
const JobMatching = lazy(() => import("./pages/JobMatching"));

const Dashboard = lazy(() => import("./pages/Dashboard"));

const ResumesCreated = lazy(() => import("./pages/dashboard/ResumesCreated"));
const ResumesUploaded = lazy(() => import("./pages/dashboard/ResumesUploaded"));
const ResourcesList = lazy(() => import("./pages/dashboard/ResourcesList"));
const JobsList = lazy(() => import("./pages/dashboard/JobsList"));
const ChatHistoryList = lazy(() => import("./pages/dashboard/ChatHistoryList"));

const Features = lazy(() => import("./pages/Features"));
const Journey = lazy(() => import("./pages/Journey"));
const About = lazy(() => import("./pages/About"));

const Quiz = lazy(() => import("./pages/dashboard/Quiz"))



const queryClient = new QueryClient();

const LandingLayout = () => (
  <>
    <LandingNavbar />
    <Outlet />
    <Footer />
  </>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense
              fallback={<HomeSkeleton />}>
              <Routes>
                <Route element={<LandingLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/journey" element={<Journey />} />
                  <Route path="/about" element={<About />} />
                </Route>
                <Route path="/resume-screening" element={<ResumeScreening />} />
                <Route path="/resume-builder" element={<ResumeBuilder />} />
                <Route path="/resources" element={<ResourceChat />} />
                <Route path="/skill-gap" element={<SkillGap />} />
                <Route path="/jobs" element={<JobMatching />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/quiz" element={<Quiz />} />
                <Route path="/dashboard/resumes/created" element={<ResumesCreated />} />
                <Route path="/dashboard/resumes/uploaded" element={<ResumesUploaded />} />
                <Route path="/dashboard/resources" element={<ResourcesList />} />
                <Route path="/dashboard/jobs" element={<JobsList />} />
                <Route path="/dashboard/chat-history" element={<ChatHistoryList />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
