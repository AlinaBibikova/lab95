const mongoose = require('mongoose');
const config = require('./config');
const nanoid = require("nanoid");

const User = require('./models/User');
const Cocktail = require('./models/Item');


const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [user, admin] = await User.create({
            avatar: 'avatar.png',
            username: 'user',
            password: '123',
            displayName: 'Don Joe',
            role: 'user',
            token: nanoid()

        },
        {
            avatar: 'avatar.png',
            username: 'admin',
            password: '123',
            displayName: 'Jack Dan',
            role: 'admin',
            token: nanoid()
        });

     await Cocktail.create(
         {
            user: user._id,
            nameCocktail: 'Pina colada',
            image: 'colada.jpg',
            recipe: '1. Все ингредиенты (кроме вишенки и ломтика ананаса) взбить в блендере до однородного состояния.\n' +
                '\n' + '2. Полученную смесь перелить в высокий бокал.\n' + '\n' +
                '3. Украсить коктейль вишенкой, долькой ананаса или взбитыми сливками.\n' +
                '\n' + '4. Подавать вместе с трубочкой.',
            published: true,
            ingredients: [
             {position: 1, nameIngredient: 'Светлый (белый) ром', amount: '30 мл'},
             {position: 2, nameIngredient: 'Ананасовый сок', amount: '90 мл'},
             {position: 3, nameIngredient: 'Кокосовое молоко (ликер Малибу)', amount: '30 мл'},
             {position: 4, nameIngredient: 'Лед в кубиках', amount: '50 грамм'},
             {position: 5, nameIngredient: 'Сливки (11-15% жирности)', amount: '20 мл (необязательно)'},
             {position: 6, nameIngredient: 'Ломтик ананаса или коктейльная вишенка', amount: '1 штука'},
             ]
         },

         {
             user: user._id,
             nameCocktail: 'Mohito',
             image: 'mohito.jpg',
             recipe: 'Положи в хайбол лайм 3 дольки и подави мадлером\n' +
                 'Возьми мяту 10 листиков в одну руку и хлопни по ним другой рукой\n' +
                 'Положи мяту в хайбол\n' +
                 'Наполни бокал дробленым льдом доверху\n' +
                 'Добавь сахарный сироп 15 мл и белый ром 50 мл\n' +
                 'Долей содовую доверху и аккуратно размешай коктейльной ложкой\n' +
                 'Досыпь немного дробленого льда\n' +
                 'Укрась веточкой мяты и долькой лайма',
             published: false,
             ingredients: [
                 {position: 1, nameIngredient: 'Лайм', amount: '3 шт'},
                 {position: 2, nameIngredient: 'Сахар тростниковый', amount: '4 ч.л.'},
                 {position: 3, nameIngredient: 'Мята свежая', amount: '20-24 листика'},
                 {position: 4, nameIngredient: 'Ром белый (для алкогольного коктейля)', amount: '50 мл'},
                 {position: 5, nameIngredient: 'Вода газированная', amount: '20 мл (необязательно)'},
                 {position: 6, nameIngredient: 'Лёд', amount: '4 штуки'},
             ]
         },
         );

    await connection.close();
};

run().catch(error => {
    console.error('Something went wrong', error);
});