const ENEMIES = [
  {
    name: "Spider Monster",
    health: 60,
    strength: 6,
    defense: 10,
    intelligence: 2,
    speed: 9,
    rizz: 1,
    xp: 7,
    art: `           
             ____                      , \n
            /---.'.__             ____// \n
                 '--.\\           /.---' \n
            _______  \\\\         // \n
          /.------.\\  \\|      .'/  ______ \n
         //  ___  \\ \\ ||/|\\  //  _/_----.\\__ \n
        |/  /.-.\\  \\ \\:|< >|// _/.'..\\   '--' \n
           //   \\'. | \\'.|.'/ /_/ /  \\\\ \n
          //     \\ \\_\\/" ' ~\\-'.-'    \\\\ \n
         //       '-._| :H: |'-.__     \\\\ \n
        //           (/'==='\\)'-._\\     || \n
        ||                        \\\\    \\| \n
        ||                         \\\\    ' \n
        |/                          \\\\ \n
                                     || \n
                                     || \n
                                     \\\\ \n
                                      '  \n
    `,
  },
  {
    name: "Dragon",
    health: 55,
    strength: 8,
    defense: 10,
    intelligence: 8,
    speed: 4,
    rizz: 6,
    xp: 6,
    art: `
             /                            ) \n
            (                             |\\ \n
           /|                              \\\\ \n
          //                                \\\\ \n
         ///                                 \\| \n
        /( \\                                  )\\ \n
        \\\\  \\_                               //) \n
         \\\\  :\\__                           /// \n
          \\\\     )                         // \\ \n
           \\\\:  /                         // |/ \n
            \\\\ / \\                       //  \\ \n
             /)   \\   ___..-'           (|  \\_| \n
            //     /   _.'              \\ \\  \\ \n
           /|       \\ \\________          \\ | / \n
          (| _ _  __/          '-.       ) /.' \n
           \\\\ .  '-.__            \\_    / / \\ \n
            \\\\_'.     > --._ '.     \\  / / / \n
             \\ \\      \\     \\  \\     .' /.' \n
              \\ \\  '._ /     \\ )    / .' | \n
               \\ \\_     \\_   |    .'_/ __/ \n
                \\  \\      \\_ |   / /  _/ \\_ \n
                 \\  \\       / _.' /  /     \\ \n
                 \\   |     /.'   / .'       '-,_ \n
                  \\   \\  .'   _.'_/             \\ \n
     /\\    /\\      ) ___(    /_.'           \\    | \n
    | _\\__// \\    (.'      _/               |    | \n
    \\/_  __  /--''    ,                   __/    / \n
    (_ ) /b)  \\  '.   :            \\___.-'_/ \\__/ \n
    /:/:  ,     ) :        (      /_.'__/-'|_ _ / \n
   /:/: __/\\ >  __,_.----.__\\    /        (/(/(/ \n
  (_(,_/V .'/--'    _/  __/ |   / \n
   VvvV  //'    _.-' _.'     \\   \\ \n
     n_n//     (((/->/        |   / \n
     '--'         ~='          \\  | \n
                                | |_,,, \n
                                \\  \\  / \n
                                 '.__) \n
  `,
  },
  {
    name: "Thief",
    health: 20,
    strength: 4,
    defense: 7,
    intelligence: 7,
    speed: 10,
    rizz: 8,
    xp: 3,
    art: `
        /\\             , \n
        ||           _,''/ \n
        ||         ,/'   < \n
        ||       .-'\\\\_.-' \n
        ||      /'' '| \n
       _!|      |o o ?    \n
       |/\\      '.=.'.__   . \n
       '| L   _.-J ' L '\\.' '. \n
        ||/'.'  | \\ /'_.'  .  \\  \n
          \\   .=\\__v__<    \\.  L   \n
           '-'   |    _\\    \\. | \n
                  \\'_'  \\.     F \n
                  )\\/    '-.__J \n
                 /  |   -| \n
                /   |   / \n
               ( ' <|' | \n
                \\_.'\\. \\ \n
                 '. |._ | \n
                   'J' / \n
               ,    _)'|>.__,_\\ \n
         ' .,-.+- .'_._\\  "'-=-i"" ---- \n
                  _,. -''' \n
  `,
  },
  {
    name: "Skeleton",
    health: 14,
    strength: 5,
    defense: 2,
    intelligence: 9,
    speed: 8,
    rizz: 10,
    xp: 2,
    art: `
                .7 \n
              .'/ \n
             / / \n
            / / \n
           / / \n
          / / \n
         / / \n
        / / \n
       / / \n     
      / / \n      
    __|/ \n
  ,-\\__\\ \n
  |f-"Y\\| \n
  \\()7L/ \n
   cgD                            __ _ \n
   |\\(                          .'  Y '>, \n
    \\ \\                        / _   _   \\ \n
     \\\\\\                       )(_) (_)(|} \n
      \\\\\\                      {  4A   } / \n
       \\\\\\                      \\uLuJJ/\\l \n
        \\\\\\                     |3    p)/ \n
         \\\\\\___ __________      /nnm_n// \n
         c7___-__,__-)\\,__)(".  \\_>-<_/D \n
                    //V     \\_"-._.__G G_c__.-__<"/ ( \\ \n
                           <"-._>__-,G_.___)\\   \\7\\ \n
                          ("-.__.| \\"<.__.-" )   \\ \\ \n
                          |"-.__"\\  |"-.__.-".\\   \\ \\ \n
                          ("-.__"". \\"-.__.-".|    \\_\\ \n
                          \\"-.__""|!|"-.__.-".)     \\ \\ \n
                           "-.__""\\_|"-.__.-"./      \\ l \n
                            ".__""">G>-.__.-">       .--,_ \n
                                ""  G \n
  `,
  },
  {
    name: "Dark Wizard",
    health: 30,
    strength: 8,
    defense: 3,
    intelligence: 10,
    speed: 4,
    rizz: 10,
    xp: 4,
    art: `                            
                                      .... \n
                                  .'' .''' \n
                                .'   : \n
                            .:    : \n
\\                         _:    :       ..----.._ \n
\\\\                    .:::.....:::.. .'         ''. \n
 \\\\                  .'  #-. .-######'     #        '. \n
  \\\\                 '.##'/ ' ################       : \n
   \\\\                  #####################         : \n
    \\\\               ..##.-.#### .''''###'.._        : \n
     \\\\             :--:########:            '.    .' : \n
      \\\\..__...--.. :--:#######.'   '.         '.     : \n
      :     :  : : '':'-:'':'::        .         '.  .' \n
      '---'''..: :    ':    '..'''.      '.        :' \n
         \\\\  :: : :     '      ''''''.     '.      .: \n
          \\\\ ::  : :     '            '.      '      : \n
           \\\\::   : :           ....' ..:       '     '. \n
            \\\\::  : :    .....####\\\\ .~~.:.             : \n
             \\\\':.:.:.:'#########.===. ~ |.'-.   . '''.. : \n
              \\\\    .'  ########## \\ \\ _.' '. '-.       '''. \n
              :\\\\  :     ########   \\ \\      '.  '-.        : \n
             :  \\\\'    '   #### :    \\ \\      :.    '-.      : \n
            :  .'\\\\   :'  :     :     \\ \\       :      '-.    : \n
           : .'  .\\\\  '  :      :     :\\ \\       :        '.   : \n
           ::   :  \\\\'  :.      :     : \\ \\      :          '. : \n
           ::. :    \\\\  : :      :    ;  \\ \\     :           '.: \n
            : ':    '\\\\ :  :     :     :  \\:\\     :        ..' \n
               :    ' \\\\ :        :     ;  \\|      :   .''' \n
               '.   '  \\\\:                         :.'' \n
                .:..... \\\\:       :            ..'' \n
               '._____|'.\\\\......'''''''.:..''' \n
                          \\\\ \n
  `,
  },
  {
    name: "Evil Ampersand",
    health: 70,
    strength: 10,
    defense: 8,
    intelligence: 2,
    speed: 1,
    rizz: 0,
    xp: 10,
    art: ` 
                              ,-.                               \n
         ___,---.__          /'|'\\          __,---,___          \n
      ,-'    \\'    '-.____,-'  |  '-.____,-'    //    '-.       \n
    ,'        |           ~'\\     /'~           |        '.      \n
   /      ___//              '. ,'          ,  , \\___      \\    \n
  |    ,-'   '-.__   _         |        ,    __,-'   '-.    |    \n
  |   /          /\\_  '   .    |    ,      _/\\          \\   |   \n
  \\  |           \\ \\'-.___ \\   |   / ___,-'/ /           |  /  \n
   \\  \\           | '._   '\\\\  |  //'   _,' |           /  /     \n 
    '-.\\         /'  _ '---'' , . ''---' _  '\\         /,-'     \n
       ''       /     \\    ,='/ \\'=.    /     \\       ''         \n 
               |__   /|\\_,--.,-.--,--._/|\\   __|                  \n
               /  './  \\\\'\\ |  |  | /,//' \\,'  \\                 \n 
              /   /     ||--+--|--+-/-|     \\   \\                 \n
             |   |     /'\\_\\_\\ | /_/_/'\\     |   |                \n
              \\   \\__, \\_     '~'     _/ .__/   /            \n
               '-._,-'   '-._______,-'   '-._,-'\n
  `,
  },
];

export default ENEMIES;
