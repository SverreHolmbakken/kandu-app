import Aside from "./components/layout/aside";
import Main from "./components/layout/main";

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-between m-auto text-primaryDark">
      <section className="flex w-full px-36 h-screen">
        <Aside />
        <Main />
      </section>
    </div>
  );
}
