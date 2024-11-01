'use client';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { IconButton } from "@mui/material";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { FadeLoader } from 'react-spinners';
import image1 from "../../../public/images/image1.png";
import image2 from "../../../public/images/image2.png";
import image3 from "../../../public/images/image3.png";
import image4 from "../../../public/images/image4.png";
import {
  useBookmarkJobMutation,
  useGetAllJobsQuery,
  useGetBookmarksQuery,
  useUnbookmarkJobMutation
} from "../../app/service/getApi";
import Job from '../types/job_types';


const images = [image1, image2, image3, image4];

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

function Card() {
  const { data, error, isLoading } = useGetAllJobsQuery();
  const { data: bookmarkData } = useGetBookmarksQuery();
  const [bookmarkJob] = useBookmarkJobMutation();
  const [unbookmarkJob] = useUnbookmarkJobMutation();
  const [bookmarkStatus, setBookmarkStatus] = useState<{ [key: string]: boolean }>({});
  const { data: session, status } = useSession();

  
  useEffect(() => {
    if (bookmarkData) {
      const initialBookmarkStatus = bookmarkData.reduce((acc: { [key: string]: boolean }, job: Job) => {
        acc[job.id] = true;
        return acc;
      }, {});
      setBookmarkStatus(initialBookmarkStatus);
    }
  }, [bookmarkData]);

  if (isLoading) {
    return <FadeLoader color="#26A4FF" cssOverride={{ margin: "13% auto" }} />;
  }

  if (error) {
    return <p>Error fetching jobs. Please try again later.</p>;
  }

  if (!data || !data.data) {
    return <p>No jobs available.</p>;
  }

  const handleBookmarkClick = async (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    // const token = session?.user?.accessToken;
    // if (!token) {
    //   console.error("No access token available");
    //   return;
    // }

    const isBookmark = bookmarkStatus[id];

    // Optimistically update UI
    setBookmarkStatus((prevState) => ({
      ...prevState,
      [id]: !isBookmark,
    }));

    try {
      if (isBookmark) {
        await unbookmarkJob(id).unwrap();
      } else {
        await bookmarkJob(id).unwrap();
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
      alert("error on bookmarking")
      // Revert state if API call fails
      setBookmarkStatus((prevState) => ({
        ...prevState,
        [id]: isBookmark,
      }));
    }
  };

  return (
    <div className='w-[98%] md:w-[100%] mx-auto'>
      {data.data.map((job: Job) => {
        const image = getRandomImage();
        const isBookmarked = bookmarkStatus[job.id] || false;

        return (
          <Link
            href={{
              pathname: `/Description/${job.id}`,
            }}
            key={job.id}
            className="w-[95%] md:w-[80%] md:mx-auto my-10 py-6 rounded-[30px] md:border-[1px] border-customGray md:flex justify-around">
            <div data-testid={`job-card-${job.id}`}>
              {job.logoUrl ? (
                <Image src={job.logoUrl} alt="Company Logo" width={66} height={59} className="w-[66px] h-[59px]" />
              ) : (
                <Image src={image} alt="Random" className="w-[66px] h-[59px]" />
              )}
            </div>

            <div className="mb-[70px] md:mb-0 md:w-[755px]">
              <p className="text-[#25324B] font-epilogue text-[24px] font-semibold leading-[24px] text-left">
                {job.title}
              </p>

              <p className="w-[454px] h-[27px] text-[#7C8493] font-light text-lg my-2">
                <span className="leading-[25.6px] text-left">{job.orgName}</span>{' '}
                <span>• {job.location.join(', ')}</span>
              </p>

              <p className="font-epilogue text-base font-normal leading-[25.6px] text-left">
                {job.description}
              </p>

              <div className="h-[35px] flex grid-cols-3 gap-2 mt-3">
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
                <IconButton
                  className="absolute top-0 right-0"
                  onClick={(event) => handleBookmarkClick(event, job.id)}>
                  {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Card;