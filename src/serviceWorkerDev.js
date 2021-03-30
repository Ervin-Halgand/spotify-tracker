
const serviceWorker = () => {
    let serviceWorkerUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`
    navigator.serviceWorker.register(serviceWorkerUrl, {
        scope: '.'
    }).then((res) => {
        console.warn("res", res);
    })
};
export default serviceWorker