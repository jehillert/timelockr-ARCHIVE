const debug = require('debug')('server:controllers');
const hash = require('pbkdf2-password')();
const helpers = require('./helpers');
const models = require('./models');
const auth = require('./helpers/auth');
const util = require('util');

Object.prototype.parseSqlResult = function() {
  return JSON.parse(JSON.stringify(this[0]));
};

module.exports = {
  signin: {
    post: (req, res) =>
      models.credentials.get(['credentials', 'username', req.body.username])
        .then(user => {
          user = user.parseSqlResult();
          if (!user.username) throw new Error('Invalid username.');
          return user;
        })
        .then(user => {
          hash({ password: req.body.password, salt: user.salt }, function (err, pass, salt, hash) {
            if (err) throw err;
            if (hash !== user.hash) throw new Error('Invalid password.');
            req.session.regenerate(() => {
              req.session.user = user;
              req.session.save();
            });
          });
        })
        .then(() => res.sendStatus(202))
        .catch(error => console.error('Error', error))
  },

  logout: {
    get: (req, res) => req.session.destroy()
      .then(() => res.status(200).json({message: 'Logout successful.'}))
      .catch(error => console.error('Error', error))
  },

  credentials: {
    put: (req, res) => updateField(req, res),
    delete: (req, res) => deleteFromTable(req, res)
  },

  secrets: {
    get: (req, res) =>
      models.secrets.get(['secrets', 'user_id', 'username', req.query.username])
        .then(results => helpers.filterAndFormatSecrets(results))
        .then(results => res.json(results))
        .catch(error => console.error('Error', error)),
    put: (req, res) => updateField(req, res),
    post: (req, res) => postToTable(req, res),
    delete: (req, res) => deleteFromTable(req, res)
  },

  signup: {
    post: (req, res) =>
      models.credentials
        .post([ 'credentials',
                'username',
                'hash',
                'salt',
                req.body.username,
                req.body.hash,
                req.body.salt])
        .then(results => res.sendStatus(201))
        .catch(error => res.sendStatus(409))
        // .then(results => res.status(201).json({message: 'New user successfully created.'}))
  }
};

function deleteFromTable(req, res) {
  let params = helpers.getQueryParams(req);
  models.general
    .delete(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}

function postToTable(req, res) {
  let params = helpers.getQueryParams(req);
  models[params[0]]
    .post(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}

function updateField(req, res) {
  let params = helpers.getQueryParams(req);
  models.general
    .put(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}



/*
async function processArray(array) {
  for (const item of array) {
    await delayedLog(item);
  }
  console.log('Done!');
}

let credArray = [
  [1, 'Maurine42', '6bUeeOIkHbXNFGA'],
  [2, 'Lorenza.G ulgowski72','gBeH_CD67ijJI1O'],
  [3, 'Johnpaul_Kutch', 'WPHasx8NP7RJhNo'],
  [4, 'Clemmie.K unde','Ru0xeNYUQ0icQbw'],
  [5, 'Abelardo_Hermann', 'YbtFi7CAsQU7uL_'],
  [6, 'Santa_DAmore', 'ANURWXRx_wB4TKR'],
  [7, 'Caroline_Cummings', 'sBoI4uKwU3ny7WL'],
  [8, 'Oscar68', 'G3OuPcGJ2JiZVtX'],
  [9, 'Thora8', 'OcFIsVJO4PnDMxm'],
  [10, 'Nettie_Runte', 'xcO_l3RIAkaHNm2'],
  [11, 'Alysha12', 'K7mvGDAnTSUOkJD'],
  [12, 'Pink24', 'KZdGv3XdaszwPEV'],
  [13, 'Lonny83', 'uNjtldisodBIasc'],
  [14, 'Kennith.B ogan','t_CBTdV6W_8HuLy'],
  [15, 'Kamron.S tiedemann47','xaQvRZXnpBBwFGh'],
  [16, 'Melvina_Kozey42', 'p8eQgTZXCVa3eaU'],
  [17, 'Kyler_Littel8', 'wX7gQjK42nHMskh'],
  [18, 'Martin51', 'MHmaAIzODjCg5Id'],
  [19, 'Melany.S enger','KXhFMzlmD0j4M0x'],
  [20, 'Anastasia.B oehm','fFV2MqJuIDzsXxV'],
  [21, 'Garret_Mohr', 'rN87Gj4j079cFBZ'],
  [22, 'Odie_Wuckert', 'xEHWgV52FqglunP'],
  [23, 'Aylin10', 'KwkiRBvsqw_DDbV'],
  [24, 'Verlie_Schmeler', 'x4Tbr2VW1QrhFnv'],
  [25, 'Shaylee_Rowe', 'tRoklOQJssvDJst'],
  [26, 'Makenzie.K ohler83','GfYR_Kd_UNJjcdT'],
  [27, 'Parker_Wunsch', 'T8yttFU_UE2M0RB'],
  [28, 'Lilliana43', '6hmMt8LICxZsmx0'],
  [29, 'Misty_Larson46', '6kPlWCBmUE0jdJ3'],
  [30, 'Zella74', 'SqYzVuf8tlfDPa4'],
  [31, 'Bridgette_Braun', '9dmLRbT8hAxVutg'],
  [32, 'Jewel.A nkunding','hATavzpw3hA8QE_'],
  [33, 'Stuart52', 'yK66AqooBV0pvlQ'],
  [34, 'Una_Abshire15', 'H844baOYBKTAZFS'],
  [35, 'Domenic_Heller38', 'bbJw3FiJOW5CojC'],
  [36, 'Gene34', 'X863cVOhNGXFXuz'],
  [37, 'Jedidiah_Prohaska', 'Z1_AlqnuYN47wYC'],
  [38, 'Sierra18', 'ruXqxEb3v6lr3ae'],
  [39, 'Delpha45', '2hSsIJBFK2C4DEe'],
  [40, 'Tia.K och82','0nggh6BaBLmdFIf'],
  [41, 'Ruthie.R uecker','vJSN7KPnALOGwR0'],
  [42, 'Emerald70', 'DMUToxcbgAHqTP_'],
  [43, 'Annette.B ins70','DN4FtmrWfFOKOsB'],
  [44, 'Stephon_Prohaska7', 'OTcsho8B8gPF425'],
  [45, 'Art67', 'xJ9qWgQ8ros0H2t'],
  [46, 'Jovani63', '2YWq4LJtfZdUhIl'],
  [47, 'Sheridan55', 'PcFekD2Xed0hGJH'],
  [48, 'Mariah_Borer39', 'N0oogEzVp4IbsMj'],
  [49, 'Cordie68', 'QQPet4OMY47g0qF'],
  [50, 'Aryanna.Z iemann44','n8Q_Y6_egqJCOxj'],
  [51, 'Ryann_Fay', 'O0MeWyelhsFqyhV'],
  [52, 'Alfred_Bergnaum', '5w8CqEhoRr25YvH'],
  [53, 'Harmon.G lover','oN84I8ly6Tf_Ths'],
  [54, 'Ryder_Jaskolski7', 'FI8rW9bf25zg621'],
  [55, 'Casimer.C orkery','_9BgmHmciz7Kqdi'],
  [56, 'Mustafa.G oodwin','XuZ6Fba0owLFB6W'],
  [57, 'Ignatius.F ay31','5P4MyzrKV5ZLc_7'],
  [58, 'Zander_Wiza39', '2qhai3popbwPx25'],
  [59, 'Jesus_Casper55', 'ZBog7xmUsQtDoIA'],
  [60, 'Clyde.L ang40','SvfeyLh2cCNSHjG'],
  [61, 'Elian_Hills', 'yO9CV0MUc9VWfW4'],
  [62, 'Fiona.F eeney','nwwUQlIc5frs302'],
  [63, 'Casimer_Glover', 'xO2hZDWWtYg8oJX'],
  [64, 'Evan28', 'DtfGdQ2Nbgi3lsT'],
  [65, 'Brielle.L ockman94','5fJbJs6fesuRMd5'],
  [66, 'Macy6', 'or8p9flibSfLreF'],
  [67, 'Karolann.S hields52','YvpKi8umbp4eUjO'],
  [68, 'Anastasia_Douglas11', 'ttTVwlaEYMIb5gH'],
  [69, 'Elyse_Heaney', 'zmmymCSawwd53_h'],
  [70, 'Derrick_Auer', 's7Sv9Vo6RvoFmnj'],
  [71, 'Donna_Berge', '9S1vWNcoxszHdFn'],
  [72, 'Roscoe.G ibson','wCSnA25yEX4RXu5'],
  [73, 'Vaughn.T rantow','6agSdFdctA1Dgjl'],
  [74, 'Astrid97', 'kgQr1Yg500cNRvH'],
  [75, 'Tina_Mosciski', 'fcJ6y0e9bk3Yukn'],
  [76, 'Santiago_Cormier', '_M3idnyIiATCw0m'],
  [77, 'Stevie.M oore1','OiNIBgH7M9Uj6TL'],
  [78, 'Kyra_Heller29', 'bxI25KgsfyYXD7k'],
  [79, 'Roxane_Kuhlman', 'MYkOMYM1Ov4dfVZ'],
  [80, 'Kevin61', '61GoSqbFq6mxfdL'],
  [81, 'Brooks85', 'u5_RlHJdlloj5bK'],
  [82, 'Joaquin.J ones81','tMajLPA3QYo0rrd'],
  [83, 'Buster.P owlowski','pCgU9N07fVV2Brb'],
  [84, 'Jevon.S tark','wOSVX8D9Q3Ldoey'],
  [85, 'Destiney_Ebert60', '7y5qCemjAPn3Rff'],
  [86, 'Jalyn_Stamm', 'LDiPItyrtRq9MSF'],
  [87, 'Mauricio5', 'dMPEO2e34CXb010'],
  [88, 'Clyde_Davis', 'Z5ttuKiMe6POyJ8'],
  [89, 'Lucile.L ang','KVdiP55Oihd6MIo'],
  [90, 'Jeanie_Corwin45', 'eVD1gnR2HcOBPXk'],
  [91, 'Antoinette12', 'tIisUKDI4347rzz'],
  [92, 'Tania.T romp54','MBkIxJjGVjHS5o7'],
  [93, 'Nichole8', 'IOzRL91_1QSdAFc'],
  [94, 'Marquis72', 'SoFfnsMg85CgHrp'],
  [95, 'Jaden.Z ieme','ZGEcodkswSvhE2W'],
  [96, 'Retta13', 'F3ptPiWyZVtR8eE'],
  [97, 'Celia_Trantow35', 'ZcVLGomktLQZCeQ'],
  [98, 'Delpha.T rantow','n93KcbZeTN8vFD2'],
  [99, 'Frederic_Pfannerstill', 'a6ZqSPtkTzATyrj'],
  [100, 'Margarete57', 'Vx8dX8AsvFHPP_t']
];

for (newUser of credArray) {

}
  signup: {
    post: (req, res) =>
      models.credentials
        .post([ 'credentials',
                'username',
                'hash',
                'salt',
                req.body.username,
                req.body.hash,
                req.body.salt])
        .then(results => res.sendStatus(201))
        .catch(error => res.sendStatus(409))
        // .then(results => res.status(201).json({message: 'New user successfully created.'}))
  }

// secret_id,user_id,secret_id,creation_date,release_date,secret_label,secret_body
let entriesArray = [
  [1, 1, '2019-02-09 17:52', '2019-02-09 21:44', 'qui quia','Et inventore eligendi in deserunt id.'],
  [2, 1, '2019-02-09 17:52', '2019-02-09 20:29', 'sit odio','Vitae provident quo provident.'],
  [3, 2, '2019-02-09 17:52', '2019-02-09 23:39', 'molestiae beatae','Necessitatibus molestiae placeat saepe eligendi.'],
  [4, 3, '2019-02-09 17:52', '2019-02-09 22:02', 'id veniam','Et nisi aut corporis laboriosam esse est.'],
  [5, 3, '2019-02-09 17:52', '2019-02-09 23:00', 'accusamus officiis','Excepturi blanditiis libero ut qui.'],
  [6, 3, '2019-02-09 17:52', '2019-02-09 18:58', 'fuga enim','Non voluptas quia vitae ipsam voluptas necessitatibus et.'],
  [7, 4, '2019-02-09 17:52', '2019-02-09 20:16', 'eius iure','Molestiae at voluptas quo ex.'],
  [8, 4, '2019-02-09 17:52', '2019-02-09 23:58', 'ipsa incidunt','Vel in unde nihil iste.'],
  [9, 5, '2019-02-09 17:52', '2019-02-09 20:02', 'nulla exercitationem','Illum at natus eum cum ipsam consequatur.'],
  [10, 6, '2019-02-09 17:52', '2019-02-09 23:13', 'ut exercitationem','Error quaerat porro error sint aut aliquid qui harum minus.'],
  [11, 7, '2019-02-09 17:52', '2019-02-09 22:49', 'facere rem','Molestias ab esse impedit aliquam quo vel dolorem.'],
  [12, 8, '2019-02-09 17:52', '2019-02-09 21:23', 'vel voluptatum','Ipsum molestiae inventore placeat nesciunt.'],
  [13, 8, '2019-02-09 17:52', '2019-02-09 23:26', 'laboriosam facere','Beatae nobis vero quia qui et.'],
  [14, 9, '2019-02-09 17:52', '2019-02-09 22:16', 'consequatur expedita','Laudantium recusandae error culpa nihil quia quis.'],
  [15, 9, '2019-02-09 17:52', '2019-02-09 22:26', 'voluptatem vel','Libero fugiat doloremque deserunt quidem totam aperiam tempore.'],
  [16, 9, '2019-02-09 17:52', '2019-02-09 23:58', 'reprehenderit rem','Quia delectus perspiciatis sunt et inventore et officia.'],
  [17, 10, '2019-02-09 17:52', '2019-02-09 23:29', 'quia expedita','Placeat amet sed esse aut doloribus dolores ut ipsum.'],
  [18, 10, '2019-02-09 17:52', '2019-02-09 22:53', 'nobis sint','Sunt fuga laudantium ipsam quas quos ipsam.'],
  [19, 11, '2019-02-09 17:52', '2019-02-09 18:28', 'aspernatur sit','Occaecati sapiente deleniti nisi ipsam quibusdam.'],
  [20, 12, '2019-02-09 17:52', '2019-02-09 21:43', 'dolores ut','Autem quia numquam voluptatibus odit in incidunt.'],
  [21, 12, '2019-02-09 17:52', '2019-02-09 18:54', 'ullam in','Maxime veniam in commodi voluptas consequatur voluptatibus consequatur.'],
  [22, 12, '2019-02-09 17:52', '2019-02-09 19:41', 'provident voluptatum','Unde mollitia iusto nostrum.'],
  [23, 13, '2019-02-09 17:52', '2019-02-09 21:46', 'praesentium non','Voluptatem repellat earum.'],
  [24, 13, '2019-02-09 17:52', '2019-02-09 17:55', 'fugiat et','Ratione quia quo mollitia minima sit ut quisquam vitae.'],
  [25, 14, '2019-02-09 17:52', '2019-02-09 22:20', 'officia alias','Necessitatibus iste laboriosam et harum alias sit deleniti necessitatibus molestiae.'],
  [26, 14, '2019-02-09 17:52', '2019-02-09 20:09', 'velit explicabo','Nihil voluptate aut.'],
  [27, 15, '2018-06-18 05:46', '2019-06-17 02:20', 'consequatur ea','Aut itaque totam voluptates.'],
  [28, 15, '2018-04-15 15:29', '2019-11-06 02:19', 'ullam quidem','Ad deleniti quia veniam suscipit quam voluptas esse aut est.'],
  [29, 16, '2018-06-25 05:24', '2019-06-12 00:02', 'quas minima','Quod culpa natus.'],
  [30, 17, '2018-05-03 16:27', '2019-07-17 06:41', 'dolores sit','Tenetur omnis expedita error.'],
  [31, 18, '2019-01-24 21:31', '2019-08-20 02:13', 'voluptatem nulla','Blanditiis sequi minima sed recusandae atque ipsam voluptatum voluptates et.'],
  [32, 19, '2018-12-18 18:53', '2019-12-04 13:44', 'sit eos','Molestias atque exercitationem molestiae hic.'],
  [33, 19, '2018-06-16 18:51', '2019-05-14 17:14', 'soluta quia','Aut et maiores sunt voluptate cum expedita laborum voluptate.'],
  [34, 20, '2019-01-06 15:26', '2020-01-05 06:29', 'possimus ad','Cupiditate quis aut doloribus.'],
  [35, 20, '2019-01-17 20:50', '2019-02-14 13:09', 'quo aliquid','Corrupti distinctio id earum consequatur dolore.'],
  [36, 20, '2018-08-23 05:03', '2019-07-31 02:52', 'expedita accusantium','Impedit voluptates molestiae qui.'],
  [37, 21, '2018-06-18 02:27', '2019-03-01 16:55', 'et ipsa','Facilis omnis eaque autem omnis dolorum incidunt sit sunt aut.'],
  [38, 21, '2018-11-11 02:55', '2019-12-02 13:58', 'minus repudiandae','Sed ab quia exercitationem similique qui a quis.'],
  [39, 21, '2018-12-03 21:21', '2019-02-09 18:35', 'laborum magni','Laborum illo doloribus molestias ut alias modi.'],
  [40, 22, '2018-04-22 07:35', '2019-07-09 08:48', 'molestiae est','Dolor sint debitis sint eos.'],
  [41, 22, '2018-10-19 15:22', '2019-07-04 21:31', 'vero corporis','Voluptatibus corporis voluptas laboriosam dolor mollitia cum odio est recusandae.'],
  [42, 22, '2018-02-12 11:45', '2019-11-13 17:29', 'maxime voluptatum','Et natus ea labore.'],
  [43, 23, '2018-02-25 14:25', '2019-06-21 03:18', 'qui doloremque','Illo dolore fugit cupiditate placeat sed saepe porro.'],
  [44, 24, '2018-03-07 12:39', '2019-02-23 09:25', 'ea provident','Iure aut dolore sed est.'],
  [45, 25, '2018-05-18 04:40', '2019-07-25 15:01', 'est assumenda','Suscipit at dolores a et optio eius aut aut.'],
  [46, 25, '2018-05-18 07:24', '2019-05-09 11:13', 'id nulla','Voluptatem porro eaque ipsa eaque sint quod autem.'],
  [47, 26, '2018-11-20 08:51', '2019-06-18 03:43', 'deleniti totam','Fuga itaque blanditiis est.'],
  [48, 26, '2018-12-01 15:41', '2019-09-15 14:51', 'autem omnis','Expedita nam natus.'],
  [49, 26, '2018-02-14 04:53', '2019-04-09 21:59', 'voluptatum quia','Voluptas doloremque et voluptatem dolorem ullam facere earum reiciendis voluptates.'],
  [50, 27, '2018-10-03 20:01', '2019-10-08 05:40', 'tenetur est','Minima nobis nihil suscipit natus asperiores.'],
  [51, 27, '2018-03-01 21:37', '2019-03-19 18:34', 'commodi adipisci','Aspernatur modi earum ex.'],
  [52, 28, '2018-03-25 22:12', '2019-05-03 22:25', 'quia minima','Porro voluptas facilis consequatur dolores neque eum maiores.'],
  [53, 28, '2018-02-13 17:12', '2019-09-11 06:37', 'impedit officia','Officia et delectus dignissimos expedita.'],
  [54, 29, '2018-04-12 19:14', '2020-01-20 03:56', 'nemo architecto','Deleniti consequatur totam nihil voluptatem.'],
  [55, 29, '2018-11-02 16:36', '2019-07-27 22:21', 'quia et','Dignissimos quibusdam aspernatur provident quia et.'],
  [56, 29, '2018-03-29 02:25', '2019-09-25 18:29', 'atque at','Architecto est qui voluptatum maxime.'],
  [57, 30, '2018-06-28 02:59', '2019-07-25 07:46', 'mollitia nam','Non libero earum ipsum eos eveniet nihil.'],
  [58, 30, '2018-05-22 08:18', '2019-12-20 14:57', 'ipsa sed','Error adipisci ut accusantium omnis omnis quo vel.'],
  [59, 31, '2018-06-28 22:31', '2019-02-25 04:08', 'non natus','Qui cupiditate voluptas assumenda delectus.'],
  [60, 32, '2018-09-05 12:24', '2019-03-10 19:18', 'quia et','Incidunt fugit laborum omnis voluptas qui accusamus quo qui.'],
  [61, 32, '2018-12-08 05:20', '2019-11-25 12:45', 'fuga doloribus','Tempore aut facilis possimus vel perspiciatis occaecati.'],
  [62, 33, '2018-03-10 19:46', '2019-11-01 07:40', 'fugit nemo','Error sit possimus.'],
  [63, 34, '2018-07-23 20:13', '2019-05-12 00:05', 'pariatur iure','Iste non perferendis qui pariatur nulla et tempora.'],
  [64, 35, '2018-08-31 04:02', '2019-05-18 14:23', 'vitae reprehenderit','Et eos ex reiciendis.'],
  [65, 35, '2018-03-10 14:16', '2020-01-19 09:07', 'quod cum','Vitae sapiente est voluptatem esse aut sint quia enim.'],
  [66, 36, '2018-04-19 06:53', '2019-05-06 20:41', 'dolore labore','Perferendis veniam eius earum blanditiis ducimus reprehenderit maxime.'],
  [67, 36, '2018-08-01 06:21', '2019-12-19 11:22', 'repellendus accusamus','Iure tenetur sed.'],
  [68, 36, '2018-10-29 03:03', '2020-01-29 19:56', 'mollitia et','Iste est est accusamus et tempore.'],
  [69, 37, '2018-05-08 21:19', '2019-09-16 16:36', 'dolorum ipsam','Quia nemo vel facere sunt.'],
  [70, 37, '2018-07-21 04:33', '2019-12-26 08:40', 'porro ea','Asperiores sint perferendis.'],
  [71, 37, '2018-06-28 04:12', '2019-06-17 14:05', 'maxime velit','Eos consequatur qui molestiae suscipit minus voluptatibus distinctio id iste.'],
  [72, 38, '2018-03-28 23:52', '2019-07-27 01:51', 'recusandae iure','Nesciunt vero quos et dolor tempore quia cumque.'],
  [73, 38, '2019-02-03 21:02', '2019-08-18 16:36', 'occaecati accusamus','Eligendi quisquam saepe delectus facere.'],
  [74, 39, '2018-06-20 14:27', '2019-12-06 09:33', 'eveniet molestiae','Perferendis qui doloremque explicabo laboriosam.'],
  [75, 40, '2018-03-22 02:20', '2019-11-16 00:09', 'culpa earum','Ducimus beatae laboriosam fugit adipisci.'],
  [76, 40, '2018-08-31 10:18', '2019-02-14 09:27', 'qui sed','Quo commodi et magnam debitis aliquid beatae nisi dignissimos quidem.'],
  [77, 41, '2018-11-14 09:39', '2019-12-01 10:58', 'quas et','Molestias rerum mollitia perferendis sit minima occaecati ipsa.'],
  [78, 41, '2018-06-21 06:54', '2019-10-11 11:50', 'ea autem','Sint voluptas officia atque quidem accusantium et nemo eum.'],
  [79, 42, '2018-11-29 08:26', '2019-08-07 07:01', 'error et','Aperiam modi voluptatem.'],
  [80, 42, '2018-04-21 20:12', '2019-07-05 06:23', 'odio sunt','Odit aut est et nisi nihil sit voluptatum.'],
  [81, 43, '2018-08-28 04:32', '2019-02-26 05:12', 'et pariatur','Eum repellat qui vel repellendus adipisci.'],
  [82, 43, '2018-11-15 17:40', '2019-05-21 21:01', 'in ipsum','Quia beatae sunt nihil nam rerum ipsa quisquam itaque ducimus.'],
  [83, 43, '2018-10-25 08:51', '2019-06-05 03:10', 'voluptatem alias','Mollitia cum voluptatem nemo enim libero voluptate.'],
  [84, 44, '2018-08-07 11:30', '2019-03-11 18:09', 'reprehenderit quos','Sint repellat et voluptatem nihil.'],
  [85, 44, '2019-01-28 21:19', '2019-11-24 01:53', 'totam quis','Doloribus qui natus quae temporibus doloribus.'],
  [86, 45, '2018-08-11 19:22', '2019-07-09 12:51', 'cupiditate beatae','Qui doloribus et modi modi molestiae hic soluta.'],
  [87, 45, '2018-08-05 05:18', '2019-07-11 20:29', 'sunt nostrum','Fugiat odio adipisci dolores omnis.'],
  [88, 45, '2019-01-20 16:13', '2019-12-13 08:31', 'illo et','Fuga soluta qui.'],
  [89, 46, '2018-05-15 01:05', '2019-12-21 00:17', 'a molestiae','Repellat dolores et rem.'],
  [90, 47, '2019-02-05 13:04', '2019-07-07 14:03', 'fugit explicabo','Quia molestias aut impedit sit similique.'],
  [91, 47, '2018-03-24 23:52', '2020-01-03 23:51', 'vel molestiae','Mollitia totam aut nobis et accusamus tempore.'],
  [92, 47, '2018-03-02 02:16', '2019-11-28 13:23', 'fugit doloribus','Eius itaque eligendi voluptatem sint quia sit.'],
  [93, 48, '2018-04-13 11:22', '2019-05-05 14:41', 'at consectetur','Aliquam quo temporibus voluptatem minima quae.'],
  [94, 48, '2018-08-03 15:58', '2019-02-16 19:52', 'et alias','Commodi exercitationem quos.'],
  [95, 49, '2019-01-31 09:59', '2019-08-08 17:29', 'explicabo dolorem','Corporis distinctio impedit quis qui doloribus.'],
  [96, 49, '2018-08-19 02:59', '2019-12-23 15:30', 'sapiente laboriosam','Eveniet porro repellendus vel.'],
  [97, 50, '2018-05-13 02:37', '2019-10-08 15:54', 'et facere','Quod voluptas voluptatem.'],
  [98, 51, '2018-02-20 03:38', '2019-07-11 14:12', 'facilis impedit','Aut non sint cum.'],
  [99, 52, '2018-12-09 03:07', '2019-03-24 09:57', 'et non','Illo quam quam laudantium vel et.'],
  [100, 52, '2019-01-08 09:43', '2019-05-07 20:33', 'sequi et','Atque mollitia et consequuntur.'],
  [101, 52, '2018-07-06 12:02', '2019-06-11 22:51', 'dolore rerum','Eius sunt voluptas ut.'],
  [102, 53, '2019-01-03 13:07', '2019-07-23 19:28', 'aliquid porro','Consequatur omnis at voluptatibus repellat minima quis.'],
  [103, 53, '2018-04-10 07:20', '2019-09-08 23:26', 'nostrum perspiciatis','Voluptatem voluptates deleniti voluptatem ad quia.'],
  [104, 53, '2018-04-01 16:30', '2019-11-08 01:29', 'ut iste','Omnis aut perferendis.'],
  [105, 54, '2018-02-20 02:10', '2019-08-29 00:54', 'laudantium cumque','Autem iure tenetur nulla nemo.'],
  [106, 55, '2018-12-29 18:26', '2020-01-20 11:19', 'repudiandae est','Inventore aut fugit aspernatur consequatur.'],
  [107, 55, '2018-05-24 04:12', '2019-04-16 03:12', 'qui dolore','Voluptatem rerum consequatur necessitatibus pariatur eligendi sed voluptas saepe.'],
  [108, 56, '2018-06-18 07:13', '2019-05-18 17:18', 'aut earum','Est temporibus assumenda assumenda eum a expedita illum.'],
  [109, 57, '2018-06-28 15:43', '2019-03-28 22:48', 'eos a','Quo consequuntur sunt officia officia.'],
  [110, 57, '2018-07-26 09:15', '2019-08-20 05:30', 'eaque et','Tempore accusamus earum ut ratione voluptatem qui facere.'],
  [111, 57, '2018-10-27 09:46', '2019-06-19 21:03', 'odit aliquam','Ipsa similique nostrum ut reprehenderit velit rerum quibusdam.'],
  [112, 58, '2018-08-27 02:04', '2019-03-21 05:20', 'itaque voluptas','Quasi aut quam.'],
  [113, 58, '2019-01-11 04:51', '2019-03-27 03:23', 'eum est','Quod facere consequatur aut dicta.'],
  [114, 58, '2018-12-17 22:58', '2019-11-16 15:11', 'repudiandae quis','In mollitia facere impedit facilis ut quo rem voluptas.'],
  [115, 59, '2018-09-05 20:35', '2019-08-25 03:02', 'voluptas vel','Harum ducimus laboriosam necessitatibus est sunt cupiditate nulla deserunt laborum.'],
  [116, 59, '2018-07-24 21:50', '2019-11-17 08:42', 'doloremque nemo','Quos quaerat ad sed blanditiis.'],
  [117, 59, '2019-01-21 10:07', '2020-01-30 11:03', 'quia fuga','Soluta ut saepe rem.'],
  [118, 60, '2018-06-25 11:58', '2019-12-18 05:31', 'alias exercitationem','Nulla hic voluptas et.'],
  [119, 61, '2018-12-03 13:22', '2019-10-10 06:56', 'maxime odit','Tempora nihil libero harum id doloremque labore magni minima eum.'],
  [120, 61, '2018-03-04 08:21', '2019-03-31 16:50', 'ea rerum','Consectetur nulla dolores amet.'],
  [121, 62, '2018-04-01 10:18', '2019-11-08 14:10', 'aliquid consequatur','Quam perspiciatis temporibus non non accusamus quod.'],
  [122, 62, '2018-04-14 00:02', '2019-09-23 11:54', 'nulla possimus','Voluptatem reprehenderit aut enim maiores tenetur quod quae.'],
  [123, 62, '2018-06-01 04:26', '2019-04-23 12:59', 'magni nulla','Enim doloribus reiciendis eaque rerum.'],
  [124, 63, '2018-12-24 09:50', '2019-05-02 12:05', 'eveniet nostrum','Ut totam repellendus eum eos assumenda veritatis perferendis iure ipsum.'],
  [125, 63, '2019-01-06 19:13', '2019-08-16 05:17', 'beatae sunt','Veniam sit laboriosam ullam molestiae qui sint.'],
  [126, 63, '2018-11-15 05:41', '2019-09-15 10:47', 'asperiores dolores','Corrupti perspiciatis excepturi autem enim.'],
  [127, 64, '2018-10-04 02:25', '2019-02-15 18:24', 'necessitatibus quis','Natus et vero quam est aut cumque praesentium numquam voluptates.'],
  [128, 65, '2018-04-09 22:47', '2019-02-25 13:25', 'nam harum','Rem officiis consequuntur assumenda architecto cum nam tempora.'],
  [129, 65, '2018-10-21 10:35', '2019-07-08 02:14', 'molestiae ut','Enim itaque deleniti qui et nihil.'],
  [130, 66, '2019-01-20 09:52', '2019-06-02 05:57', 'voluptatem consequatur','Possimus illo quod nobis illo earum.'],
  [131, 66, '2018-11-20 11:00', '2019-07-07 01:38', 'cum et','Neque et ratione qui perspiciatis qui veniam veniam iste.'],
  [132, 66, '2018-12-14 13:00', '2019-08-21 15:09', 'id ut','Dolores iusto iure nulla est labore.'],
  [133, 67, '2018-03-25 07:41', '2019-08-27 17:53', 'assumenda nihil','Voluptas voluptatum rerum.'],
  [134, 67, '2018-03-24 09:28', '2019-03-04 16:52', 'consequuntur ipsam','Reprehenderit neque et eos labore ipsum.'],
  [135, 68, '2018-07-15 23:46', '2019-12-05 04:25', 'laboriosam quos','Aliquam et ut quaerat consequuntur ea neque.'],
  [136, 68, '2019-01-17 11:52', '2020-01-03 02:17', 'odio accusantium','Sint dignissimos laboriosam illum recusandae adipisci.'],
  [137, 69, '2018-09-14 07:08', '2020-01-18 15:54', 'hic maiores','Nesciunt quia consectetur veniam dignissimos tempore qui enim nulla.'],
  [138, 70, '2019-01-12 05:52', '2019-12-28 05:14', 'ratione veniam','Fugit ut aut.'],
  [139, 70, '2018-09-10 03:32', '2019-11-21 12:52', 'aut dolores','Tempore dolor reprehenderit.'],
  [140, 70, '2018-03-30 09:14', '2020-01-31 08:57', 'ut dolorem','Saepe eos rerum quia saepe nam.'],
  [141, 71, '2018-03-20 01:02', '2019-02-09 19:03', 'quia molestiae','Ex quia corrupti maxime et voluptate.'],
  [142, 72, '2018-08-27 16:02', '2019-03-22 00:07', 'eos ratione','Ullam ratione labore occaecati molestiae minus minima ipsam ipsum velit.'],
  [143, 72, '2018-12-10 23:14', '2019-10-05 09:10', 'laborum sit','Sint accusantium placeat explicabo.'],
  [144, 72, '2018-03-28 17:44', '2019-10-31 03:19', 'quibusdam neque','Quaerat assumenda cum quia.'],
  [145, 73, '2018-10-25 06:21', '2019-05-26 19:12', 'asperiores quod','Est recusandae minima recusandae et fugiat quasi nam tempora magni.'],
  [146, 74, '2018-02-10 02:02', '2019-08-24 09:52', 'quia minus','Sapiente accusamus ratione nesciunt nesciunt quas.'],
  [147, 74, '2018-05-27 14:57', '2019-03-15 21:16', 'autem pariatur','Aliquam rerum enim id esse accusamus aut.'],
  [148, 74, '2018-09-09 01:03', '2019-05-06 16:01', 'vero optio','Similique hic et consequuntur molestiae consequatur.'],
  [149, 75, '2018-07-16 15:39', '2020-01-11 19:25', 'neque reiciendis','Voluptate voluptas totam sunt cupiditate animi non repudiandae nihil.'],
  [150, 76, '2018-08-01 22:14', '2019-08-08 17:55', 'esse et','Quasi aliquid vel.'],
  [151, 76, '2018-07-25 06:27', '2019-02-28 01:03', 'et veritatis','Voluptatibus exercitationem pariatur quia sed quia rerum est voluptatum.'],
  [152, 76, '2018-10-12 04:32', '2019-08-04 10:19', 'optio sunt','Veniam in aliquid eveniet nisi.'],
  [153, 77, '2018-02-17 15:09', '2019-12-04 01:00', 'voluptatem recusandae','Aut eum sit porro.'],
  [154, 78, '2018-12-24 00:34', '2019-09-22 02:12', 'laudantium voluptatibus','Alias earum et dicta cum.'],
  [155, 78, '2018-06-09 13:08', '2020-01-05 00:23', 'iure doloribus','Distinctio quidem et sed molestiae.'],
  [156, 78, '2018-06-28 21:20', '2019-05-08 08:16', 'unde fugiat','Voluptate consequatur optio voluptates a.'],
  [157, 79, '2018-10-24 02:39', '2019-03-19 21:34', 'mollitia molestias','Esse vitae quis velit expedita.'],
  [158, 80, '2018-05-11 17:57', '2019-06-01 01:03', 'fugit odit','Architecto a amet est qui accusantium.'],
  [159, 81, '2018-02-15 00:54', '2019-03-17 12:09', 'tenetur minus','Ad occaecati quisquam.'],
  [160, 82, '2018-10-22 03:51', '2019-02-25 18:17', 'sed omnis','Provident expedita cum.'],
  [161, 82, '2018-12-08 08:54', '2019-10-07 14:36', 'sed recusandae','Nulla aut itaque sint.'],
  [162, 83, '2018-10-21 04:37', '2019-06-25 18:53', 'doloribus laudantium','Itaque cum fuga.'],
  [163, 84, '2018-02-17 18:24', '2019-05-12 15:37', 'modi magnam','Adipisci sed dignissimos expedita.'],
  [164, 84, '2018-11-21 00:51', '2019-04-09 02:39', 'officiis nam','Nobis optio vitae magni quod aut ipsam fugit.'],
  [165, 85, '2018-10-28 07:28', '2019-02-15 20:36', 'eos qui','Tempore dicta a doloribus doloremque est magni aut accusantium.'],
  [166, 86, '2018-07-23 14:52', '2020-01-11 23:48', 'nihil nisi','Expedita quia vero sit quidem voluptas consequatur assumenda.'],
  [167, 86, '2018-12-13 08:40', '2019-09-04 11:23', 'quia suscipit','Iusto velit eos odio quam corporis velit incidunt officiis.'],
  [168, 86, '2018-04-17 03:39', '2019-11-22 20:28', 'voluptate asperiores','Aut ut consequuntur ea temporibus quia eos.'],
  [169, 87, '2018-07-07 16:25', '2019-11-04 04:39', 'nobis ad','Accusamus enim iusto numquam nobis assumenda illum nisi enim.'],
  [170, 87, '2018-04-14 07:27', '2019-08-09 22:44', 'iusto in','Aliquam commodi necessitatibus reiciendis error.'],
  [171, 88, '2018-02-13 09:59', '2019-03-09 14:30', 'quo quidem','Quibusdam sint dolor ipsam quam accusamus corporis est voluptas officia.'],
  [172, 88, '2019-02-01 00:44', '2019-11-30 08:32', 'voluptate voluptas','Et vitae nisi molestiae mollitia voluptas omnis nesciunt consectetur.'],
  [173, 88, '2018-02-09 23:27', '2019-09-06 15:52', 'magnam quod','Natus ullam temporibus officiis est culpa natus aut aut.'],
  [174, 89, '2018-08-09 16:24', '2019-10-06 21:58', 'excepturi reiciendis','Qui eos porro in est.'],
  [175, 90, '2018-08-13 16:24', '2019-04-09 20:41', 'corrupti eos','Et tempore et veniam eveniet id.'],
  [176, 91, '2018-11-10 09:45', '2019-12-08 05:56', 'nesciunt aut','Architecto aut esse facere voluptas.'],
  [177, 91, '2018-11-10 00:31', '2020-01-28 14:57', 'voluptatem voluptatem','Veniam et sed voluptates dolores similique ut error.'],
  [178, 91, '2018-12-26 19:24', '2019-05-03 11:43', 'provident ullam','Odio laboriosam voluptatibus.'],
  [179, 92, '2018-07-01 15:36', '2019-04-27 08:01', 'ad amet','Reiciendis aliquam expedita.'],
  [180, 93, '2019-01-06 20:49', '2019-12-03 13:54', 'blanditiis ab','Magnam et aliquid.'],
  [181, 94, '2018-04-22 06:38', '2019-12-18 10:59', 'dolores totam','Aliquam sed qui consequuntur doloremque quibusdam.'],
  [182, 94, '2018-11-12 17:57', '2019-07-19 10:04', 'quae consequatur','Repellendus iure sed.'],
  [183, 94, '2018-06-06 16:55', '2019-12-13 19:58', 'maxime voluptatum','Quo ut alias accusamus veritatis.'],
  [184, 95, '2018-02-17 21:55', '2019-02-28 04:01', 'eos quibusdam','Dolores molestias et hic qui odit ut.'],
  [185, 95, '2018-09-20 22:16', '2019-06-04 02:05', 'in nisi','Dolor aut aspernatur aut enim consequatur at minus neque at.'],
  [186, 95, '2018-11-30 19:20', '2019-09-29 09:49', 'omnis quia','Eaque cumque excepturi dolor.'],
  [187, 96, '2018-03-20 23:56', '2019-05-10 23:10', 'sunt corrupti','Id voluptates sunt esse ad nihil beatae suscipit labore ut.'],
  [188, 96, '2018-10-13 11:21', '2019-09-12 23:16', 'doloremque porro','Sunt cupiditate id quis dolorem dolor.'],
  [189, 96, '2018-05-17 13:16', '2019-07-12 09:18', 'eum adipisci','Rem vel voluptatem distinctio sit praesentium.'],
  [190, 97, '2018-02-25 17:51', '2019-05-20 14:49', 'enim ipsa','Rem cumque quisquam.'],
  [191, 97, '2018-06-12 00:36', '2019-06-27 18:40', 'illo accusantium','Explicabo ad eos non.'],
  [192, 97, '2018-05-13 17:06', '2019-03-09 12:59', 'et fuga','Qui quia doloribus magni est ipsum asperiores aperiam ut dolorem.'],
  [193, 98, '2018-03-01 22:08', '2019-12-16 06:01', 'voluptas quo','Enim adipisci sint repellendus magni.'],
  [194, 99, '2018-05-12 19:28', '2019-06-04 03:29', 'officiis aut','Deserunt tenetur explicabo sunt.'],
  [195, 100, '2019-01-05 08:27', '2019-03-08 01:55', 'temporibus blanditiis','Expedita beatae mollitia.'],
  [196, 100, '2018-10-06 11:48', '2019-09-19 22:53', 'culpa harum','Quae sed quas deserunt odit.'],
  [197, 100, '2019-02-05 14:36', '2019-06-10 01:34', 'dolor quisquam','Repellendus sunt officia sed doloribus in ea aut.']
];
*/