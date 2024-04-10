import Image from "next/image";
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen  items-center justify-center  px-2 text-white">
      <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>

      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-8 w-8 " />
            <h2>Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">"Explain Something to me"</p>
            <p className="infoText">
              "What is the difference between a dog and a cat"
            </p>
            <p className="infoText hidden sm:flex">"What is the color of sun?"</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BoltIcon className="h-8 w-8 " />
            <h2>Capabilites</h2>
          </div>
          <div className="space-y-2  ">
            <p className="infoText">Change the ChatGPT model to use</p>
            <p className="infoText">Messages are stored in firebase's FireStore</p>
            <p className="infoText hidden sm:flex">Hot Toast notifications when ChatGPT is thinking!</p>
          </div>
        </div>

      <div>
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="h-8 w-8 " />
            <h2>Limitations</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">Make occasionally generate incorrect information</p>
            <p className="infoText">May occasionally produce harmful instructions or biased content</p>
            <p className="infoText hidden sm:flex">Limited knowledge of older events after 2021</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
