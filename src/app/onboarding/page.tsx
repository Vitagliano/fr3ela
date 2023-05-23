"use client";
import Input from "@/components/Input";
import Link from "next/link";
import "./style.css";
import { Button } from "@/components/Button";
import MultistepForm from "@/components/Form/Multistep";
import { useState } from "react";
import BasicInfoForm from "./BasicInfoForm";

export default function Onboarding() {
  const [current, setCurrent] = useState(0);

  return (
    <MultistepForm
      count={2}
      onSubmit={() => {}}
      next={() => setCurrent(prev => prev + 1)}
      prev={() => setCurrent(prev => prev - 1)}
      step={current}
    >
      <BasicInfoForm />
      <div className="form">b</div>
    </MultistepForm>
  );
}
