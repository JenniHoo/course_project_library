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
    }
}