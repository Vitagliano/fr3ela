"use client";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Input from "@/components/Input";
import { useMultistepForm } from "@/context/Form";
import Link from "next/link";

function ProfessionalInfoForm() {
  const { next, prev, step } = useMultistepForm<{ name: string }>();

  return (
    <Card className="w-full max-w-xl mx-auto">
      <form className="flex flex-col gap-6">
        
       
        <div className="flex justify-between w-full">
          {step !== 0 ? (
            <Button
              onClick={() => prev()}
              variant="hover-outline"
              className="inline-block shrink-0 rounded-md text-sm font-medium text-white transitiom"
            >
              Go Back
            </Button>
          ) : null}
          <Button
            onClick={() => next({ name: "John Doe" })}
            variant="hover-outline"
            className="inline-block shrink-0 rounded-md text-sm font-medium text-white transitiom"
          >
            Next
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default ProfessionalInfoForm;
