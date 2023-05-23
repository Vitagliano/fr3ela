import NavigationIcon from "@/components/icons/NavigationIcon";

const WelcomeMessage = () => (
  <div className="relative -mt-16 block lg:hidden">
    <NavigationIcon alt="Home" href="/" className="bg-default" />

    <h1 className="mt-1 md:mt-2 text-2xl font-bold text-gray-900 dark:text-gray-200 sm:text-3xl md:text-4xl">
      Welcome to Squid 🦑
    </h1>

    <p className="mt-1 md:mt-2 lg:mt-4 text-sm sm:text-base leading-relaxed text-gray-500">
      Fill out the forms below to get started.
    </p>
  </div>
);

export default WelcomeMessage;
