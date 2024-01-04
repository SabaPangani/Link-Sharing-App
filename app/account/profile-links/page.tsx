import Links from "./Links";
import PhoneMockup from "./PhoneMockup";

export default function page() {
  return (
    <div className="flex flex-row my-5 gap-x-5">
      <PhoneMockup />
      <Links />
    </div>
  );
}
