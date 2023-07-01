"use client";
import MultistepForm from "@/components/Form/Multistep";
import { StrictMode, useState } from "react";
import PersonalInfoForm from "../../components/Onboarding/PersonalInfoForm";
import "./style.css";
import PartialFormContainer from "@/components/Form/PartialFormContainer";
import RolesForm from "../../components/Onboarding/RolesForm";
import ProfessionalInfoForm from "@/components/Onboarding/ProfessionalInfoForm";

const formSteps = [
  <RolesForm key={0} />,
  <PersonalInfoForm key={1} />,
  <ProfessionalInfoForm key={2} />
];

export default function Onboarding() {
  return (
    <div className="">
      <MultistepForm
        steps={formSteps}
        onCompleted={console.log}
        className="mt-3 mb-12 w-full"
        initData={{ name: "John Doe", email: "", password: "" }}
      >
        <PartialFormContainer />
      </MultistepForm>
    </div>
  );
}
