"use client";
import MultistepForm from "@/components/Form/Multistep";
import { StrictMode, useState } from "react";
import BasicInfoForm from "./BasicInfoForm";
import "./style.css";
import PartialFormContainer from "@/components/Form/PartialFormContainer";

const formSteps = [<BasicInfoForm key={0} />, <BasicInfoForm key={1} />];

export default function Onboarding() {
<<<<<<< HEAD
  const { user } = useAuth();
  const userData = useGetUserDoc(user?.uid);
=======
>>>>>>> 0fbfd8f1dc2c6c7e5f2e043688b10589b2898720
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
