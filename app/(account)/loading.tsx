import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
      <Loader />
    </div>
  );
}
