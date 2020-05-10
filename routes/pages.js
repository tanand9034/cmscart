var express = require('express');
var router = express.Router();

// Get Page model
var Page = require('../models/page');
var Product = require('../models/product')

/*
 * GET /
 */
// router.get('/edit-page/:slug', (req, res) => {
//     Page.findOne({slug : req.params.slug}).then((page) => {
//       if(!page) { //if page not exist in db
//         return res.status(404).send('Page not found');
//       }
//       res.render('admin/edit_page', { //page  exist
//         title: page.title,
//         slug: page.slug,
//         content: page.content,
//         id: page._id
//       });
//     }).catch((e) => {//bad request 
//       res.status(400).send(e);
//     });
//   });
router.get('/', function (req, res) {

    Page.findOne({ slug: 'home' }, function (err, page) {
        Product.find(function (err, products) {
            if (err)
                console.log(err);

            res.render('index', {
                title: page.title,
                content: page.content,
                products: products
            });
            
        });
    });

});

/*
 * GET a page
 */
router.get('/:slug', function (req, res) {

    var slug = req.params.slug;

    Page.findOne({ slug: slug }, function (err, page) {
        if (err)
            console.log(err);

        if (!page) {
            res.redirect('/');
        } else {
            res.render('index', {
                title: page.title,
                content: page.content
            });
        }
    });


});

// Exports
module.exports = router;


