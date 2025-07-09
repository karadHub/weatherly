function handleErrors(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response;
}

function autoRefresh(callback, interval = 600000) {
    setInterval(callback, interval);
}