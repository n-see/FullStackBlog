import React, { useEffect } from "react";
import { useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Form,
    Accordion,
    ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
    AddBlogItems,
    checkToken,
    GetItemsByUserId,
    GetLoggedInUser,
    LoggedInData,
} from "../Services/DataService";
import Spinner from 'react-bootstrap/Spinner';


const Dashboard = ({ isDarkMode, onLogin }) => {
    // useStates
    let example = { name: 'jacob', age: 22 };


    const [blogTitle, setBlogTitle] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogDescription, setBlogDescription] = useState("");
    const [blogCategory, setBlogCategory] = useState("");
    const [blogTags, setBlogTags] = useState("");

    const [edit, setEdit] = useState(false);
    const [userId, setUserId] = useState(0);
    const [publisherName, setPublisherName] = useState("");

    const [blogItems, setBlogItems] = useState([]);
    const [isLoading, setIsLoading ] = useState(true);

    const [blogId, setBlogId] = useState(0);
    const [IsDeleted, setIsDeleted] = useState(false);
    const [isPublished, setIsPublished] = useState(false);



    const handleSave = async ({target:{textContent}}) => {
        // let { publisherName, userId } = LoggedInData();
        const published = {
            Id: 0,
            UserId: userId,
            PublisherName: publisherName,
            Tag: blogTags,
            Title: blogTitle,
            Image: blogImage,
            Description: blogDescription,
            Date: new Date(),
            Category: blogCategory,
            IsPublished: textContent ==="Save" ? false: true,
            IsDeleted: false,
        };
        console.log(published);
        handleClose();
        let result = await AddBlogItems(published);
        if (result) {
            let userBlogItems = await GetItemsByUserId(userId);
            setBlogItems(userBlogItems);
            console.log(userBlogItems, "This is from our UserBlogItems");
        }
    };

    // const handleSaveWithUnpublish = async () => {
    //     let { publisherName, userId } = LoggedInData();
    //     const notPublished = {
    //         Id: 0,
    //         UserId: userId,
    //         PublisherName: publisherName,
    //         Tag: blogTags,
    //         Title: blogTitle,
    //         Image: blogImage,
    //         Description: blogDescription,
    //         Date: new Date(),
    //         Category: blogCategory,
    //         IsPublished: false,
    //         IsDeleted: false,
    //     };
    //     console.log(notPublished);
    //     handleClose();

    //     let result = await AddBlogItems(notPublished);
    //     if (result) {
    //         let userBlogItems = await GetItemsByUserId(userId);
    //         setBlogItems(userBlogItems);
    //         console.log(userBlogItems, "This is frou our UserBlogItems");
    //     }
    // };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e, {id, publisherName,userId,title, description, category, tag, image, isDeleted, isPublished}) => {
        setShow(true);

        if (e.target.textContent === "Add Blog Item") {
            
            setEdit(false);

            console.log(e.target.textContent, edit);

        } else {
            setEdit(true);
        }

            setBlogId(blogId);
            setBlogTitle(title);
            setUserId(userId);
            setPublisherName(publisherName)
            setBlogDescription(description);
            setBlogCategory(category);
            setBlogTags(tag);
            setBlogImage(image);
            setIsDeleted(isDeleted);
            setIsPublished(isPublished);
            console.log(e.target.textContent, edit);
    };

    const handleTitle = (e) => {
        setBlogTitle(e.target.value);
    };
    const handleDescription = (e) => {
        setBlogDescription(e.target.value);
    };
    const handleCategory = (e) => {
        setBlogCategory(e.target.value);
    };
    const handleTag = (e) => {
        setBlogTags(e.target.value);
    };
    // const handleImage = (e) => {
    //     setBlogImage(e.target.value);
    // }

    

    let navigate = useNavigate();

    const loadUserData = async () => {
        let userInfo = LoggedInData();
        onLogin(userInfo);
        console.log("User info:", userInfo.userId);
        setUserId(userInfo.userId);
        setPublisherName(userInfo.publisherName)
        // let userBlogItems = await GetItemsByUserId(userInfo.userId);
        // setBlogItems(userBlogItems)
        // console.log("Loaded blog items: " , userBlogItems)
        
        setTimeout(async () => {
            let userBlogItems = await GetItemsByUserId(userInfo.userId);
            setBlogItems(userBlogItems)
            setIsLoading(false);
            console.log("Loaded blog items: " , userBlogItems)
        },1000)
    }

    useEffect(() => {
        if (!checkToken()) {
            navigate("/Login");
        }
        loadUserData();
    }, []);

    

    const handleImage = async (e) => {
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);
            // setBlogImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <Container
                data-bs-theme={isDarkMode ? "dark" : "light"}
                className={isDarkMode ? "bg-dark text-light p-5" : "bg-light p-5"}
                fluid
            >
                <Button variant="outline-primary m-2" onClick={(e) => handleShow(e,{id:0,userId:userId,title:"",description:"", tag:"", category:"", image:"", isDeleted:false, isPublished:false, publisherName:publisherName})}>
                    Add Blog Item
                </Button>
                <Button variant="outline-primary m-2" onClick={handleShow}>
                    Edit Blog Item
                </Button>

                <Modal data-bs-theme={isDarkMode ? 'dark' : 'light'} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{edit ? "Edit" : "Add"} Blog Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="Title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Title" value={blogTitle} onChange={handleTitle} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" placeholder="Enter Description" value={blogDescription} onChange={handleDescription} />
                            </Form.Group>

                            <Form.Group controlId="Category">
                                <Form.Label>Category</Form.Label>
                                <Form.Select > value={blogCategory} onChange={handleCategory}
                                    <option>Select Category</option>
                                    <option value="Food">Food</option>
                                    <option value="Fitness">Fitness</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Tech">Tech</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Tags" value={blogTags} onChange={handleTag}> 
                                <Form.Label>Tags</Form.Label>
                                <Form.Control type="text" placeholder="Enter Tag" />
                            </Form.Group>

                            <Form.Group className="mb-3 " controlId="Image">
                                <Form.Label>Pick an Image</Form.Label>
                                <Form.Control type="file" placeholder="Select an Image from file" accept="image/png, image/jpg" onChange={handleImage} />

                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="outline-primary" onClick={handleSave}>
                            {edit ? "Save Changes" : "Save"}
                        </Button>
                        <Button variant="outline-primary" onClick={handleSave}>
                            {edit ? "Save Changes" : "Save"} and Publish
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Accordian below */}
                {isLoading ? <><Spinner animation="grow" variant="info"/><h2>...Loading</h2> </> : blogItems.length == 0 ? <><h2>no blog items to show</h2></>: 
                <Accordion defaultActiveKey={['0']} alwaysOpen>

                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Published</Accordion.Header>
                        <Accordion.Body>
                            {
                                blogItems.map((item, i) => item.isPublished && <ListGroup key={i}>{item.title}

                                    <Col className="d-flex justify-content-end mx-2">
                                        <Button variant="outline-danger mx-2">Delete</Button>
                                        <Button variant="outline-info mx-2" onClick={(e) => handleShow(e, item)}>Edit</Button>
                                        <Button variant="outline-primary mx-2">Unpublish</Button>
                                    </Col>

                                </ListGroup>)
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Unpublished</Accordion.Header>
                        <Accordion.Body>
                            {
                                blogItems.map((item, i) => !item.isPublished && <ListGroup key={i}>{item.title}

                                    <Col className="d-flex justify-content-end mx-2">
                                        <Button variant="outline-danger mx-2">Delete</Button>
                                        <Button variant="outline-info mx-2" onClick={(e) => handleShow(e, item)}>Edit</Button>
                                        <Button variant="outline-primary mx-2">Publish</Button>
                                    </Col>
                                </ListGroup>)
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
}

            </Container>
        </>
    );
};

export default Dashboard;
