import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { getDoc, updateDoc, doc, deleteDoc, getDocs, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
export const blogsApi = createApi({
    reducerPath: "blogsApi",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Blogs"],
    endpoints: (builder) => ({
        fetchBlogs: builder.query({
            async queryFn() {
                try {
                    const blogRef = collection(db, "blogs");
                    const querySnapshot = await getDocs(blogRef);
                    let blogs = [];
                    querySnapshot?.forEach((doc) => {
                        blogs.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    return {data: blogs}
                } catch(err){
                    return {error: err}
                }
            },
            providesTags: ["Blogs"]
        }),
        fetchBlog: builder.query({
          async queryFn(id)  {
            try{
                const docRef = doc(db, "blogs", id);
                const snapshot = await getDoc(docRef);
                console.log(snapshot.data());
                return {data:snapshot.data()};
            }catch(err){
                return{error:err}
            }
          },
          providesTags: ["Blogs"],
        }),
        addBlog: builder.mutation({
            async queryFn(data){
                try{
                    await addDoc(collection(db, "blogs"), {
                        ...data,
                        timestamp: serverTimestamp(),
                    });
                    return {data:"ok"};
                } catch (err) {
                    return { error: err };
                }  
            },
            invalidatesTags: ["Blogs"],
        }),
        
        deleteBlog:builder.mutation({
            async queryFn(id) {
              try {
                await deleteDoc(doc(db, "blogs", id));
                return { data: "ok" };
              } catch (err) {
                return { error: err };
              }
            },
            invalidatesTags: ["Blogs"],
          }),
       updateBlog: builder.mutation({
  async queryFn(id, blog) {
    try {
      console.log("Updating blog:", id, blog);

      const docRef = doc(db, "blogs", id);
      await updateDoc(docRef, {
        ...blog,
        timestamp: serverTimestamp(),
      });
      
      console.log("Blog updated successfully:", docRef.id);
      
      return { data: "ok" };
    } catch (err) {
      console.error("Error updating blog:", err);
      return { error: err };
    }
  },
  invalidatesTags: ["Blogs"],
}),

          

    }),
});

export const {useFetchBlogsQuery, useAddBlogMutation, useDeleteBlogMutation, useUpdateBlogMutation, useFetchBlogQuery} = blogsApi;