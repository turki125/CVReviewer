"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Fuel,
  RadioTower,
  Star,
  User,
  type LucideIcon,
} from "lucide-react";
import type { InterviewSetupInput } from "@/lib/types";

const SetupInterviewPage = () => {
  return (
    <iframe
      src="/SetupInterviewCoach.html"
      title="Setup Interview"
      style={{ width: "100%", height: "100vh", border: "none" }}
    />
  );
};

export default SetupInterviewPage;
