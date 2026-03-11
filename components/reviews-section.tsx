import { getTranslations } from "next-intl/server";
import { BUSINESS } from "@/lib/general/constants";
import { getGoogleReviews } from "@/server_actions/get-google-reviews";
import { ReviewsCarousel } from "@/components/reviews-carousel";

export async function ReviewsSection() {
  const googleData = await getGoogleReviews(BUSINESS.googlePlaceId);

  return (
    <ReviewsCarousel
      rating={googleData?.rating ?? 5.0}
      totalReviews={googleData?.user_ratings_total ?? 10}
      googleUrl={googleData?.url ?? null}
    />
  );
}
