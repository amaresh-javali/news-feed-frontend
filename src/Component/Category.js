import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, getCategory } from "../Actions/categoryAction";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const Category = () => {
    const [category, setCategory] = useState('');
    const [url, setUrl] = useState('');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const categories = useSelector(state => {
        return (
            state.category.cat
        )
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async (idToDelete) => {
        const confirmDelete = window.confirm('Delete category?');
        if (confirmDelete) {
            try {
                dispatch(deleteCategory(idToDelete));
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'category') {
            setCategory(e.target.value);
        } else if (e.target.name === 'url') {
            setUrl(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const categoryObj = {
            name: category,
            url
        };
        dispatch(addCategory(categoryObj));
        handleClose();
    };
    const RenderModel = () => {
        return (
            <>
                <Button variant="primary" onClick={handleShow}>Add</Button>
                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="align-items-center">
                            <input className="mb-3 w-100" name="category" type="text" value={category} placeholder="Enter Category" onChange={handleChange} /><br />
                            <input className="w-100" name="url" type="text" value={url} placeholder="Enter URL" onChange={handleChange} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };

    return (
        <div>
            {RenderModel()}
            {categories && categories.map((cat, id) => (
                <Card key={cat._id} className="mb-3">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <Card.Title>{cat.name}</Card.Title>
                        <Button variant="danger" onClick={() => handleDelete(cat._id)}>Delete</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Category;