
const serviceWorker = () => {
    if ('serviceWorker' in navigator) {
        let serviceWorkerUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`
        window.addEventListener('load', () => {
            navigator.serviceWorker.register(serviceWorkerUrl, {
                scope: '.'
            }).then((res) => {
                console.warn("service worker registered");
            })
        })
    }
};
export default serviceWorker