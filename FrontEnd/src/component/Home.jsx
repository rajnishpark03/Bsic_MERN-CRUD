import React, { useState, useEffect } from 'react';
import { bookBaseUrl } from "../../axiosInstance";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";


const Home = () => {
    const [bookForm, setBookForm] = useState({
        BookName: "",
        BookTitle: "",
        Author: "",
        sellingPrice: "",
        PublishedDate: "",
        Id: "",
    });

    const [bookList, setBookList] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

    const getAllbookList = async () => {
        try {
            const { data } = await bookBaseUrl.get("/booklists");
            setBookList(data?.BookList);
            console.log(data); // Book list data yahan print hoga
        } catch (error) {
            console.log("Error fetching book list", error);
        }
    };

    useEffect(() => {
        getAllbookList();
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setBookForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (!isUpdating) {


                if (!bookForm.BookName || !bookForm.BookTitle || !bookForm.Author || !bookForm.sellingPrice) {
                    alert("All fields are required");
                    return;
                }

                const response = await bookBaseUrl.post("/addbook", bookForm);
                if (response?.data?.Success) {

                    alert(response.data.Message);
                    getAllbookList();
                    setBookForm({
                        BookName: "",
                        BookTitle: "",
                        Author: "",
                        sellingPrice: "",
                        PublishedDate: "",
                        Id: ""
                    });


                }
            } else {
                const response = await bookBaseUrl.put("/updatebook", bookForm);
                if (response?.data?.Success) {

                    alert(response.data.Message);
                    getAllbookList();
                    setBookForm({
                        BookName: "",
                        BookTitle: "",
                        Author: "",
                        sellingPrice: "",
                        PublishedDate: "",
                        Id: ""
                    });
                    setIsUpdating(false);


                }

            }

            console.log("Book added successfully", response.data);
        } catch (error) {
            console.log("Error adding book", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await bookBaseUrl.post("deletebook", {
                Id: id,
            })
            if (data?.Success) {
                alert(data?.Message)
                getAllbookList();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = (data) => {
        setBookForm(
            {
                BookName: data?.BookName,
                BookTitle: data?.BookTitle,
                Author: data?.Author,
                sellingPrice: data?.sellingPrice,
                PublishedDate: data?.PublishedDate,
                Id: data?._id,
            });
        setIsUpdating(true);
    }

    return (
        <div className="w-full px-6 min-h-[calc(100vh-60px)]">
            <div className="w-full grid grid-cols-5 gap-3">
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="">Book Name</label>
                    <input
                        type="text"
                        name="BookName"
                        value={bookForm.BookName}
                        onChange={handleFormChange}
                        placeholder="Book Name"
                        className="w-full border border-gray-100 round-sm outline-1 outline-gray-500"
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="">Book Title</label>
                    <input
                        type="text"
                        name="BookTitle"
                        value={bookForm.BookTitle}
                        onChange={handleFormChange}
                        placeholder="Book Title"
                        className="w-full border border-gray-100 round-sm outline-1 outline-gray-500"
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="">Author</label>
                    <input
                        type="text"
                        name="Author"
                        value={bookForm.Author}
                        onChange={handleFormChange}
                        placeholder="Author"
                        className="w-full border border-gray-100 round-sm outline-1 outline-gray-500"
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="">Selling Price</label>
                    <input
                        type="text"
                        name="sellingPrice"
                        value={bookForm.sellingPrice}
                        onChange={handleFormChange}
                        placeholder="Selling Price"
                        className="w-full border border-gray-100 round-sm outline-1 outline-gray-500"
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="">Published Date</label>
                    <input
                        type="date"
                        name="PublishedDate"
                        value={bookForm.PublishedDate}
                        onChange={handleFormChange}
                        placeholder="Published Date"
                        className="w-full border border-gray-100 round-sm outline-1 outline-gray-500"
                    />
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button
                    className="bg-gray-500 text-white h-9 w-22 rounded-md cursor-pointer mt-5"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>

            <div className="w-full mt-10">
                <div className="2-full">
                    <table className="w-full border border-gray-200">
                        <thead className="bg-gray-50 tracking-wider px-6 py-3 text-xs font-medium text-gray-500">
                            <tr>
                                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book Name</th>
                                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book Title</th>
                                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Selling Price</th>
                                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published Date</th>
                                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                bookList?.map((book, index) => {
                                    return (
                                        <tr key={book?._id} className="hover:bg-gray-200">
                                            <td className="px-6 py-3 whitespace-nowrap">{book?.BookName}</td>
                                            <td className="px-6 py-3 whitespace-nowrap">{book?.BookTitle}</td>
                                            <td className="px-6 py-3 whitespace-nowrap">{book?.Author}</td>
                                            <td className="px-6 py-3 whitespace-nowrap">{book?.sellingPrice}</td>
                                            <td className="px-6 py-3 whitespace-nowrap">{book?.PublishedDate}</td>
                                            <td className="px-6 py-3 whitespace-nowrap">
                                                <div className="w-20 flex justify-center gap-5">
                                                    <div className="h-5 w-5 flex justify-center item-center bg-red-50 text-red-600 rounded text-lg cursor-pointer " onClick={() => handleDelete(book._id)}>
                                                        <span ><MdDelete /></span>
                                                    </div>

                                                    <div className="h-5 w-5 flex justify-center item-center bg-green-50 text-green-600 rounded text-lg cursor-pointer"
                                                        onClick={() => handleUpdate(book)}
                                                    >
                                                        <span><CiEdit /></span>
                                                    </div>

                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            {/* <tr className="hover:bg-gray-200">
                                <td className="px-6 py-3 whitespace-nowrap">name</td>
                                <td className="px-6 py-3 whitespace-nowrap">name</td>
                                <td className="px-6 py-3 whitespace-nowrap">name</td>
                                <td className="px-6 py-3 whitespace-nowrap">name</td>
                                <td className="px-6 py-3 whitespace-nowrap">name</td>
                                <td className="px-6 py-3 whitespace-nowrap">name</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;