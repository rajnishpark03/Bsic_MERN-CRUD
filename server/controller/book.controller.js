const { Book } = require("../model/book.model");

const handleBookStoreController = async (req, res) => {
    try {
        const body = req.body;

        if (
            !body.BookName ||
            !body.BookTitle ||
            !body.Author ||
            !body.sellingPrice
        ) {
            return res
                .status(400)
                .json({ Message: "All fields are required", Success: false });
        }

        const bookAdd = await Book.create(body);

        if (bookAdd) {
            return res
                .status(201)
                .json({
                    Message: "Data Inserted Successfully",
                    Success: true,
                    Id: bookAdd?._id,
                });
        }

        console.log("Book added successfully", bookAdd);

    } catch (error) {
        return res
            .status(400)
            .json({ Message: error.message, Success: false });
    }
};

const handleBookListController = async (req, res) => {
    try {
        const bookList = await Book.find({});
        return res
            .status(200)
            .json({
                Message: "All Books Fetched Successfully",
                Success: true,
                TotalCount: bookList.length,
                BookList: bookList
            });
    } catch (error) {
        return res
            .status(400)
            .json({ Message: error.message, Success: false });
    }
};

const handleBookDeleteController = async (req, res) => {
    const body = req.body; // yahan body define karo
    try {
        const deleted = await Book.deleteOne({ _id: body.Id });
        // console.log(deleted);
        if (deleted.acknowledged) {
            return res
                .status(200)
                .json({
                    Message: "Book Deleted Successfully",
                    Success: true,
                });
        }
    } catch (error) {
        return res
            .status(400)
            .json({ Message: error.message, Success: false });
    }
};


const handleBookUpdateController = async (req, res) => {
    try {
        const body = req.body;

        if (
            !body.BookName ||
            !body.BookTitle ||
            !body.Author ||
            !body.sellingPrice
        ) {
            return res.status(400)
                .json({ Message: "All fields are required", Success: false });
        }
        const updating = await Book.updateOne({ _id: body?.Id }, { $set: body })
        // console.log(updating);
        if (updating?.acknowledged) {
            return res.json({
                Message: "Book Updated Sucessfully !",
                Success: true,
            });
        }
    } catch (error) {
        return res
            .status(400)
            .json({ Message: error.message, Success: false });
    }
}


module.exports = {
    handleBookStoreController,
    handleBookListController,
    handleBookDeleteController,
    handleBookUpdateController
};