
export class HttpRequestError extends Error {
    constructor(response) {
        super(`Network response was not ok: ${response.status} ${response.statusText}`);
        this.response = response;
    }
}

const fetchData = (url, requestOptions) => {
    const apiUrl = `${"http://localhost:8080"}${url}`;

    const allRequestOptions = {credentials: "include", ...requestOptions};

    return fetch(apiUrl, allRequestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new HttpRequestError(response);
            }
            if (requestOptions.method ==="GET")
                return response.json();
            return; // v této aplikaci neočekávám od beckendu vrácený JSON po akcích PUT, POST, DELETE... v samotné response jsou informace o stavu provedeného fetch, můžeme si je vrátit (response.status)
        })
        .catch((error) => {
            throw error;
        });
};

export const apiGet = (url) => {
// export const apiGet = (url, params) => {    
    // const filteredParams = Object.fromEntries(
    // Object.entries(params || {}).filter(([_, value]) => value != null)
    // );
    // const apiUrl = `${url}?${new URLSearchParams(filteredParams)}`;
    const apiUrl = `${url}`;
    const requestOptions = {
        method: "GET",
    };
    return fetchData(apiUrl, requestOptions);
};

export const apiPost = (url, data) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    return fetchData(url, requestOptions);
};

export const apiPut = (url, data) => {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    return fetchData(url, requestOptions);
};

export const apiDelete = (url) => {
    const requestOptions = {
        method: "DELETE",
    };
    return fetchData(url, requestOptions);
};
