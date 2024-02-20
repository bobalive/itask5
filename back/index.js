const express = require('express');
let { faker } = require('@faker-js/faker');
const cors = require('cors');
const { de, en, ru  , Faker} = require('@faker-js/faker');

const PORT  = 5000;

const app = express()

app.use(express.json())
app.use(cors())
app.listen(PORT,()=>{
    console.log('listening');
})


const makeRand = (name,location)=>{

}

const createRandomUser = (seed , location , count , err)=>{

    let formats = []
    switch (location){
        case "ger":
            faker = new Faker({
                locale:[de],
            })
            formats = ['+49 ##########','(0##) ### ###','0 ##########']
            
            break;
        case "uk":
            faker = new Faker({
                locale:[en],
            })
            formats = ['+44 ##########' , '+44 # #########' ,'+44 (0) #### ### ###']
            break;
        case "ru":
            faker = new Faker({
                locale:[ru],
            })
            formats = ['+7 (###) ###-##-##','+7 ### ### ## ##' , '### #######']
        default:
            break;
        
    }

    faker.seed(seed);
    const randUsers = []

    for(let i = 0 ; i < count; i++){
        const city = faker.location.city()
        const state = faker.location.state()
        const streetAddress = faker.location.street()
    
        let locations = [city + ', ' + streetAddress + ', ' + faker.string.numeric({ length: 3, allowLeadingZeros: false }) + ', ' + faker.string.numeric({ length: 3, allowLeadingZeros: false }),state+" "+city  +" "+ streetAddress+ ', ' + faker.string.numeric({length: 3, allowLeadingZeros: false })]
        let location = faker.helpers.arrayElement(locations)

        let name = faker.person.fullName()
        let numbers = faker.phone.number(faker.helpers.arrayElement(formats))

        for(let i = err ;i>0; i--){
            let variants = ['name' , 'adress' ]
            let variant = faker.helpers.arrayElement(variants)
        
            switch(variant){
                case "name":
                    name = makeErr(name)
                    break;
                case "adress":
                    location = makeErr(location)
                    break;
                default:
                    break;
            }
            
        }
        
        randUsers.push({
            userId: faker.string.uuid(),
            address :location,
            name:name,
            number: numbers
        });
        seed += 9999
        faker.seed(seed);

    }
    return randUsers
    }

    const makeErr = (row)=>{
        const errors = [1,2,3]
        const err = faker.helpers.arrayElement(errors)

        switch (err){
            case 1:
                return deleteEl(row)
            case 2:
                return addEl(row)
            case 3:
                return replace(row)
        }
            

    }

    const deleteEl = (el)=>{

        let words = el.split(' ')
        let index = faker.helpers.objectKey(words)
        
        return words.map((item,i)=>{
            if(i == index && item.length >= 3){
                randWord = faker.helpers.objectKey(item)
                
                return item.split('').filter((w,j)=> j != randWord).join('')
            }
            return item
        }).join(' ')
        
        

        
    }
    const addEl = (el)=>{
        let words = el.split(' ')
        let index = faker.helpers.objectKey(words)
        
        return words.map((item,i)=>{
            if(i == index){
                randWord = faker.helpers.objectKey(item)
                
                return item.split('').map((w,j)=>{ 
                    if(j == randWord){
                        
                        return w + faker.helpers.arrayElement([faker.helpers.replaceSymbols('*').toLocaleLowerCase() ,faker.helpers.replaceSymbols('*')])
                    }
                    return w
                    
                }).join('')
            }
            return item
        }).join(' ')
    }

    const replace = (el)=>{
        let words = el.split(' ')
        let index = faker.helpers.objectKey(words)
        
        return words.map((item,i)=>{
            if(i == index){
                let letter = item.split('')
                randWord1 = faker.helpers.objectKey(letter)
                randWord2 = faker.helpers.objectKey(letter)
                
                randLetter1 = letter[randWord1]
                randLetter2 = letter[randWord2]

                letter[randWord1] = randLetter2
                letter[randWord2] = randLetter1
                
                return letter.join('')
            }
            return item
        }).join(' ')
    }


 
    app.get('/', (req, res) => {
        const { page = 1, loc = 'uk', err = 0,seed = 0 } = req.query;
        const users = createRandomUser(parseInt(seed) + parseInt(page), loc, 20 , err);
        res.json(users);
      });