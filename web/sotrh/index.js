import init from 'src/sotrh/pkg';

init().then((test) => {
    console.log("loaded");
}).catch((error) => {
    if (!error.message.startsWith("Using exceptions for control flow,")) {
        throw error;
    }
});