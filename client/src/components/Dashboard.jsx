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

const Dashboard = ({ isDarkMode }) => {
    // usestates

    const [blogTitle, setBlogTitle] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogDescription, setBlogDescription] = useState("");
    const [blogCategory, setBlogCategory] = useState("");
    const [blogTags, setBlogTags] = useState("");

    const [edit, setEdit] = useState(false);
    const [userId, setUserId] = useState(0);
    const [publisherName, setPublisherName] = useState("");

    const [blogItems, setBlogItems] = useState([]);

    const handleSaveWithPublish = async () => {
        let { publisherName, userId } = LoggedInData();
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
            IsPublished: true,
            IsDeleted: false,
        };
        console.log(published);
        handleClose();
        let result = await AddBlogItems(published);
        if (result) {
            let userBlogItems = await GetItemsByUserId(userId);
            setBlogItems(userBlogItems);
            console.log(userBlogItems, "This is frou our UserBlogItems");
        }
    };

    const handleSaveWithUnpublish = async () => {
        let { publisherName, userId } = LoggedInData();
        const notPublished = {
            Id: 0,
            UserId: userId,
            PublisherName: publisherName,
            Tag: blogTags,
            Title: blogTitle,
            Image: blogImage,
            Description: blogDescription,
            Date: new Date(),
            Category: blogCategory,
            IsPublished: false,
            IsDeleted: false,
        };
        console.log(notPublished);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true);

        if (e.target.textContent === "Add Blog Item") {
            setEdit(false);
            setBlogTitle("");
            setBlogDescription("");
            setBlogCategory("");
        } else {
            setEdit(true);
            setBlogTitle("My Awesome Title");
            setBlogDescription("My Awesome Description");
            setBlogCategory("Fitness");
        }

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

    useEffect(() => {
        if (!checkToken()) {
            navigate("/Login");
        }
    }, []);

    const handleImage = async (e) => {
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);
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
                <Button variant="outline-primary m-2" onClick={handleShow}>
                    Add Blog Item
                </Button>
                <Button variant="outline-primary m-2" onClick={handleShow}>
                    Edit Blog Item
                </Button>

                <Modal
                    data-bs-theme={isDarkMode ? "dark" : "light"}
                    show={show}
                    onHide={handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{edit ? "Edit" : "Add"} Blog Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="Title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Title"
                                    value={blogTitle}
                                    onChange={handleTitle}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Enter Description"
                                    value={blogDescription}
                                    onChange={handleDescription}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Select controlId="Category">
                                    {" "}
                                    value={blogCategory} onChange={handleCategory}
                                    <option>Select Category</option>
                                    <option value="Food">Food</option>
                                    <option value="Fitness">Fitness</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Tech">Tech</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="Tags"
                                value={blogTags}
                                onChange={handleTag}
                            >
                                <Form.Label>Tags</Form.Label>
                                <Form.Control type="text" placeholder="Enter Tag" />
                            </Form.Group>

                            <Form.Group
                                className="mb-3 "
                                controlId="Image"
                                value={blogImage}
                                onChange={handleImage}
                            >
                                <Form.Label>Pick an Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Select an Image from file"
                                    accept="image/png, image/jpg"
                                    onChange={handleImage}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="outline-primary" onClick={handleSaveWithUnpublish}>
                            {edit ? "Save Changes" : "Save"}
                        </Button>
                        <Button variant="outline-primary" onClick={handleSaveWithPublish}>
                            {edit ? "Save Changes" : "Save"} and Publish
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Accordion defaultActiveKey={["0"]} alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Published</Accordion.Header>
                        <Accordion.Body>
                            {blogItems.map(
                                (item, i) =>
                                    item.isPublished && (
                                        <ListGroup key={i}>
                                            {item.title}

                                            <Col className="d-flex justify-content-end mx-2">
                                                <Button variant="outline-danger mx-2">Delete</Button>
                                                <Button variant="outline-info mx-2">Edit</Button>
                                                <Button variant="outline-primary mx-2">
                                                    Unpublish
                                                </Button>
                                            </Col>
                                        </ListGroup>
                                    )
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Unpublished</Accordion.Header>
                        <Accordion.Body>
                            {blogItems.map(
                                (item, i) =>
                                    !item.isPublished && (
                                        <ListGroup key={i}>
                                            {item.title}

                                            <Col className="d-flex justify-content-end mx-2">
                                                <Button variant="outline-danger mx-2">Delete</Button>
                                                <Button variant="outline-info mx-2">Edit</Button>
                                                <Button variant="outline-primary mx-2">Publish</Button>
                                            </Col>
                                        </ListGroup>
                                    )
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </>
    );
};

export default Dashboard;
