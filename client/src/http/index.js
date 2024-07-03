import axios from 'axios'

export const API_URL = `http://localhost:5000`

const $api = axios.create({
    baseURL: API_URL, 
})

 // Jтслеживаю текущие запросы, которые выполняются
const currentExecutingRequests = {} ;

$api.interceptors.request.use(
    (req) => {
        let originalRequest = req;

        if (currentExecutingRequests[req.url]) {
            const source = currentExecutingRequests[req.url];
            delete currentExecutingRequests[req.url];
            source.cancel();
        }

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        originalRequest.cancelToken = source.token;
        currentExecutingRequests[req.url] = source;

        //здесь вы можете добавить заголовок авторизации к запросу

        return originalRequest;
    },
    (err) => {
        return Promise.reject(err);
    }
);

$api.interceptors.response.use(
    (response) => {
        if (currentExecutingRequests[response.request.responseURL]) {
            // здесь вы очищаете запрос
            delete currentExecutingRequests[response.request.responseURL];
        }
        return response;
    },
    (error) => {
        const { config, response } = error;
        const originalRequest = config;

        if (axios.isCancel(error)) {
            // здесь вы проверяете, является ли это отмененным запросом, чтобы автоматически удалить его (без ошибок).
            return new Promise(() => {});
        }
        if (currentExecutingRequests[originalRequest.url]) {
            // здесь вы очищаете запрос
            delete currentExecutingRequests[originalRequest.url];
        }
        // здесь вы можете проверить токен с истекшим сроком действия и обновить его при необходимости
        return Promise.reject(error);
    }
);


export default $api






