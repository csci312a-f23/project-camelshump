const ENEMIES = [
  {
    name: "Spider Monster",
    health: 60,
    strength: 6,
    art: `           ____                      , \n
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
    art: `          /                            ) \n
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
    art: ` -'   ||             , \n
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
    art: `              .7 \n
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
    health: 10,
    strength: 8,
    art: `                                  .... \n
                                  .'' .''' \n
  .                             .'   : \n
                            .:    : \n
                           _:    :       ..----.._ \n
                        .:::.....:::.. .'         ''. \n
  \\                   .'  #-. .-######'     #        '. \n
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
    name: "An Evil Ampersand",
    health: 100,
    strength: 10,
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
