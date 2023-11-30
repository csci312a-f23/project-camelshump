/*
 * menu.js
 */
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styles from "../styles/Classes.module.css";

export default function ClassSelector({ setClassName }) {
  const router = useRouter();
  useSession({ required: true });

  const handleClick = (selection) => {
    setClassName(selection);
    router.push("/play");
  };

  const mageArt = `
              _,-'| \n
           ,-'._  | \n
 .||,      |####\\ | \n
\\.*',/     \\####| | \n
= ,. =      |###| | \n
/ || \\    ,-'\\#/,''. \n
  ||     ,'   ',,. '. \n
  ,|____,' , ,;' \\| | \n 
 (3|\\    _/|/'   _| | \n
  ||/,-''  | >-'' _,\\\\ \n
  ||'      ==\\ ,-'  ,' \n
  ||       |  V \\ ,| \n
  ||       |    |' | \n
  ||       |    |   \\ \n
  ||       |    \\    \\ \n
  ||       |     |    \\ \n
  ||       |      \\_,-' \n
  ||       |___,,--")_\\ \n
  ||         |_|   ccc/ \n
  ||        ccc/ \n
  ||                 \n

`;

  const warriorArt = `
      _,. \n
    ,' -.) \n
   ( _/-\\\\-._ \n
  /,|'--._,-^|            , \n
  \\_| |'-._/||          ,'| \n
    |  '-, / |         /  / \n
    |     || |        /  / \n
     'r-._||/   __   /  / \n
 __,-<_     )'-/  './  / \n
'  \\   '---'   \\   /  / \n
    |           |./  / \n
    /           //  / \n
\\_/' \\         |/  / \n
 |    |   _,^-'/  / \n
 |    , ''  (\\/  /_ \n
  \\,.->._    \\X-=/^ \n
  (  /   '-._//^' \n
   'Y-.____(__} \n
    |     {__) \n
          () \n
`;

  const rogueArt = `
                 /| \n
  _______________)|.. \n
<'______________<(,_|) \n
           .((()))| )) \n
           (======)| \\ \n
          ((( "_"()|_ \\ \n
         '()))(_)/_/ ' ) \n
         .--/_\\ /(  /./ \n
        /'._.--\\ .-(_/ \n
       / / )\\___:___) \n
      ( -.'.._  |  /  \n
       \\  \\_\\ ( | ) \n
        '. /\\)_(_)| \n
          '-|  XX | \n
           %%%%%%%% \n
          / %%%%%%%\\ \n
         ( /.-'%%%. \\ \n
        /(.'   %%\\ :| \n
       / ,|    %  ) ) \n
     _|___)   %  (__|_ \n
     )___/       )___( \n
      |x/         \\ > \n
      |x)         / '. \n
      |x\\       _(____''.__ \n
    --\\ -\\-- \n
     --\\__|-- \n
`;

  return (
    <main className={styles.gridContainer}>
      <div
        className={styles.warrior}
        id={styles.class}
        onClick={() => handleClick("warrior")}
      >
        <div>Warrior</div>
        <div className={styles.art}>
          <pre>{warriorArt}</pre>
        </div>
      </div>
      <div
        className={styles.mage}
        id={styles.class}
        onClick={() => handleClick("mage")}
      >
        <div>Mage</div>
        <div className={styles.art}>
          <pre>{mageArt}</pre>
        </div>
      </div>
      <div
        className={styles.rogue}
        id={styles.class}
        onClick={() => handleClick("rogue")}
      >
        <div>Rogue</div>
        <div className={styles.art}>
          <pre>{rogueArt}</pre>
        </div>
      </div>
    </main>
  );
}

ClassSelector.propTypes = {
  setClassName: PropTypes.func.isRequired,
};
