
const serviceWorker = () => {
    let serviceWorkerUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`
    navigator.serviceWorker.register(serviceWorkerUrl).then((res) => {
        console.warn("res", res);
    })
};
export default serviceWorker