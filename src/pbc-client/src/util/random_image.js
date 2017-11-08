class RandomImage{

    randomNumber(){
        let max = 90;
        let min = 10;
        return Math.floor(Math.random() * (max - min)) + min; 
    }

    randomGender(){
        let max = 10;
        let min = 1;
        let randomNUm = Math.floor(Math.random() * (max - min)) + min;
        
        if(randomNUm % 2 === 0)
            return "men";
        
        return "women";
    }

    get(){
        let num =  "" + this.randomNumber();
        let gender = this.randomGender();

        return `https://randomuser.me/api/portraits/${gender}/${num}.jpg`
    }
}

let randomImage = new RandomImage()

export default randomImage;