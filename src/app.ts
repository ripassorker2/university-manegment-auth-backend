import { StatusCodes } from 'http-status-codes';
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();

// cors
app.use(cors());

// body perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes
app.use('/api/v1', routes);

// globalErrorHandler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
   res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Not Found',
      errorMessages: [
         {
            path: req.originalUrl,
            message: 'API Not Found',
         },
      ],
   });
   next();
});

export default app;
