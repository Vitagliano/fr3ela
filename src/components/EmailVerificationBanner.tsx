import { sendEmailVerification } from "firebase/auth";
import Banner from "./Banner";
import { Button } from "./Button";
import { memo } from "react";

export type EmailVerificationBannerProps = {
  sendEmailVerification: () => void;
};

const EmailVerificationBanner = memo<EmailVerificationBannerProps>(props => (
  <Banner
    buttonLink="/"
    bannerText="You need to verify your e-mail!"
    buttonText="Click here to send <a href='/'>verification</a>"
    close={false}
    variant="default"
  >
    You need to verify your e-mail! Click here to send{" "}
    <Button
      className="font-semibold underline duration-150 hover:text-indigo-100 inline-flex items-center gap-x-1 !p-0"
      onClick={props.sendEmailVerification}
    >
      verification
    </Button>
    .
  </Banner>
));

EmailVerificationBanner.displayName = "EmailVerificationBanner";

export default EmailVerificationBanner;
