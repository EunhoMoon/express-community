import * as Swagger from '../controllers/swagger';
import defaultSwagger from "./defaultSwagger";

const {paths} = Object.values(Swagger).reduce((acc, apis) => {
    const APIs = Object.values(apis).map(api => {
        return {...api};
    });
    APIs.forEach(api => {
        const key = Object.keys(api)[0];
        if (!acc.paths[key]) {
            acc.paths = {
                ...acc.paths,
                ...api
            }
        } else {
            acc.paths[key] = {
                ...acc.paths[key],
                ...api[key]
            };
        }
    });
    return acc;
}, {paths: {}});

export const swaggerDocs = {
    ...defaultSwagger,
    paths
};

export const options = {
    swaggerOptions: {
        url: '/swagger.json'
    }
}