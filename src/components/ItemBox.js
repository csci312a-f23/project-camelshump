import PropTypes from "prop-types";

export default function ItemBox({ inventory, closeItemBox, itemAction }) {
  const buttonArray = inventory.map((item) => (
    <button type="button" key={item.name} onClick={() => itemAction(item.name)}>
      {" "}
      {item.name}{" "}
    </button>
  ));

  return (
    <div>
      {buttonArray}
      <button type="button" onClick={() => closeItemBox()}>
        {" "}
        Close{" "}
      </button>
    </div>
  );
}

ItemBox.propTypes = {
  inventory: PropTypes.arrayOf(Object).isRequired,
  closeItemBox: PropTypes.func.isRequired,
  itemAction: PropTypes.func.isRequired,
};
