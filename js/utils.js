const utils = {
    getRandomNumber: (min, max) => {
        let randomNumber =  Math.random() * (max - min) + min;
        return Math.round(randomNumber);
    }
}