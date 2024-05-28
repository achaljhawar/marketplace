import MaxWidthDiv from "@/components/layout/MaxWidthDiv";
import ListingPage from "@/components/listingpage/ListingPage";
import { ListingSkeleton } from "@/components/listingpage/Skeletons";
import { getListing } from "@/server/queries/get_listing";
import { Suspense } from "react";

async function ListingPageWrapper({ listingId }: { listingId: number }) {
  const data = await getListing(listingId);
  if (!data) return <ListingSkeleton />;
  return <ListingPage data={data} />;
}

export default function Listing({
  params: { id: listingId },
}: {
  params: { id: string };
}) {
  return (
    <>
      <main className="bg-background">
        <MaxWidthDiv>
          <Suspense fallback={<ListingSkeleton />}>
            <ListingPageWrapper listingId={+listingId} />
          </Suspense>
        </MaxWidthDiv>
      </main>
    </>
  );
}
