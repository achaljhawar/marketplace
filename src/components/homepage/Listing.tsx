"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

const msPerSecond = 1000;
const msPerMinute = msPerSecond * 60;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;

const Listing = ({
  id,
  coverImage,
  name,
  description,
  endDate,
  sellerAvatar,
  sellerName,
  price,
  bids,
}: {
  id: number;
  coverImage: string;
  name: string;
  description: string;
  endDate: Date;
  sellerAvatar: string | null;
  sellerName: string;
  price: number;
  bids: number;
}) => {
  const timeleft = endDate.getTime() - new Date().getTime();
  const days = Math.floor(timeleft / msPerDay);
  const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / msPerHour);
  const minutes = Math.ceil((timeleft % (1000 * 60 * 60)) / msPerMinute);

  return (
    <Link href={`/listing/${id}`}>
      <Card>
        <div className="relative m-2 h-60 overflow-hidden rounded-lg">
          <Image
            alt="listing-blur"
            src={coverImage}
            fill={true}
            className="object-fill blur-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            placeholder="empty"
          />
          <Image
            alt="listing"
            src={coverImage}
            fill={true}
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            placeholder="empty"
          />
        </div>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription className="overflow-clip overflow-ellipsis">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {timeleft <= 0 ? (
            <p className="text-muted-foreground">Ended</p>
          ) : (
            <p>
              {days
                ? days + (days == 1 ? " day" : " days")
                : hours
                  ? hours + (hours == 1 ? " hour" : " hours")
                  : minutes + (minutes == 1 ? " minute" : " minutes")}{" "}
              left
            </p>
          )}
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={sellerAvatar || undefined} />
              <AvatarFallback className="flex h-full w-full items-center justify-center bg-secondary">
                S
              </AvatarFallback>
            </Avatar>
            {sellerName}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">{price.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">current price</p>
          </div>
          <div className="text-muted-foreground">
            {bids} {bids == 1 ? "bid" : "bids"}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export const ListingSkeleton = () => {
  return (
    <Card>
      <div className="relative m-2 flex h-60 overflow-hidden rounded-lg">
        <Skeleton className="flex-1" />
      </div>
      <CardHeader>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-full" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};

export default Listing;