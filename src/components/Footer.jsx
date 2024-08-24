import { Button, Input } from "@material-tailwind/react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const onChange = ({ target }) => setEmail(target.value);
  return (
    <footer className="bg-[#E8E8EA] w-full">
      <div className="px-6 max-w-[1400px] mx-auto">
        <div className="py-16 grid grid-cols-[2fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr_2fr] ">
          <div className="w-[280px]">
            <p className="text-[#181A2A] mb-5 text-lg font-semibold">About</p>
            <p className="text-[#696A75]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>

            <div className="mt-4 text-[#3B3C4A]">
              <p>
                <span className="text-[#181A2A] font-semibold">Email: </span>
                <a>info@jstemplate.net</a>
              </p>
              <p>
                <span className="text-[#181A2A] font-semibold">Phone:</span>{" "}
                <a>880 123 456 789</a>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-[#3B3C4A]">
            <p className="text-[#181A2A] mb-3 text-lg font-semibold">
              Quick Link
            </p>
            <Link>Home</Link>
            <Link>About</Link>
            <Link>Blog</Link>
            <Link>Archived</Link>
            <Link>Author</Link>
            <Link>Contact</Link>
          </div>

          <div className="flex flex-col gap-2 text-[#3B3C4A]">
            <p className="text-[#181A2A] mb-3 text-lg font-semibold">
              Category
            </p>
            <Link>Lifestyle</Link>
            <Link>Technology</Link>
            <Link>Travel</Link>
            <Link>Business</Link>
            <Link>Economy</Link>
            <Link>Sports</Link>
          </div>

          <div className="w-[100%] col-start-1 col-end-4  h-full bg-white rounded-xl px-9 py-8 ml-auto mt-6 lg:mt-0 lg:w-[392px] lg:col-start-auto lg:col-end-auto">
            <form>
              <h3 className="text-[#181A2A] text-xl font-semibold text-center">
                Weekly Newsletter
              </h3>
              <p className="mb-[24px] text-[#696A75] text-center">
                Get blog articles and offers via email
              </p>
              <Input
                value={email}
                onChange={onChange}
                placeholder="Your Email"
                icon={<EnvelopeIcon className="mt-2" />}
                className="!h-[48px] !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
              />
              <Button
                onClick={() => setEmail("")}
                className="h-12 w-full bg-[#4B6BFB] text-[#FFF] rounded-md mt-4"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="flex justify-between items-center w-full border-t-[1px] border-[#DCDDDF] py-8">
          <div className=" ">
            <img src="/Logo.png" />
          </div>
          <div className="flex gap-8 text-[#3B3C4A]">
            <Link to="#">Terms of Use</Link>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
