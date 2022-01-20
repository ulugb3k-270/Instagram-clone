import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";

export default function signin({ providers }) {
  return (
      <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2  px-14  text-center"> 
      <img
        src="https://i.ibb.co/KKTZwF9/logo-big.png"
        alt=""
        className="w-80"
      />
      <div className="mt-40">
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className=" ">
            <button
              className="p-3 bg-blue-500 rounded-lg  text-white"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
