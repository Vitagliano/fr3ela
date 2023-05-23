import NavigationIcon from "@/components/icons/NavigationIcon";
import Image from "next/image";

function WelcomeImage() {
  return (
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-4 lg:h-full xl:col-span-4">
      <Image
        fill
        alt="Night"
        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        className="absolute inset-0 opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <NavigationIcon
          alt="Home"
          href="/"
          className="bg-transparent text-white"
        />

        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to Squid 🦑
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam
          dolorum aliquam, quibusdam aperiam voluptatum.
        </p>
      </div>
    </section>
  );
}
export default WelcomeImage;
