import React, { useEffect,  useMemo } from "react";
import { useDispatch, useSelector, } from "react-redux";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Card } from 'react-bootstrap'; 
import { getCategory } from "../../Actions/categoryAction";

const News = (props) => {
    const { feed, setCategory, categoryId } = props;
    const categories = useSelector(state => state.category.cat);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch]);

    const memoizedCategories = useMemo(() => categories || [], [categories]);

    useEffect(() => {
    }, [memoizedCategories]);

    return (
        <div style={{ marginTop: '60px' }}>
            <Form>
                <Form.Group controlId="categoryId">
                    <Form.Select
                        value={categoryId}
                        onChange={(e) => { setCategory(e.target.value) }}
                    >
                        <option value="">Category</option>
                        {memoizedCategories.map((ele) => (
                            <option
                                key={ele._id}
                                value={ele._id}
                            >
                                {ele.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Form>
            <div className="content-center">
                {feed?.items?.map((item, index) => (
                    <div key={index} >
                        <Card key={index} className="my-2"> {/* Add margin to each card */}
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                {/* <Card.Text>{new Date(item.pubDate).toString()}</Card.Text> */}
                                <Card.Text>{new Date(item.pubDate).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</Card.Text>
                                <Card.Link href={item.link} target="_blank" rel="noopener noreferrer">Read More</Card.Link>
                                {/* <Card.Text>{item.pubDate.toString()}</Card.Text> */}
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default News;
