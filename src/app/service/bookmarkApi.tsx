import React from "react";
export async function BookmarkCrud(
	id: string,
	accessToken: string,
	isBookmark: boolean
) {
	if (accessToken) {
		try {
			const endpoint = `https://akil-backend.onrender.com/bookmarks/${id}`;
			const method = !isBookmark ? "POST" : "DELETE";
			const requestOptions = {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
				method,
				body: !isBookmark ? JSON.stringify({}) : null,
			};

			const res = await fetch(endpoint, requestOptions);
			const result = await res.json();
			// console.log(result, "Bookmark response:");

			if (res.status === 409 && !isBookmark) {
				console.warn("Bookmark already exists for job ID:", id);
				return true; // Consider it a success since the bookmark already exists
			}

			if (!res.ok) {
				throw new Error(
					`${!isBookmark ? "Adding" : "Removing"} bookmark failed`
				);
			}

			console.log(
				`${!isBookmark ? "Added" : "Removed"} bookmark for job ID: ${id}`
			);

			// Return the success status to manage UI updates
			return result.success;
		} catch (error) {
			console.error("Error updating bookmark:", error);
			return false; // Return false if there's an error
		}
	}
	return false; // Return false if accessToken is not provided
}

export async function getBookmarks(accessToken: string) {
	if (accessToken) {
		try {
			const endpoint = `https://akil-backend.onrender.com/bookmarks`;
			const requestOptions = {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
				method: "GET",
			};

			const res = await fetch(endpoint, requestOptions);
			const { data } = await res.json();
			console.log(data, "get data from bookmarks:");

			if (!res.ok) {
				throw new Error(`Failed to fetch bookmarks`);
			}

			// Return an empty array if no data is present to avoid errors
			return data || [];
		} catch (error) {
			console.error("Error fetching bookmarks:", error);
			return []; // Return an empty array if there's an error
		}
	}
	return []; // Return an empty array if accessToken is not provided
}

const bookmarks = () => {
	return <div>bookmark</div>;
};

export default bookmarks;