const db = require('../../database/models');
const sequelize = db.sequelize;
const Op = db.sequelize.Op;

const Events = db.Event;
const Categories = db.Category;

const apiProductController = {
    eventsList: async (req, res) => {
        try {

            const showAllEvents = (events) => {
                let allEvents = [];
                
                for (let i = 0; i < events.length; i++) {
                    const event = events[i];
                    
                    const eventDetail = {
                        id: event.id,
                        artist: event.artist,
                        subtitle: event.subtitle,
                        description: event.description,
                        category: event.categories.name,
                        linkYoutube: event.linkYoutube,
                        detail: "http://localhost:3000/api/products/" + event.id
                    };
                    allEvents.push(eventDetail);
                    
                }
                return allEvents;
            }

            const events = await Events.findAll({
                include: [
                    'categories'
                ],
                attributes: [
                    'id',
                    'artist',
                    'subtitle',
                    'description',
                    'linkYoutube'
                ]
            });

            // const categories = await Events.findAll({
            //     attributes: {
            //         include: [
            //             [sequelize.fn('COUNT', sequelize.col('category_id'), 'eventCount')]
            //         ]
            //     },
            //     include: [
            //         {
            //             model: Categories,
            //             attributes: name
            //         }
            //     ],
            //     group: ['categories.id']
            // });
            // console.log(categories)

            const categories = await Categories.findAll({
                
                include: ['events'],
                group: ['category.id']
            });

            // const eventsCategory = await Categories.findAll({
            //     attributes: ['category_id', [sequelize.fn('count', sequelize.col('events.category_id')), 'eventCount']],
            //     include: [{ attributes: [], model: Events }],
            //     group: ['categories.id']
            //   });
           
            return res.json({
                count: events.length,
                categories: categories,
                products: showAllEvents(events)
            });

        } catch (error) {
            res.send(error)
        }
    },
    eventDetail: async (req, res) => {
        try {
            const event = await Events.findByPk(req.params.id,{
                include: [
                    'categories', 
                    'showtypes', 
                    'teaters',
                    'citys',
                    'states',
                    'countrys' 
                ]
            });


            return res.json({
                
                id: event.id,
                artist: event.artist,
                subtitle: event.subtitle,
                description: event.description,
                linkYoutube: event.linkYoutube,
                image: 'http://localhost:3000/images/products' + event.imageEvent,
                category: event.categories,
                teater: event.teaters,
                citys: event.citys,
                states: event.states,
                countries: event.countrys,
                showtypes: event.showtypes
            })
        } catch (error) {
            res.send(error)
        }
    },
}
module.exports = apiProductController;
