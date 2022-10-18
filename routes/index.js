
const appRouter= require('express').Router();


require('../modules/user/user.routes')(appRouter);
// require('../modules/postRoutes')(appRouter)
// require('../modules/product/product.routes')(appRouter);

module.exports=appRouter;

