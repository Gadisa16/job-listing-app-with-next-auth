'use client';

import { FadeLoader } from 'react-spinners';
import Image from 'next/image';
import image1 from "../../../public/images/image1.png";
import image2 from "../../../public/images/image2.png";
import image3 from "../../../public/images/image3.png";
import image4 from "../../../public/images/image4.png";
import Link from 'next/link';
import { useGetAllJobsQuery } from "../../app/service/getApi"; // Import the RTK Query hook

const images = [image1, image2, image3, image4];

interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: string;
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  orgID: string;
  datePosted: string;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: string[] | null;
  perksAndBenefits: string[] | null;
  createdAt: string;
  updatedAt: string;
  orgPrimaryPhone: string;
  orgEmail: string;
  average_rating: number;
  total_reviews: number;
}

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

function Card() {
  const { data, error, isLoading } = useGetAllJobsQuery(); // Use RTK Query hook

  if (isLoading) {
    return (
      <FadeLoader
        color="#26A4FF"
        cssOverride={{ margin: "13% auto" }}
      />
    );
  }

  if (error) {
    return <p>Error fetching jobs. Please try again later.</p>; // Handle errors
  }

  if (!data || !data.data) {
    return <p>No jobs available.</p>; // Handle case when no data is available
  }

  return (
    <div className='w-[98%] md:w-[100%] mx-auto'>
      {data.data.map((job: Job) => {
        const image = getRandomImage();
        return (
          <Link
            href={{
              pathname: '/Description',
              query: { id: job.id }
            }}
            key={job.id}
            className="w-[95%] md:w-[80%] md:mx-auto my-10 py-6 rounded-[30px] md:border-[1px] border-customGray md:flex justify-around">
            <div>
              {job.logoUrl ? (
                <img src={job.logoUrl} alt="Company Logo" className="w-[66px] h-[59px]" />
              ) : (
                <Image src={image} alt="Random" className="w-[66px] h-[59px]" />
              )}
            </div>

            <div className="mb-[70px] md:mb-0 md:w-[755px]">
              <p className="text-[#25324B]  font-epilogue text-[24px] font-semibold leading-[24px] text-left">
                {job.title}
              </p>

              <p className="w-[454px] h-[27px] text-[#7C8493] font-light text-lg my-2">
                <span className="leading-[25.6px] text-left">{job.orgName}</span>{' '}
                <span>• {job.location.join(', ')}</span>
              </p>

              <p className="font-epilogue text-base font-normal leading-[25.6px] text-left">
                {job.description}
              </p>

              <div className="sm:w-[246px] h-[35px] flex grid-cols-3 gap-2 mt-3">
                <div className="border-r-2">
                  <div className="text-[12px] leading-[19.2px] h-full p-[6px_10px] bg-purposeBg text-pupose btn mr-2">
                    {job.opType}
                  </div>
                </div>
                <div className="text-[12px] leading-[19.2px] h-full p-[6px_10px] text-education border border-education btn">
                  Education
                </div>
                <div className="text-[12px] leading-[19.2px] h-full p-[6px_10px] text-IT border border-IT btn rounded-[2px] w-14">
                  IT
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Card;
