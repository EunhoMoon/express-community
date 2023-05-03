import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Controllers from './controllers';
import { swaggerDocs, options } from './swagger'
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(cors({origin: '*'}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: '700mb'}));

Controllers.forEach(controller => {
    app.use(controller.path, controller.router);
});

app.get('/swagger.json', (req, res) => {
    res.status(200).json(swaggerDocs);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(undefined, options));

app.get('/', (req, res) => {
    res.send('Hello Node.js');
});

app.use((err, req, res, next) => {
    console.log(err);

    res.status(err.status || 500).json({message: err.message || '서버에서 에러가 발생하였습니다.'});
})

app.listen(8000, () => {
    console.log('Server is Running');
});