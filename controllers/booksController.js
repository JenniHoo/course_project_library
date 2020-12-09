const Book = require("../models/book");

const getBookParams = body => {
    return {
        name: body.name,
        author: body.author,
        shelfLocation: body.shelfLocation,
        numberAvailable: body.numberAvailable,
    }
}

module.exports = {
   index: (req, res, next) => {
        Book.find({})
            .then(books => {
                res.locals.books = books;
                next();
            })
            .catch(error => {
                console.log(`Couldn't get books: ${error.message}`)
                next(error);
            })
   },

   indexView: (req, res) => {
        res.render("booklist");
   },

    create: (req, res, next) => {
        let bookParams = getBookParams(req.body);
        console.log(bookParams);
        Book.create(bookParams)
            .then(book => {
                res.locals.redirect = "/books";
                res.locals.book = book;
                next();
            })
            .catch(error => {
                console.log(`Couldn't save book: ${error.message}`);
                res.locals.redirect = "/books/new"
                next();
            });    
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) {
            res.redirect(redirectPath);
        }
        else {
            next();
        }
    },

    delete: (req, res, next) =>{
        let bookID = req.params.id;
        Book.findByIdAndDelete(bookID)
        .then(() => {
            res.locals.redirect = "/books";
            next();
        })
        .catch(error => {
            console.log(`Couldn't delete book: ${error.message}`);
            next();
        }) 
    }
}