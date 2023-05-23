import NavigationIcon from "@/components/icons/NavigationIcon";

const WelcomeMessage = () => (
  <div className="relative -mt-16 block lg:hidden">
    <NavigationIcon alt="Home" href="/" />

    <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-200 sm:text-3xl md:text-4xl">
      Welcome to Squid 🦑
    </h1>

    <p className="mt-4 leading-relaxed text-gray-500">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
      dolorum aliquam, quibusdam aperiam voluptatum.
    </p>
  </div>
);

export default WelcomeMessage;
