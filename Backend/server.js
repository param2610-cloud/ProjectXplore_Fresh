import express, { text } from 'express';
import { logger, logEvents } from './src/middlewares/logger.js';
import ErrorHandler from './src/middlewares/errorHandler.js';
import cors from 'cors';
import { corsOptions } from './src/config/corsOptions.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


// app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/', express.static("public"));
app.use(cookieParser());

//router import 
import prisma from './src/db/prismaClient.js';
import userRouter from './src/routes/user.router.js';
import selfRouter from './src/routes/data.router.js'
import thirdpartyRouter from './src/routes/thirdParty.router.js'
import teamrouter from './src/routes/team.router.js'
import idearouter from './src/routes/idea.router.js'
import projectRouter from './src/routes/project.router.js'
import roomRouter from './src/routes/room.router.js'
import updateRouter from './src/routes/update.router.js'
import portfolioRouter from './src/routes/portfolio.router.js'
import coordinator from './src/routes/mentor.router.js';

//router declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/self', selfRouter);
app.use('/api/v1/third-party',thirdpartyRouter)
app.use('/api/v1/team',teamrouter)
app.use('/api/v1/idea',idearouter)
app.use('/api/v1/project',projectRouter)
app.use('/api/v1/room',roomRouter)
app.use('/api/v1/update',updateRouter)
app.use("/api/v1/portfolio",portfolioRouter)
app.use("/api/v1/mentor",coordinator)
app.get("/", (req, res) => {
    res.json({ "message": "ProjectXplore backend" });
});


// app.use(ErrorHandler);




app.listen(port, () => {
    console.log(`Server is activated and running on port ${port}`);
});

