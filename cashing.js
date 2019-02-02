//If a request has been sent for more information within two minutes of the last request, the information will come from the 'cashing', otherwise: the information comes from API
window.cacheObj = window.cacheObj || {};
setInterval(function () {
    getProjects(function (d) {
        console.log(d)
    })
}, 1 * 1000);
function getProjects(callback) {
    const lastTime = window.cacheObj.lastFetch;
    if (lastTime) {
        const dateNow = new Date();
        const diff = (dateNow.getTime() - lastTime.getTime()) / 1000;
        if (diff > 20) {
            h(callback);
        } else {
            callback(window.cacheObj.projects);
            console.log('from cache')
        }
    } else {
        h(callback);
    }
}
function h(callback) {
    getProjectsFromServer(function (pData) {
        window.cacheObj.projects = pData;
        window.cacheObj.lastFetch = new Date();
        callback(pData);
        console.log('from server')
    });
}
function getProjectsFromServer(callback) {
    $.ajax('http://localhost:3000/project').done(function (d) {
        callback(d);
    });
}