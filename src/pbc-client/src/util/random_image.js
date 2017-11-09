class RandomImage{

    randomNumber(){
        const max = 90;
        const min = 10;
        return Math.floor(Math.random() * (max - min)) + min; 
    }

    randomGender(){
        const max = 10;
        const min = 1;
        const randomNUm = Math.floor(Math.random() * (max - min)) + min;
        if(randomNUm % 2 === 0)
            return "men";
        return "women";
    }

    get(){
        const num =  "" + this.randomNumber();
        const gender = this.randomGender();

        return `https://randomuser.me/api/portraits/${gender}/${num}.jpg`
    }
}

let randomImage = new RandomImage()

export default randomImage;