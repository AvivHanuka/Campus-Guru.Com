"use client";
export const runtime = 'edge';
import SignupForm from "./form";
/*interface propsType {
  params: {
    lng: string;
  };
}*/
export default function Login(/*{ params: { lng } }: propsType*/) {
  return (
    <div className='flex flex-col h-[70vh] justify-center items-center'>
      <div className='w-1/3'>
        <SignupForm />
      </div>
    </div>
  );
}
