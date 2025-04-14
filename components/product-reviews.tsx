"use client";

import { Star, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Button from "./base/button";
import { useReviewStore } from "@/store/store";

export default function ProductReviews() {
  // Access reviews and toggleHelpful function from the review store
  const reviews = useReviewStore((state) => state.getAllReviews());
  const toggleHelpful = useReviewStore((state) => state.toggleHelpful);

  return (
    <div className="space-y-4">
      {/* Header section with title and a button to write a review */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <Button variant="fill" color="secondary">
          Write a Review
        </Button>
      </div>

      {/* Display the list of reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="hover:shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Review header with rating, user name, and verified status */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      {/* Star rating visualization */}
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-medium">
                        {review.userName}
                      </span>
                      {/* Display 'Verified' label if review is verified */}
                      {review.verified && (
                        <span className="ml-2 rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-800">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Display the review date */}
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Display the review comment */}
                <p className="text-gray-700">{review.comment}</p>

                {/* Helpful button section */}
                <div className="flex items-center">
                  <Button
                    color="secondary"
                    variant="fill"
                    size="medium"
                    className={`h-8 space-x-1 ${
                      review.hasVoted ? "bg-green-200" : ""
                    }`}
                    onClick={() => toggleHelpful(review.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>Helpful ({review.helpful})</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
