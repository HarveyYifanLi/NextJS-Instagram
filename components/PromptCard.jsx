"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ prompt, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(prompt);

    if (prompt.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${prompt.creator._id}?name=${prompt.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(prompt.prompt);

    navigator.clipboard.writeText(prompt.prompt);

    setTimeout(() => setCopied(false), 3000);
  };

  const extractURL = (text) => {
    // Regular expression to match URLs
    const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/g;
    // Execute the regular expression on the input text
    const match = text.match(urlPattern);
    // If a match is found, return the first URL
    if (match) {
        return match[0];
    }
    // If no match is found, return false
    return false;
}

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-1'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            loader={() => prompt.creator.image}
            unoptimized={true}
            src={prompt.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full w-10'
          />
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === prompt.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      {/* dynamically detect if a user's post has a valid image URL, if so render the Image, else simply display the post message */}
      {extractURL(prompt.prompt) ? 
        <Image
          loader={() => prompt.prompt}
          unoptimized={true}
          src={prompt.prompt}
          alt='user_image'
          width={40}
          height={40}
          className='container mx-auto mt-2 w-full'
        /> : <p className='my-4 font-satoshi text-sm text-gray-700'>{prompt.prompt}</p>
      }

      {/* Only display Edit and Delete buttons for the current session's user and only on /profile page */}
      {session?.user.id === prompt.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-end gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            <b>Edit</b>
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            <b>Delete</b>
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;