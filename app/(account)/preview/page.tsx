import Card from "./Card";
import NavBarPreview from "./NavBarPreview";

export default function page() {
  return (
    <>
      <NavBarPreview />
      <header className="bg-purple w-[60%] z-[-1] h-[357px] rounded-b-[32px] absolute top-0 left-1/2 -translate-x-1/2"></header>
      <Card />
    </>
  );
}
