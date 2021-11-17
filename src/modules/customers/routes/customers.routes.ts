import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersControllers from '../controllers/CustomersControllers';
import isAuthenticated from '../../users/middlewares/isAuthenticated';

const customersRouter = Router();
const customersController = new CustomersControllers();

customersRouter.use(isAuthenticated);

customersRouter.get('/', customersController.index);
customersRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customersController.show,
);
customersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
    }),
    customersController.create,
);
customersRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
    }),
    customersController.update,
);
customersRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customersController.delete,
);

export default customersRouter;
