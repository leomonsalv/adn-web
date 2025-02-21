import { API_URL } from '@/lib/urls';
import { ReviewsResponse, Review } from '@/types/review';

export interface ReviewsParams {
  productId: string;
  page?: number;
  pageSize?: number;
  sort?: 'newest' | 'oldest' | 'rating';
}

export interface ReviewPayload {
  ProductID: number;
  Rating: number;
  Title: string;
  Comment: string;
  Images?: string[] | null;
  Helpful?: number;
  NotHelpful?: number;
  UserID?: string;
  Verified?: boolean;
}

export interface ReviewUpdatePayload {
  Rating?: number;
  Title?: string;
  Comment?: string;
  Images?: string[] | null;
  Helpful?: number;
  NotHelpful?: number;
}

export const fetchProductReviews = async ({
  productId,
  page = 1,
  pageSize = 10,
  sort = 'newest',
}: ReviewsParams): Promise<ReviewsResponse> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      sort: sort,
    });

    const response = await fetch(
      `${API_URL}/api/products/${productId}/reviews?${queryParams.toString()}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching product reviews:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching product reviews');
  }
};

/**
 * Creates a new product review
 * @param {ReviewPayload} review - The review data to be created
 * @param {string} review.productID - The ID of the product being reviewed
 * @param {number} review.rating - Rating value (1-5)
 * @param {string} review.title - Review title
 * @param {string} review.comment - Review content
 * @param {string[]} [review.images] - Optional array of image URLs
 * @returns {Promise<any>} The created review data
 * @throws {Error} When authentication fails or API request fails
 */
export const createProductReview = async (review: ReviewPayload) => {
  try {
    const userSession = JSON.parse(sessionStorage.getItem('user') || '{}');
    const accessToken = userSession?.stsTokenManager?.accessToken;

    if (!accessToken) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating product review:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while creating the review');
  }
};

/**
 * Updates an existing product review
 * @param {string} reviewId - The ID of the review to update
 * @param {ReviewUpdatePayload} updates - The fields to update
 * @param {number} [updates.rating] - Updated rating value
 * @param {string} [updates.title] - Updated review title
 * @param {string} [updates.comment] - Updated review content
 * @param {string[]} [updates.images] - Updated array of image URLs
 * @returns {Promise<any>} The updated review data
 * @throws {Error} When authentication fails or API request fails
 */
export const updateProductReview = async (reviewId: string, updates: ReviewUpdatePayload) => {
  try {
    const userSession = JSON.parse(sessionStorage.getItem('user') || '{}');
    const accessToken = userSession?.stsTokenManager?.accessToken;

    if (!accessToken) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating product review:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while updating the review');
  }
};

/**
 * Deletes a product review
 * @param {string} reviewId - The ID of the review to delete
 * @returns {Promise<boolean>} True if deletion was successful
 * @throws {Error} When authentication fails or API request fails
 */
export const deleteProductReview = async (reviewId: string) => {
  try {
    const userSession = JSON.parse(sessionStorage.getItem('user') || '{}');
    const accessToken = userSession?.stsTokenManager?.accessToken;

    if (!accessToken) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting product review:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while deleting the review');
  }
};

/**
 * Marks a review as helpful by incrementing its helpful count
 * @param {string} reviewId - The ID of the review to mark as helpful
 * @returns {Promise<any>} The updated review data
 * @throws {Error} When authentication fails or API request fails
 */
export const markReviewAsHelpful = async (reviewId: string) => {
  try {
    const userSession = JSON.parse(sessionStorage.getItem('user') || '{}');
    const accessToken = userSession?.stsTokenManager?.accessToken;

    if (!accessToken) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting product review:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred while deleting the review');
  }
};
