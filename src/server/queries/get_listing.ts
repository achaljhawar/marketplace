"use server";
import "server-only";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { listings } from "@/server/db/schema";
import { ratelimit } from "@/server/ratelimit";
import getIp from "@/server/ip";

export async function getListing(id: number) {
  if (isNaN(id)) return undefined;
  const limited = await ratelimit.query.limit(getIp());
  if (!limited.success)
    throw new Error(
      `Try again after ${Math.ceil((limited.reset - Date.now()) / 1000)} second(s)`
    );
  const data = await db.query.listings.findFirst({
    with: {
      seller: true,
      media: true,
      bids: {
        orderBy(fields, operators) {
          return operators.desc(fields.bidDate);
        },
        with: {
          bidder: true,
        },
      },
    },
    where: eq(listings.listingId, id),
  });
  const timeleft = data ? data.endDate.getTime() - new Date().getTime() : 0;
  if (timeleft <= 0 && data) data.status = "expired";
  return data
    ? {
        currentPrice: data.bids.length ? data.bids[0].amount : data.basePrice,
        ...data,
      }
    : undefined;
}

export type getListingType = Awaited<ReturnType<typeof getListing>>;
