import React from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import { useDeleteBlogMutation, useFetchBlogsQuery } from "../services/blogsApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
    const {data} = useFetchBlogsQuery();
   const [deleteBlog]=useDeleteBlogMutation();
    const handleDelete = async (id) => {
        if(window.confirm("Are you sure that you want to delete the blog?")) {
            await deleteBlog(id);
            toast.success("Blog deleted successfully");
        }
    };

    return(
      <div style={{margin:"auto", padding: "15px", maxWidth:"1200px", alignContent: "center"}}>
    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        {data?.map((item) => (
            <MDBCol key={item.id}>
            <MDBCard className="h-100">
                <MDBCardImage src={item.imgURL} alt={item.title} position="top"></MDBCardImage>
            <MDBCardBody>
                <MDBCardTitle className="text-start">{item.title}</MDBCardTitle>
                <MDBCardText className="text-start">{item.description}</MDBCardText>
                <div style={{marginLeft: "5px", float: "right"}}>
                    <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon fas icon="trash" style={{color: "#dd4b39"}} size="lg" onClick={()=>handleDelete(item.id)}/>
                    </MDBBtn>
                    <Link to={`/update/${item.id}`}>
                    <MDBIcon fas icon="edit" style={{color: "#55acee", marginLeft: "10px"}} size="lg"/>
                    </Link>
                </div>
            </MDBCardBody>
            </MDBCard>
            </MDBCol>
        ))}

    </MDBRow>
      </div>  
    )
}

export default Home