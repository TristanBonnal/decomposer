const utils = {
    getRandomNumber: (min, max, unique) => {
        let randomNumber =  Math.random() * (max - min) + min;
        return Math.round(randomNumber);
    },
};