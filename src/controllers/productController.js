const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const getProducts = () => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    return products;
};


let productController = {
    allProducts: (req, res) => {
        const all = getProducts().filter(product => product.all === 'all');
        res.render('./products/all-products',{all});
    },
    detail: (req, res) => {
        const product = getProducts().find(element => element.id == req.params.id); 
        res.render('./products/product-detail', {product});
    },
    create: (req, res) => {
        res.render('./products/create-event');
    },
    store: (req, res) => {
        const productsClone = getProducts();
        // const newTicket = {
        //     price: req.body.price,
        //     ticketType: req.body.ticketType,
        //     lot : req.body.lot
        // }
        // const newFunctions = {
        //     date: req.body.date,
        //     hours: req.body.hours,
        // }
		const newProduct = {             
			id: productsClone[productsClone.length -1].id + 1,
			showType: req.body.showType,
            artist: req.body.artist,
            subtitle: req.body.subtitle,
			description: req.body.description,
			country: req.body.country,
            state: req.body.state,
			city: req.body.city,
            direction : req.body.direction,
			stage: req.body.stage,
            direction: req.body.direction,
            date1: req.body.date1,
            hour1: req.body.hour1,
            ticketType1: req.body.ticketType1,   
            price1: req.body.price1,            
            lot1: req.body.lot1,
            category: req.body.category,
            all: req.body.all,
            linkMaps: req.body.linkMaps,
            linkYT: req.body.linkYT,
			image: req.file ? req.file.filename : null //no pudimos hacer funcionar la subida de la imagen 
		    // class: req.body.class,
            // ticket : [ 
            //     ...newTicket
            // ],
            // functions: [
            //    ...newFunction
            // ],
    }
		productsClone.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(productsClone, null, ' '));
		res.redirect('/');
    },
    edit: (req, res) => {
        const product = getProducts().find(element => element.id == req.params.id); 
        res.render('./products/edit-event', {product});
    },
    update: (req, res) => {
        const indexProducto = getProducts().findIndex(element => element.id == req.params.id);
        const products = getProducts();

            products[indexProducto] = {
            ...products[indexProducto],    
            showType: req.body.showType,
            artist: req.body.artist,
            subtitle: req.body.subtitle,
			description: req.body.description,
			country: req.body.country,
            state: req.body.state,
			city: req.body.city,
            direction : req.body.direction,
			stage: req.body.stage,
            direction: req.body.direction,
            date1: req.body.date1,
            hour1: req.body.hour1,
            ticketType1: req.body.ticketType1,   
            price1: req.body.price1,            
            lot1: req.body.lot1,
            category: req.body.category, 
            linkMaps: req.body.linkMaps,
            linkYT: req.body.linkYT,
			// image: req.file ? req.file.filename : req.body.oldImage
            }

            let productModificarJson = JSON.stringify(products, null, ' ');
            fs.writeFileSync(productsFilePath, productModificarJson);

            res.redirect('/products/all');
    },
    delete : (req, res) => {
		// const deletedProduct =  products.find((prod) => {
		// 	return prod.id == req.params.id;
		// 	});

		// const prodIndex = products.findIndex((p) => p.id == deletedProduct.id);
		
		// products.splice(prodIndex, 1); 
        const allProductsFilter = getProducts().filter(product => product.id != req.params.id);

		fs.writeFileSync(productsFilePath, JSON.stringify(allProductsFilter, null, ' '));

		res.redirect('../all');
       
	}


    };

module.exports = productController;