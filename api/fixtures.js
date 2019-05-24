const mongoose = require('mongoose');
const config = require('./config');
const nanoid = require("nanoid");

const User = require('./models/User');
const Cocktail = require('./models/Cocktail');


const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [user, admin] = await User.create({
            avatar: 'avatar.png',
            username: 'pmwtypecfy_1558630276@tfbnw.net',
            password: '123',
            displayName: 'Joshua Alcgbdbijdda',
            role: 'user',
            token: nanoid()

        },
        {
            avatar: 'avatar.png',
            username: 'hzscddnpmt_1558630272@tfbnw.net',
            password: '123',
            displayName: 'Maria Alcgbecfdcgfa',
            role: 'admin',
            token: nanoid()
        });

     await Cocktail.create(
         {
            user: user._id,
            name: 'Pina colada',
            image: 'colada.jpg',
            recipe: '1. Все ингредиенты (кроме вишенки и ломтика ананаса) взбить в блендере до однородного состояния.\n' +
                '\n' + '2. Полученную смесь перелить в высокий бокал.\n' + '\n' +
                '3. Украсить коктейль вишенкой, долькой ананаса или взбитыми сливками.\n' +
                '\n' + '4. Подавать вместе с трубочкой.',
            isPublished: true,
            ingredients: [
             {name: 'Светлый (белый) ром', amount: '30 мл'},
             {name: 'Ананасовый сок', amount: '90 мл'},
             {name: 'Кокосовое молоко (ликер Малибу)', amount: '30 мл'},
             {name: 'Лед в кубиках', amount: '50 грамм'},
             {name: 'Сливки (11-15% жирности)', amount: '20 мл (необязательно)'},
             {name: 'Ломтик ананаса или коктейльная вишенка', amount: '1 штука'},
             ]
         },

         {
             user: user._id,
             name: 'Mohito',
             image: 'mohito.jpg',
             recipe: 'Положи в хайбол лайм 3 дольки и подави мадлером\n' +
                 'Возьми мяту 10 листиков в одну руку и хлопни по ним другой рукой\n' +
                 'Положи мяту в хайбол\n' +
                 'Наполни бокал дробленым льдом доверху\n' +
                 'Добавь сахарный сироп 15 мл и белый ром 50 мл\n' +
                 'Долей содовую доверху и аккуратно размешай коктейльной ложкой\n' +
                 'Досыпь немного дробленого льда\n' +
                 'Укрась веточкой мяты и долькой лайма',
            isPublished: false,
             ingredients: [
                 {name: 'Лайм', amount: '3 шт'},
                 {name: 'Сахар тростниковый', amount: '4 ч.л.'},
                 {name: 'Мята свежая', amount: '20-24 листика'},
                 {name: 'Ром белый', amount: '50 мл'},
                 {name: 'Вода газированная', amount: '20 мл (необязательно)'},
                 {name: 'Лёд', amount: '4 штуки'},
             ]
         },
         );

    await connection.close();
};

run().catch(error => {
    console.error('Something went wrong', error);
});