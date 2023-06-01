"use client";
import MultistepForm from "@/components/Form/Multistep";
import { StrictMode, useState } from "react";
import BasicInfoForm from "./BasicInfoForm";
import "./style.css";
import PartialFormContainer from "@/components/Form/PartialFormContainer";

const formSteps = [<BasicInfoForm key={0} />, <BasicInfoForm key={1} />];

export default function Onboarding() {
  return (
    <StrictMode>
      <MultistepForm
        steps={formSteps}
        onCompleted={console.log}
        className="mt-3"
        initData={{ name: "John Doe", email: "", password: "" }}
      >
        <PartialFormContainer className="max-w-xl lg:max-w-xl" />
      </MultistepForm>
    </StrictMode>
  );
}
