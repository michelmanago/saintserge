export async function fetchWrapper(url, data, method, dataType = 'JSON') {
    let options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: method,
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    let res = await fetch(url, options);

    return res;
}
