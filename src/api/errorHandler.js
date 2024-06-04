import { Notify } from 'quasar';

/**
 * Helper function to process Axios errors
 *
 * @param error Axios error object
 */
export function processError(error) {
    let result = {
        code: null,
        message: 'Unknown error',
        errors: null,
        links: null,
    };

    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        switch (error.response.status) {
            case 422:
                const sanitizedErrors = {};
                for (const key in error.response.data.errors) {
                    if (Array.isArray(error.response.data.errors[key])) {
                        sanitizedErrors[key] = error.response.data.errors[key][0];
                    }
                }
                result.code = 422;
                result.message = error.response.data.message;
                result.errors = sanitizedErrors;
                result.links = error.response.data.links;
                break;
            case 400:
                result.code = 400;
                result.message = error.response.data.message;
                result.errors = error.response.data.errors;
                break;
            case 401:
                result.message = error.response.data.message;
                result.errors = error.response.data.errors;
                break;
            case 402:
                result.code = 402;
                result.message = error.response.data.message;
                break;
            case 403:
                result.code = 403;
                result.message = 'Unauthorized access.';
                break;
            case 404:
                result.code = 404;
                result.message = '404 not found:' + error.config.url;
                break;
            case 429:
                result.code = 429;
                result.message = 'Too many attempts, please try again later.';
                break;
            case 500:
                result.code = 500;
                result.message =
                    'There was a problem processing your request, please try again later.';
                break;
            case 503:
                result.code = 503;
                result.message = error.response.data.message;
                break;
            default:
                result.message = 'Unknown error';
                break;
        }

        if (result.code != 422) {
            Notify.create({
                message: result.message,
                group: true,
                icon: 'warning',
                color: 'negative',
                position: 'top',
            });
        }
    } else if (error.request) {
        // The request was made but no response was received
    } else {
        // Something happened in setting up the request that triggered an Error
        result.message = 'Axios error: ' + error.message;
    }
    return result;
}
