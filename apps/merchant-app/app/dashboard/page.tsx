import React from 'react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";

// Components
import AnimatedCounters from '../../components/AnimatedCounters';

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");

  return (
        <div className="bg-[#F6F8FF] text-black">
          <AnimatedCounters/>
       
         
        </div>

  );
};

export default page;
