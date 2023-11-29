import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import * as React from 'react';
import productService from '~/services/productService';

function PaginationComponent() {
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            const response = await productService.getAll(4, pageNumber);
            console.log(response);
            setData(response.data);
            setTotalPages(response.data.data.length);
        };
        fetchData();
    }, [pageNumber]);

    const handlePageClick = (event, value) => {
        setPageNumber(value);
    };

    return <Pagination count={10} onChange={handlePageClick} color="primary" />;
}

export default PaginationComponent;
