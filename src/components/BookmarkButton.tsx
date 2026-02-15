import { Recipe as IRecipe } from "../pages/AllRecipes";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";

interface Props {
  recipe: IRecipe;
}

interface Bookmark {
  bookmarkId: string;
  userId: string;
  // postId: string;
}

export const BookmarkButton = ({ recipe }: Props) => {
  const bookmarksRef = collection(db, "bookmarks");
  const [user] = useAuthState(auth);
  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);
  // const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const q = query(
    collection(db, "bookmarks"),
    where("postId", "==", recipe.id)
    // where("userId", "==", user?.uid)
  );

  const addBookmark = async () => {
    try {
      const newDoc = await addDoc(bookmarksRef, {
        userId: user?.uid,
        postId: recipe.id,
        bookmarkedAt: serverTimestamp(),
      });

      if (user) {
        setBookmarks((prev) =>
          prev
            ? [...prev, { userId: user?.uid, bookmarkId: newDoc.id }]
            : [{ userId: user?.uid, bookmarkId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeBookmark = async () => {
    try {
      const bookmarkToDeleteQuery = query(
        bookmarksRef,
        where("postId", "==", recipe.id),
        where("userId", "==", user?.uid)
      );

      const bookmarkToDeleteData = await getDocs(bookmarkToDeleteQuery);
      const bookmarkToDelete = doc(
        db,
        "bookmarks",
        bookmarkToDeleteData.docs[0].id
      );
      await deleteDoc(bookmarkToDelete);

      if (user) {
        setBookmarks(
          (prev) =>
            prev &&
            prev?.filter(
              (bookmark) =>
                bookmark.bookmarkId !== bookmarkToDeleteData.docs[0].id
            )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const data = await getDocs(q);

      data.docs.map((doc) => console.log(doc.data()));

      setBookmarks(
        data.docs.map((doc) => ({
          userId: doc.data().userId,
          bookmarkId: doc.id,
        }))
      );
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const hasUserBookmarked = bookmarks?.find(
    (bookmark) => bookmark.userId == user?.uid
  );

  useEffect(() => {
    fetchBookmarks();
  }, []);

  useEffect(() => {
    console.log(bookmarks);
  }, [bookmarks]);
  // const handleEdit: MouseEventHandler<HTMLButtonElement> | undefined = () => {
  //   console.log(recipe);
  // };

  return (
    <>
      {user && (
        <button onClick={hasUserBookmarked ? removeBookmark : addBookmark}>
          {hasUserBookmarked ? (
            <MdBookmark
              className="w-3.5 h-3.5 cursor-pointer"
              color="#FF5B27"
            />
          ) : (
            <MdBookmarkBorder
              className="w-3.5 h-3.5 cursor-pointer"
              color="FF5B27"
            />
          )}
        </button>
      )}
    </>
  );
};
